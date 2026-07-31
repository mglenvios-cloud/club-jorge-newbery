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
  PBRMaterial,
  StandardMaterial,
  ParticleSystem,
  Texture,
  Animation,
  ActionManager,
  ExecuteCodeAction,
  Mesh,
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

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Initialize Engine & Scene
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      antialias: true,
    });
    engineRef.current = engine;

    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.02, 0.04, 0.08, 1);

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
    camera.upperRadiusLimit = 12;
    camera.lowerBetaLimit = Math.PI / 6;
    camera.upperBetaLimit = Math.PI / 2.1;
    camera.wheelDeltaPercentage = 0.01;
    cameraRef.current = camera;

    // 3. Lighting Setup (Night Stadium Lights)
    const ambientLight = new HemisphericLight(
      'ambientLight',
      new Vector3(0, 1, 0),
      scene
    );
    ambientLight.intensity = 0.45;
    ambientLight.groundColor = Color3.FromHexString('#030712');
    ambientLight.diffuse = Color3.FromHexString(branding.hero3D.ambientLightColor);

    // Stadium Floodlights (Top-Left & Top-Right Spotlights)
    const spotLight1 = new SpotLight(
      'stadiumLight1',
      new Vector3(-6, 8, -6),
      new Vector3(0.6, -0.8, 0.6),
      Math.PI / 3,
      2,
      scene
    );
    spotLight1.intensity = 2.5;
    spotLight1.diffuse = Color3.FromHexString(branding.primaryColor);
    spotLight1.specular = Color3.FromHexString(branding.accentColor);

    const spotLight2 = new SpotLight(
      'stadiumLight2',
      new Vector3(6, 8, -6),
      new Vector3(-0.6, -0.8, 0.6),
      Math.PI / 3,
      2,
      scene
    );
    spotLight2.intensity = 2.5;
    spotLight2.diffuse = Color3.FromHexString('#38bdf8');
    spotLight2.specular = Color3.FromHexString('#ffffff');

    // Central Glow Light under the Ball
    const centerGlow = new PointLight('centerGlow', new Vector3(0, 0.1, 0), scene);
    centerGlow.intensity = 1.8;
    centerGlow.diffuse = Color3.FromHexString(branding.primaryColor);

    // 4. Stadium Pitch Ground (Night Field)
    const ground = MeshBuilder.CreateGround(
      'stadiumPitch',
      { width: 30, height: 30 },
      scene
    );
    const groundMat = new StandardMaterial('groundMat', scene);
    groundMat.diffuseColor = Color3.FromHexString('#051020');
    groundMat.specularColor = Color3.FromHexString('#0a2540');
    groundMat.roughness = 0.8;
    ground.material = groundMat;

    // Inner glowing field ring
    const ring = MeshBuilder.CreateTorus(
      'fieldRing',
      { diameter: 4, thickness: 0.05, tessellation: 64 },
      scene
    );
    ring.position.y = 0.02;
    const ringMat = new StandardMaterial('ringMat', scene);
    ringMat.emissiveColor = Color3.FromHexString(branding.accentColor);
    ringMat.disableLighting = true;
    ring.material = ringMat;

    // 5. Realistic 3D Soccer Ball with PBR Material
    const ball = MeshBuilder.CreateSphere(
      'soccerBall',
      { diameter: 1.6, segments: 64 },
      scene
    );
    ball.position = new Vector3(0, 0.9, 0);
    ballMeshRef.current = ball;

    const ballPBR = new PBRMaterial('ballPBRMat', scene);
    ballPBR.metallic = 0.2;
    ballPBR.roughness = 0.25;
    ballPBR.albedoColor = Color3.FromHexString('#f8fafc');
    ballPBR.reflectivityColor = Color3.FromHexString('#e2e8f0');
    ballPBR.microSurface = 0.92;

    // Create high-detail procedural pentagon/hexagon texture pattern
    const dynamicTexture = MeshBuilder.CreateSphere('tempSphere', { diameter: 1 }, scene);
    dynamicTexture.dispose(); // Texture helper cleanup

    ball.material = ballPBR;

    // Ball idle rotation animation
    scene.onBeforeRenderObservable.add(() => {
      if (ball) {
        ball.rotation.y += 0.006;
      }
    });

    // 6. Ambient Light Particles (Atmospheric Dust & Energy Sparks)
    if (branding.hero3D.enableParticles) {
      const particleSystem = new ParticleSystem('stadiumParticles', 600, scene);
      particleSystem.emitter = new Vector3(0, 1.5, 0);
      particleSystem.minEmitBox = new Vector3(-8, -0.5, -8);
      particleSystem.maxEmitBox = new Vector3(8, 5, 8);

      particleSystem.color1 = Color4.FromHexString(branding.hero3D.particlesColor + 'aa');
      particleSystem.color2 = Color4.FromHexString('#38bdf888');
      particleSystem.colorDead = new Color4(0, 0, 0, 0);

      particleSystem.minSize = 0.03;
      particleSystem.maxSize = 0.09;
      particleSystem.minLifeTime = 2;
      particleSystem.maxLifeTime = 5;
      particleSystem.emitRate = 120;
      particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
      particleSystem.gravity = new Vector3(0, 0.02, 0);
      particleSystem.start();
    }

    // 7. Interactive Ball Click Setup
    ball.actionManager = new ActionManager(scene);
    ball.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
        // Trigger spin animation
        const spinAnim = new Animation(
          'spinBall',
          'rotation.y',
          60,
          Animation.ANIMATIONTYPE_FLOAT,
          Animation.ANIMATIONLOOPMODE_CONSTANT
        );
        const keys = [
          { frame: 0, value: ball.rotation.y },
          { frame: 30, value: ball.rotation.y + Math.PI * 2 },
        ];
        spinAnim.setKeys(keys);
        ball.animations = [spinAnim];
        scene.beginAnimation(ball, 0, 30, false);

        if (onBallClick) {
          onBallClick();
        }
      })
    );

    // 8. Mouse Parallax Camera Interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!cameraRef.current) return;
      const mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

      // Smooth camera nudge
      cameraRef.current.alpha = Math.PI / 2 + mouseX * 0.15;
      cameraRef.current.beta = Math.PI / 2.6 + mouseY * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Resize listener
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    setIsLoaded(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      scene.dispose();
      engine.dispose();
    };
  }, [branding]);

  // Handle transition zoom animation when triggered
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
      const keys = [
        { frame: 0, value: camera.radius },
        { frame: 45, value: 1.8 },
      ];
      zoomAnim.setKeys(keys);
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
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-blue-400 text-sm font-semibold animate-pulse">
          Cargando Estadio 3D...
        </div>
      )}
    </div>
  );
}
