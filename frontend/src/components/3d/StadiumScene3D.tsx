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
  Texture,
} from '@babylonjs/core';
import { TenantBranding, defaultJorgeNewberyBranding } from '@/config/tenantBranding';
import { MainObject3DType, ShieldShape3DType } from './Customizer3DPanel';

interface StadiumScene3DProps {
  branding?: TenantBranding;
  teamName?: string;
  fontSize?: number;
  selectedObject?: MainObject3DType;
  shieldShape?: ShieldShape3DType;
  customImageUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  objectScale?: number;
  onBallClick?: () => void;
  isTransitioning?: boolean;
}

export default function StadiumScene3D({
  branding = defaultJorgeNewberyBranding,
  teamName = '',
  fontSize = 34,
  selectedObject = 'ball',
  shieldShape = 'classic',
  customImageUrl = '',
  primaryColor,
  secondaryColor,
  accentColor,
  backgroundColor = '#040406',
  objectScale = 1.0,
  onBallClick,
  isTransitioning = false,
}: StadiumScene3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const mainMeshRef = useRef<Mesh | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Dynamic Effective Colors & Typography
  const activeName = teamName || branding.name || 'CLUB ATLÉTICO PINOCHO';
  const activeFontSize = fontSize || 34;
  const activePrimary = primaryColor || branding.primaryColor || '#dc2626';
  const activeSecondary = secondaryColor || branding.secondaryColor || '#0a0a0a';
  const activeAccent = accentColor || branding.accentColor || '#ffffff';
  const activeShieldUrl = customImageUrl || branding.shieldUrl || '';

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
      sceneRef.current = scene;
      try {
        const bgC = Color3.FromHexString(backgroundColor || '#040406');
        scene.clearColor = new Color4(bgC.r, bgC.g, bgC.b, 1);
      } catch (e) {
        scene.clearColor = new Color4(0.04, 0.04, 0.06, 1);
      }

      // 2. Camera Setup
      const camera = new ArcRotateCamera(
        'stadiumCamera',
        Math.PI / 2,
        Math.PI / 2.6,
        6.5,
        new Vector3(0, 0.6, 0),
        scene
      );
      camera.lowerRadiusLimit = 3.5;
      camera.upperRadiusLimit = 15;
      camera.lowerBetaLimit = Math.PI / 6;
      camera.upperBetaLimit = Math.PI / 2.05;
      camera.wheelDeltaPercentage = 0.01;
      camera.attachControl(canvas, true);
      cameraRef.current = camera;

      // 3. Lighting Setup (Dynamic Colors)
      const ambientLight = new HemisphericLight(
        'ambientLight',
        new Vector3(0, 1, 0),
        scene
      );
      ambientLight.intensity = 0.6;
      ambientLight.groundColor = Color3.FromHexString(activeSecondary);
      ambientLight.diffuse = Color3.FromHexString('#ffffff');

      // Floodlights
      const spotLight1 = new SpotLight(
        'stadiumLight1',
        new Vector3(-6, 8, -6),
        new Vector3(0.6, -0.8, 0.6),
        Math.PI / 3,
        2,
        scene
      );
      spotLight1.intensity = 3.2;
      spotLight1.diffuse = Color3.FromHexString(activePrimary);
      spotLight1.specular = Color3.FromHexString('#ffffff');

      const spotLight2 = new SpotLight(
        'stadiumLight2',
        new Vector3(6, 8, -6),
        new Vector3(-0.6, -0.8, 0.6),
        Math.PI / 3,
        2,
        scene
      );
      spotLight2.intensity = 3.2;
      spotLight2.diffuse = Color3.FromHexString(activePrimary);
      spotLight2.specular = Color3.FromHexString('#ffffff');

      // Central Glow Light
      const centerGlow = new PointLight('centerGlow', new Vector3(0, 0.1, 0), scene);
      centerGlow.intensity = 2.8;
      centerGlow.diffuse = Color3.FromHexString(activePrimary);

      // 4. Ground / Pitch Setup
      const ground = MeshBuilder.CreateGround(
        'stadiumPitch',
        { width: 36, height: 36 },
        scene
      );
      const groundMat = new StandardMaterial('groundMat', scene);
      groundMat.diffuseColor = Color3.FromHexString('#090d16');
      groundMat.specularColor = Color3.FromHexString('#200505');
      groundMat.roughness = 0.85;
      ground.material = groundMat;

      // Inner Ring with Active Color
      const ring = MeshBuilder.CreateTorus(
        'fieldRing',
        { diameter: 4.5, thickness: 0.07, tessellation: 64 },
        scene
      );
      ring.position.y = 0.02;
      const ringMat = new StandardMaterial('ringMat', scene);
      ringMat.emissiveColor = Color3.FromHexString(activePrimary);
      ringMat.disableLighting = true;
      ring.material = ringMat;

      // 5. MESH BUILDER DEPENDING ON SELECTED MAIN OBJECT
      let mainMesh: Mesh;

      if (selectedObject === 'shield') {
        // --- 8 GEOMETRIC 3D SHIELD SHAPE GENERATORS ---
        const shieldWidth = 2.2;
        const shieldHeight = 2.6;
        const depth = 0.25;

        // Custom polygon shapes for 8 shield variations
        const shapePoints: Vector3[] = [];
        switch (shieldShape) {
          case 'round':
            // Circular Shield
            for (let i = 0; i < 32; i++) {
              const angle = (i * 2 * Math.PI) / 32;
              shapePoints.push(new Vector3(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0));
            }
            break;
          case 'crest':
            // Gothic Crest
            shapePoints.push(
              new Vector3(0, 1.4, 0),
              new Vector3(1.1, 1.2, 0),
              new Vector3(1.1, 0.2, 0),
              new Vector3(0.6, -0.8, 0),
              new Vector3(0, -1.4, 0),
              new Vector3(-0.6, -0.8, 0),
              new Vector3(-1.1, 0.2, 0),
              new Vector3(-1.1, 1.2, 0)
            );
            break;
          case 'diamond':
            // Diamond Shield
            shapePoints.push(
              new Vector3(0, 1.4, 0),
              new Vector3(1.2, 0, 0),
              new Vector3(0, -1.4, 0),
              new Vector3(-1.2, 0, 0)
            );
            break;
          case 'octagon':
            // 8-Sided Polygon Shield
            for (let i = 0; i < 8; i++) {
              const angle = (i * 2 * Math.PI) / 8 + Math.PI / 8;
              shapePoints.push(new Vector3(Math.cos(angle) * 1.25, Math.sin(angle) * 1.25, 0));
            }
            break;
          case 'hexagon':
            // 6-Sided Polygon Shield
            for (let i = 0; i < 6; i++) {
              const angle = (i * 2 * Math.PI) / 6;
              shapePoints.push(new Vector3(Math.cos(angle) * 1.25, Math.sin(angle) * 1.25, 0));
            }
            break;
          case 'star':
            // Triangular Star Shield
            shapePoints.push(
              new Vector3(0, 1.5, 0),
              new Vector3(1.3, 0.6, 0),
              new Vector3(1.1, -0.7, 0),
              new Vector3(0, -1.4, 0),
              new Vector3(-1.1, -0.7, 0),
              new Vector3(-1.3, 0.6, 0)
            );
            break;
          case 'badge':
            // Modern Rounded Badge
            shapePoints.push(
              new Vector3(-1.0, 1.3, 0),
              new Vector3(1.0, 1.3, 0),
              new Vector3(1.1, 0.0, 0),
              new Vector3(0.8, -1.0, 0),
              new Vector3(0.0, -1.4, 0),
              new Vector3(-0.8, -1.0, 0),
              new Vector3(-1.1, 0.0, 0)
            );
            break;
          case 'classic':
          default:
            // Classic Football Shield
            shapePoints.push(
              new Vector3(-1.1, 1.3, 0),
              new Vector3(1.1, 1.3, 0),
              new Vector3(1.1, -0.1, 0),
              new Vector3(0.8, -0.8, 0),
              new Vector3(0, -1.4, 0),
              new Vector3(-0.8, -0.8, 0),
              new Vector3(-1.1, -0.1, 0)
            );
            break;
        }

        mainMesh = MeshBuilder.ExtrudeShape(
          'shield3D',
          {
            shape: shapePoints,
            path: [new Vector3(0, 0, -depth / 2), new Vector3(0, 0, depth / 2)],
            scale: 1,
            sideOrientation: Mesh.DOUBLESIDE,
            cap: Mesh.CAP_ALL,
          },
          scene
        );
        mainMesh.position = new Vector3(0, 1.3, 0);

      } else if (selectedObject === 'trophy') {
        // --- 3D TROPHY OBJECT ---
        const cup = MeshBuilder.CreateCylinder(
          'trophyCup',
          { height: 1.6, diameterTop: 1.5, diameterBottom: 0.6, tessellation: 32 },
          scene
        );
        const base = MeshBuilder.CreateBox('trophyBase', { width: 1.4, height: 0.6, depth: 1.4 }, scene);
        base.position.y = -0.9;
        base.parent = cup;

        const stem = MeshBuilder.CreateCylinder('trophyStem', { height: 0.6, diameter: 0.3 }, scene);
        stem.position.y = -0.5;
        stem.parent = cup;

        mainMesh = cup;
        mainMesh.position = new Vector3(0, 1.4, 0);

      } else if (selectedObject === 'stadium') {
        // --- 3D STADIUM MODEL ENSEMBLE ---
        const stadiumOuter = MeshBuilder.CreateCylinder(
          'stadiumWalls',
          { height: 1.2, diameterTop: 5.5, diameterBottom: 5.0, tessellation: 48 },
          scene
        );
        const fieldInner = MeshBuilder.CreateGround('stadiumFieldInner', { width: 3.8, height: 2.6 }, scene);
        fieldInner.position.y = 0.05;
        fieldInner.parent = stadiumOuter;

        mainMesh = stadiumOuter;
        mainMesh.position = new Vector3(0, 0.7, 0);

      } else {
        // --- 3D SOCCER BALL (DEFAULT MAIN OBJECT) ---
        mainMesh = MeshBuilder.CreateSphere(
          'soccerBall',
          { diameter: 1.6, segments: 64 },
          scene
        );
        mainMesh.position = new Vector3(0, 1.0, 0);
      }

      const s = objectScale || 1.0;
      mainMesh.scaling = new Vector3(s, s, s);
      mainMeshRef.current = mainMesh;

      // 6. MATERIAL & TEXTURE CREATION WITH LIVE USER IMAGE / ESCUDO
      const mainMat = new StandardMaterial('mainObjectMaterial', scene);
      mainMat.specularColor = Color3.FromHexString('#ffffff');
      mainMat.specularPower = 32;

      // Dynamic Canvas Texture for Ball / Shield / Trophy / Stadium
      const dynamicTex = new DynamicTexture('objectTex', { width: 1024, height: 1024 }, scene, true);
      const ctx = dynamicTex.getContext() as unknown as CanvasRenderingContext2D;

      if (ctx) {
        // Background Base Color (Secondary)
        ctx.fillStyle = activeSecondary;
        ctx.fillRect(0, 0, 1024, 1024);

        if (selectedObject === 'ball') {
          // Ball Base White / Accent
          ctx.fillStyle = activeAccent;
          ctx.fillRect(0, 0, 1024, 1024);

          // Draw Pentagons in Primary Color & Dark Secondary
          const drawPentagon = (cx: number, cy: number, r: number, isPrimary: boolean = false) => {
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
              const x = cx + r * Math.cos(angle);
              const y = cy + r * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = isPrimary ? activePrimary : activeSecondary;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 4;
            ctx.stroke();
          };

          const pentagonCoords = [
            { x: 150, y: 150, p: false }, { x: 512, y: 150, p: true }, { x: 874, y: 150, p: false },
            { x: 331, y: 512, p: true }, { x: 693, y: 512, p: false },
            { x: 150, y: 874, p: false }, { x: 512, y: 874, p: true }, { x: 874, y: 874, p: false },
          ];
          pentagonCoords.forEach((pt) => drawPentagon(pt.x, pt.y, 75, pt.p));

          // Central Band with Primary Color
          ctx.fillStyle = activePrimary;
          ctx.fillRect(0, 470, 1024, 84);

          ctx.fillStyle = activeAccent;
          ctx.font = `900 ${Math.round(activeFontSize * 1.15)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`★ ${activeName.toUpperCase()} ★`, 512, 512);

        } else if (selectedObject === 'shield') {
          // Shield Texture (Primary Color Body with Secondary & Accent Stripes)
          ctx.fillStyle = activePrimary;
          ctx.fillRect(0, 0, 1024, 1024);

          // Vertical stripes
          ctx.fillStyle = activeSecondary;
          ctx.fillRect(200, 0, 160, 1024);
          ctx.fillRect(664, 0, 160, 1024);

          // Outer Gold/Accent Border
          ctx.lineWidth = 36;
          ctx.strokeStyle = activeAccent;
          ctx.strokeRect(18, 18, 988, 988);

          // Team Name Typography on Shield Header
          ctx.fillStyle = activeAccent;
          ctx.font = `900 ${Math.round(activeFontSize * 1.25)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(activeName.toUpperCase(), 512, 140);

        } else if (selectedObject === 'trophy') {
          // Trophy Metallic Gold & Primary Color
          ctx.fillStyle = '#d97706'; // Metallic Gold
          ctx.fillRect(0, 0, 1024, 1024);

          ctx.fillStyle = activePrimary;
          ctx.fillRect(0, 400, 1024, 220);

          ctx.fillStyle = activeAccent;
          ctx.font = `900 ${Math.round(activeFontSize * 1.1)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(activeName.toUpperCase(), 512, 512);

        } else {
          // Stadium Field texture
          ctx.fillStyle = '#15803d'; // Field Green
          ctx.fillRect(0, 0, 1024, 1024);

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 16;
          ctx.strokeRect(50, 50, 924, 924);
          ctx.beginPath();
          ctx.arc(512, 512, 180, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = activeAccent;
          ctx.font = `900 ${Math.round(activeFontSize * 1.2)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(activeName.toUpperCase(), 512, 512);
        }

        // --- DRAW LIVE CUSTOM UPLOADED FOTO OR URL ESCUDO ONTO 3D OBJECT ---
        if (activeShieldUrl) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            // Draw central logo / photo directly on 3D canvas
            const imgSize = selectedObject === 'shield' ? 512 : 320;
            const x = (1024 - imgSize) / 2;
            const y = (1024 - imgSize) / 2;

            // Optional circular crop mask for clean fit
            ctx.save();
            ctx.beginPath();
            ctx.arc(512, 512, imgSize / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, x, y, imgSize, imgSize);
            ctx.restore();

            // Border around logo
            ctx.beginPath();
            ctx.arc(512, 512, imgSize / 2, 0, Math.PI * 2);
            ctx.lineWidth = 8;
            ctx.strokeStyle = activeAccent;
            ctx.stroke();

            dynamicTex.update();
          };
          img.src = activeShieldUrl;
        }

        dynamicTex.update();
      }

      mainMat.diffuseTexture = dynamicTex;
      mainMesh.material = mainMat;

      // Object Rotation Animation
      scene.onBeforeRenderObservable.add(() => {
        if (mainMeshRef.current) {
          mainMeshRef.current.rotation.y += 0.007;
        }
      });

      // 7. Ambient Particle System
      if (branding.hero3D.enableParticles) {
        const particleSystem = new ParticleSystem('stadiumParticles', 500, scene);
        particleSystem.emitter = new Vector3(0, 1.5, 0);
        particleSystem.minEmitBox = new Vector3(-8, -0.5, -8);
        particleSystem.maxEmitBox = new Vector3(8, 5, 8);

        particleSystem.color1 = Color4.FromHexString(activePrimary + 'aa');
        particleSystem.color2 = Color4.FromHexString(activeAccent + '88');
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

      // 8. Interactive Object Click Event
      mainMesh.actionManager = new ActionManager(scene);
      mainMesh.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
          if (!mainMeshRef.current) return;
          const targetMesh = mainMeshRef.current;

          const spinAnim = new Animation(
            'spinObj',
            'rotation.y',
            60,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CONSTANT
          );
          spinAnim.setKeys([
            { frame: 0, value: targetMesh.rotation.y },
            { frame: 40, value: targetMesh.rotation.y + Math.PI * 4 },
          ]);

          const bounceAnim = new Animation(
            'bounceObj',
            'position.y',
            60,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CONSTANT
          );
          const initialY = targetMesh.position.y;
          bounceAnim.setKeys([
            { frame: 0, value: initialY },
            { frame: 20, value: initialY + 1.2 },
            { frame: 40, value: initialY },
          ]);

          targetMesh.animations = [spinAnim, bounceAnim];
          scene?.beginAnimation(targetMesh, 0, 40, false);

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
  }, [
    branding,
    activeName,
    activeFontSize,
    selectedObject,
    shieldShape,
    customImageUrl,
    activePrimary,
    activeSecondary,
    activeAccent,
  ]);

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

  // Real-time object scaling effect
  useEffect(() => {
    if (mainMeshRef.current) {
      const s = objectScale || 1.0;
      mainMeshRef.current.scaling = new Vector3(s, s, s);
    }
  }, [objectScale]);

  // Real-time background color effect
  useEffect(() => {
    if (sceneRef.current) {
      try {
        const bgC = Color3.FromHexString(backgroundColor || '#040406');
        sceneRef.current.clearColor = new Color4(bgC.r, bgC.g, bgC.b, 1);
      } catch (e) {}
    }
  }, [backgroundColor]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950">
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none cursor-grab active:cursor-grabbing outline-none"
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-red-500 text-sm font-bold animate-pulse">
          Cargando Render 3D Interactivo...
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-300 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 text-2xl font-bold">
            ⚽
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{branding.name}</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            Visualizador 3D — {branding.tagline}
          </p>
        </div>
      )}
    </div>
  );
}
