'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  SpotLight,
  PointLight,
  Color3,
  Color4,
  MeshBuilder,
  StandardMaterial,
  ParticleSystem,
  Animation,
  ActionManager,
  ExecuteCodeAction,
  Mesh,
  DynamicTexture,
} from '@babylonjs/core';
import { TenantBranding, defaultJorgeNewberyBranding } from '@/config/tenantBranding';

interface StadiumScene3DProps {
  branding?: TenantBranding;
  onBallClick?: () => void;
  isTransitioning?: boolean;
}

export default function StadiumScene3D({
  branding = defaultJorgeNewberyBranding,
  onBallClick,
  isTransitioning = false,
}: StadiumScene3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const ballMeshRef = useRef<Mesh | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    let engine: Engine | null = null;
    let scene: Scene | null = null;

    try {
      const canvas = canvasRef.current;
      if (!Engine.isSupported()) {
        console.warn('WebGL is not supported');
        setHasError(true);
        return;
      }

      // 1. Engine & Scene Setup
      engine = new Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        antialias: true,
        adaptToDeviceRatio: true,
      });
      engineRef.current = engine;

      scene = new Scene(engine);
      scene.clearColor = new Color4(0.04, 0.04, 0.06, 1);

      // 2. Camera Setup (Cinematic Orbital Camera)
      const camera = new ArcRotateCamera(
        'stadiumCamera',
        Math.PI / 2,
        Math.PI / 2.6,
        6.5,
        new Vector3(0, 0.5, 0),
        scene
      );
      camera.lowerRadiusLimit = 4;
      camera.upperRadiusLimit = 14;
      camera.lowerBetaLimit = Math.PI / 6;
      camera.upperBetaLimit = Math.PI / 2.1;
      camera.wheelDeltaPercentage = 0.01;
      camera.attachControl(canvas, true);
      cameraRef.current = camera;

      // 3. Lighting Setup (Red, Black & White Theme)
      const ambientLight = new HemisphericLight(
        'ambientLight',
        new Vector3(0, 1, 0),
        scene
      );
      ambientLight.intensity = 0.6;
      ambientLight.groundColor = Color3.FromHexString('#0a0a0a');
      ambientLight.diffuse = Color3.FromHexString('#ffffff');

      // Red Floodlights
      const spotLight1 = new SpotLight(
        'stadiumLight1',
        new Vector3(-6, 8, -6),
        new Vector3(0.6, -0.8, 0.6),
        Math.PI / 3,
        2,
        scene
      );
      spotLight1.intensity = 3.0;
      spotLight1.diffuse = Color3.FromHexString('#dc2626');
      spotLight1.specular = Color3.FromHexString('#ffffff');

      const spotLight2 = new SpotLight(
        'stadiumLight2',
        new Vector3(6, 8, -6),
        new Vector3(-0.6, -0.8, 0.6),
        Math.PI / 3,
        2,
        scene
      );
      spotLight2.intensity = 3.0;
      spotLight2.diffuse = Color3.FromHexString('#ef4444');
      spotLight2.specular = Color3.FromHexString('#ffffff');

      // Central Glow Light under the Ball
      const centerGlow = new PointLight('centerGlow', new Vector3(0, 0.1, 0), scene);
      centerGlow.intensity = 2.5;
      centerGlow.diffuse = Color3.FromHexString('#dc2626');

      // 4. Stadium Pitch Ground (Dark Field)
      const ground = MeshBuilder.CreateGround(
        'stadiumPitch',
        { width: 32, height: 32 },
        scene
      );
      const groundMat = new StandardMaterial('groundMat', scene);
      groundMat.diffuseColor = Color3.FromHexString('#0a0a0c');
      groundMat.specularColor = Color3.FromHexString('#200505');
      groundMat.roughness = 0.8;
      ground.material = groundMat;

      // Inner Glowing Ring (Red)
      const ring = MeshBuilder.CreateTorus(
        'fieldRing',
        { diameter: 4.2, thickness: 0.06, tessellation: 64 },
        scene
      );
      ring.position.y = 0.02;
      const ringMat = new StandardMaterial('ringMat', scene);
      ringMat.emissiveColor = Color3.FromHexString('#dc2626');
      ringMat.disableLighting = true;
      ring.material = ringMat;

      // 5. 3D Soccer Ball (Red, Black & White)
      const ball = MeshBuilder.CreateSphere(
        'soccerBall',
        { diameter: 1.6, segments: 64 },
        scene
      );
      ball.position = new Vector3(0, 0.9, 0);
      ballMeshRef.current = ball;

      const ballMat = new StandardMaterial('ballMat', scene);
      ballMat.specularColor = Color3.FromHexString('#ffffff');
      ballMat.specularPower = 32;

      // Create 2D Dynamic Texture for 3D Ball
      const ballTexture = new DynamicTexture('ballTex', { width: 1024, height: 512 }, scene, true);
      const ctx = ballTexture.getContext() as unknown as CanvasRenderingContext2D;

      if (ctx) {
        // Base Crisp White
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 1024, 512);

        // Draw Black & Red Pentagons
        const drawPentagon = (cx: number, cy: number, r: number, isRed: boolean = false) => {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = isRed ? '#dc2626' : '#0a0a0a';
          ctx.fill();
          ctx.strokeStyle = isRed ? '#0a0a0a' : '#ffffff';
          ctx.lineWidth = 3;
          ctx.stroke();
        };

        const pentagonCoords = [
          { x: 128, y: 110, red: false }, { x: 384, y: 110, red: true }, { x: 640, y: 110, red: false }, { x: 896, y: 110, red: true },
          { x: 256, y: 256, red: true }, { x: 512, y: 256, red: false }, { x: 768, y: 256, red: true }, { x: 1024, y: 256, red: false },
          { x: 128, y: 400, red: false }, { x: 384, y: 400, red: true }, { x: 640, y: 400, red: false }, { x: 896, y: 400, red: true },
        ];

        pentagonCoords.forEach((pt) => drawPentagon(pt.x, pt.y, 44, pt.red));

        // Red Central Band
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(0, 225, 1024, 62);

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 220, 1024, 5);
        ctx.fillRect(0, 287, 1024, 5);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 225, 1024, 3);
        ctx.fillRect(0, 284, 1024, 3);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★ FUTSAL PRIMERA AFA  •  INFERIORES & JUEGOS ★', 512, 256);

        ballTexture.update();
      }

      ballMat.diffuseTexture = ballTexture;
      ball.material = ballMat;

      // Ball Idle Rotation
      scene.onBeforeRenderObservable.add(() => {
        if (ball) {
          ball.rotation.y += 0.008;
        }
      });

      // 6. Ambient Light Particles (Red Sparks)
      if (branding.hero3D.enableParticles) {
        const particleSystem = new ParticleSystem('stadiumParticles', 500, scene);
        particleSystem.emitter = new Vector3(0, 1.5, 0);
        particleSystem.minEmitBox = new Vector3(-8, -0.5, -8);
        particleSystem.maxEmitBox = new Vector3(8, 5, 8);

        particleSystem.color1 = Color4.FromHexString('#dc2626aa');
        particleSystem.color2 = Color4.FromHexString('#ffffff88');
        particleSystem.colorDead = new Color4(0, 0, 0, 0);

        particleSystem.minSize = 0.03;
        particleSystem.maxSize = 0.09;
        particleSystem.minLifeTime = 2;
        particleSystem.maxLifeTime = 5;
        particleSystem.emitRate = 100;
        particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
        particleSystem.gravity = new Vector3(0, 0.02, 0);
        particleSystem.start();
      }

      // 7. Interactive Ball Click Setup
      ball.actionManager = new ActionManager(scene);
      ball.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
          const spinAnim = new Animation(
            'spinBall',
            'rotation.y',
            60,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CONSTANT
          );
          spinAnim.setKeys([
            { frame: 0, value: ball.rotation.y },
            { frame: 40, value: ball.rotation.y + Math.PI * 4 },
          ]);

          const bounceAnim = new Animation(
            'bounceBall',
            'position.y',
            60,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CONSTANT
          );
          bounceAnim.setKeys([
            { frame: 0, value: 0.9 },
            { frame: 20, value: 2.2 },
            { frame: 40, value: 0.9 },
          ]);

          ball.animations = [spinAnim, bounceAnim];
          scene?.beginAnimation(ball, 0, 40, false);

          const burstSystem = new ParticleSystem('sparkBurst', 120, scene!);
          burstSystem.emitter = new Vector3(0, 0.9, 0);
          burstSystem.minSize = 0.05;
          burstSystem.maxSize = 0.15;
          burstSystem.color1 = Color4.FromHexString('#dc2626ff');
          burstSystem.color2 = Color4.FromHexString('#ffffff88');
          burstSystem.colorDead = new Color4(0, 0, 0, 0);
          burstSystem.minEmitPower = 3;
          burstSystem.maxEmitPower = 6;
          burstSystem.targetStopDuration = 0.4;
          burstSystem.start();

          if (onBallClick) {
            onBallClick();
          }
        })
      );

      // Mouse Parallax Effect
      const handleMouseMove = (event: MouseEvent) => {
        if (!cameraRef.current) return;
        const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
        cameraRef.current.alpha = Math.PI / 2 + mouseX * 0.15;
        cameraRef.current.beta = Math.PI / 2.6 + mouseY * 0.08;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Render Loop
      engine.runRenderLoop(() => {
        scene?.render();
      });

      // Resize Listener
      const handleResize = () => {
        engine?.resize();
      };
      window.addEventListener('resize', handleResize);
      engine.resize();

      setIsLoaded(true);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        scene?.dispose();
        engine?.dispose();
      };
    } catch (err) {
      console.error('Babylon.js WebGL Error:', err);
      setHasError(true);
    }
  }, [branding]);

  // Handle transition zoom animation
  useEffect(() => {
    if (isTransitioning && cameraRef.current) {
      const camera = cameraRef.current;
      const zoomAnim = new Animation(
        'cameraZoom',
        'radius',
        60,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      zoomAnim.setKeys([
        { frame: 0, value: camera.radius },
        { frame: 45, value: 1.8 },
      ]);
      camera.animations = [zoomAnim];
      camera.getScene().beginAnimation(camera, 0, 45, false);
    }
  }, [isTransitioning]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950">
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none cursor-grab active:cursor-grabbing outline-none"
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-red-500 text-sm font-bold animate-pulse">
          Cargando Estadio 3D...
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-300 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 text-2xl font-bold">
            ⚽
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Club Atlético Jorge Newbery</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Futsal Primera AFA, Inferiores & Juegos — Villa Devoto
          </p>
        </div>
      )}
    </div>
  );
}
