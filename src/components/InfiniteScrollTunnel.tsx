import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Sparkles, Compass } from 'lucide-react';

interface InfiniteScrollTunnelProps {
  isDarkMode?: boolean;
  customImages?: string[];
  height?: string;
  className?: string;
}

const DEFAULT_TUNNEL_IMAGES = [
  'src/assets/images/robot_ai_solutions_1789208998741.jpg',
  'src/assets/images/robot_turning_bulb_1789365471785.jpg',
  'src/assets/images/robot_thinking_wide_1789365436523.jpg',
  'src/assets/images/robot_ai_hologram_1789209021516.jpg',
  'src/assets/images/robot_idea_landscape_1789365418011.jpg',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
];

/**
 * InfiniteScrollTunnel
 * Implementation of Framer reference component:
 * https://framer.com/m/Infinite-scroll-F3bukW.js@RFzWw3xnhlB4MeO81nW3
 * 
 * Features:
 * - Real-time Three.js 3D infinite perspective wireframe tunnel
 * - Dynamic segment recycling: segments pass behind camera and reappear ahead
 * - Wall, floor, and ceiling artwork slabs populated with GSAP opacity reveal
 * - Page scroll-synced velocity flight + continuous soft auto-drift
 * - Decreased compact height suitable for viewport balance
 * - Maintains brand theme: dark slate-950, luminous electric blue grid lines, and glowing fog
 */
export const InfiniteScrollTunnel: React.FC<InfiniteScrollTunnelProps> = ({
  isDarkMode = true,
  customImages = DEFAULT_TUNNEL_IMAGES,
  height = '480px',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const segmentsRef = useRef<THREE.Group[]>([]);
  const scrollPosRef = useRef<number>(0);
  const autoDriftRef = useRef<number>(0);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const TUNNEL_WIDTH = 24;
  const TUNNEL_HEIGHT = 16;
  const SEGMENT_DEPTH = 6;
  const NUM_SEGMENTS = 14;
  const FLOOR_COLS = 6;
  const WALL_ROWS = 4;
  const COL_WIDTH = TUNNEL_WIDTH / FLOOR_COLS;
  const ROW_HEIGHT = TUNNEL_HEIGHT / WALL_ROWS;

  const populateImages = (
    group: THREE.Group,
    w: number,
    h: number,
    d: number,
    pool: string[] = customImages
  ) => {
    const textureLoader = new THREE.TextureLoader();
    const cellMargin = 0.4;
    const activePool = pool.length > 0 ? pool : DEFAULT_TUNNEL_IMAGES;

    const addImg = (pos: THREE.Vector3, rot: THREE.Euler, wd: number, ht: number) => {
      const url = activePool[Math.floor(Math.random() * activePool.length)];
      const geom = new THREE.PlaneGeometry(wd - cellMargin, ht - cellMargin);
      const mat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });

      textureLoader.load(
        url,
        tex => {
          tex.minFilter = THREE.LinearFilter;
          mat.map = tex;
          mat.needsUpdate = true;
          gsap.to(mat, { opacity: 0.88, duration: 0.8 });
        },
        undefined,
        () => {
          // Fallback solid tone if image load fails
          mat.color.setHex(0x1e293b);
          gsap.to(mat, { opacity: 0.6, duration: 0.5 });
        }
      );

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.copy(pos);
      mesh.rotation.copy(rot);
      mesh.name = 'slab_image';
      group.add(mesh);
    };

    let lastFloorIdx = -999;
    for (let i = 0; i < FLOOR_COLS; i++) {
      if (i > lastFloorIdx + 1 && Math.random() > 0.72) {
        addImg(
          new THREE.Vector3(-w + i * COL_WIDTH + COL_WIDTH / 2, -h, -d / 2),
          new THREE.Euler(-Math.PI / 2, 0, 0),
          COL_WIDTH,
          d
        );
        lastFloorIdx = i;
      }
    }

    let lastCeilIdx = -999;
    for (let i = 0; i < FLOOR_COLS; i++) {
      if (i > lastCeilIdx + 1 && Math.random() > 0.8) {
        addImg(
          new THREE.Vector3(-w + i * COL_WIDTH + COL_WIDTH / 2, h, -d / 2),
          new THREE.Euler(Math.PI / 2, 0, 0),
          COL_WIDTH,
          d
        );
        lastCeilIdx = i;
      }
    }

    let lastLeftIdx = -999;
    for (let i = 0; i < WALL_ROWS; i++) {
      if (i > lastLeftIdx + 1 && Math.random() > 0.7) {
        addImg(
          new THREE.Vector3(-w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2),
          new THREE.Euler(0, Math.PI / 2, 0),
          d,
          ROW_HEIGHT
        );
        lastLeftIdx = i;
      }
    }

    let lastRightIdx = -999;
    for (let i = 0; i < WALL_ROWS; i++) {
      if (i > lastRightIdx + 1 && Math.random() > 0.7) {
        addImg(
          new THREE.Vector3(w, -h + i * ROW_HEIGHT + ROW_HEIGHT / 2, -d / 2),
          new THREE.Euler(0, -Math.PI / 2, 0),
          d,
          ROW_HEIGHT
        );
        lastRightIdx = i;
      }
    }
  };

  const createSegment = (zPos: number): THREE.Group => {
    const group = new THREE.Group();
    group.position.z = zPos;
    const w = TUNNEL_WIDTH / 2;
    const h = TUNNEL_HEIGHT / 2;
    const d = SEGMENT_DEPTH;

    // Glowing cyan/blue grid lines matching executive dark theme
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isDarkMode ? 0x0284c7 : 0x38bdf8,
      transparent: true,
      opacity: isDarkMode ? 0.38 : 0.45,
    });

    const lineGeo = new THREE.BufferGeometry();
    const vertices: number[] = [];

    for (let i = 0; i <= FLOOR_COLS; i++) {
      const x = -w + i * COL_WIDTH;
      vertices.push(x, -h, 0, x, -h, -d);
      vertices.push(x, h, 0, x, h, -d);
    }
    for (let i = 1; i < WALL_ROWS; i++) {
      const y = -h + i * ROW_HEIGHT;
      vertices.push(-w, y, 0, -w, y, -d);
      vertices.push(w, y, 0, w, y, -d);
    }
    vertices.push(-w, -h, 0, w, -h, 0);
    vertices.push(-w, h, 0, w, h, 0);
    vertices.push(-w, -h, 0, -w, h, 0);
    vertices.push(w, -h, 0, w, h, 0);

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMaterial);
    group.add(lines);

    populateImages(group, w, h, d);
    return group;
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const bgHex = isDarkMode ? 0x020617 : 0xf8fafc;
    const fogHex = isDarkMode ? 0x020617 : 0xf8fafc;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(fogHex, 0.032);
    sceneRef.current = scene;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const heightPx = containerRef.current.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(70, width / heightPx, 0.1, 1000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const segments: THREE.Group[] = [];
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const z = -i * SEGMENT_DEPTH;
      const segment = createSegment(z);
      scene.add(segment);
      segments.push(segment);
    }
    segmentsRef.current = segments;

    let frameId: number;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      frameId = requestAnimationFrame(animate);

      if (!cameraRef.current || !sceneRef.current || !rendererRef.current) return;

      // Soft continuous auto-drift forward (always alive and moving)
      autoDriftRef.current += 0.25;

      // Target Z combines page scroll position + continuous auto-drift
      const scrollOffset = scrollPosRef.current * 0.06;
      const targetZ = -(scrollOffset + autoDriftRef.current);
      const currentZ = cameraRef.current.position.z;

      cameraRef.current.position.z += (targetZ - currentZ) * 0.08;

      // Gentle interactive camera sway from mouse / touch
      cameraRef.current.rotation.y = THREE.MathUtils.lerp(
        cameraRef.current.rotation.y,
        -mousePosRef.current.x * 0.12,
        0.05
      );
      cameraRef.current.rotation.x = THREE.MathUtils.lerp(
        cameraRef.current.rotation.x,
        mousePosRef.current.y * 0.08,
        0.05
      );

      const tunnelLength = NUM_SEGMENTS * SEGMENT_DEPTH;
      const camZ = cameraRef.current.position.z;

      // Infinite loop recycling of tunnel segments
      segmentsRef.current.forEach(segment => {
        if (segment.position.z > camZ + SEGMENT_DEPTH) {
          let minZ = 0;
          segmentsRef.current.forEach(s => (minZ = Math.min(minZ, s.position.z)));
          segment.position.z = minZ - SEGMENT_DEPTH;

          const toRemove: THREE.Object3D[] = [];
          segment.traverse(c => {
            if (c.name === 'slab_image') toRemove.push(c);
          });
          toRemove.forEach(c => {
            segment.remove(c);
            if (c instanceof THREE.Mesh) {
              c.geometry.dispose();
              if (c.material.map) c.material.map.dispose();
              c.material.dispose();
            }
          });
          populateImages(segment, TUNNEL_WIDTH / 2, TUNNEL_HEIGHT / 2, SEGMENT_DEPTH);
        }

        if (segment.position.z < camZ - tunnelLength - SEGMENT_DEPTH) {
          let maxZ = -999999;
          segmentsRef.current.forEach(s => (maxZ = Math.max(maxZ, s.position.z)));
          segment.position.z = maxZ + SEGMENT_DEPTH;

          const toRemove: THREE.Object3D[] = [];
          segment.traverse(c => {
            if (c.name === 'slab_image') toRemove.push(c);
          });
          toRemove.forEach(c => {
            segment.remove(c);
            if (c instanceof THREE.Mesh) {
              c.geometry.dispose();
              if (c.material.map) c.material.map.dispose();
              c.material.dispose();
            }
          });
          populateImages(segment, TUNNEL_WIDTH / 2, TUNNEL_HEIGHT / 2, SEGMENT_DEPTH);
        }
      });

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(frameId);
          animate();
        } else {
          cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    const onScroll = () => {
      scrollPosRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || 480;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);

      // Clean up Three.js resources
      segments.forEach(seg => {
        seg.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        });
      });
      renderer.dispose();
    };
  }, [isDarkMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mousePosRef.current = { x: nx, y: ny };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 select-none ${className}`}
      style={{
        height,
      }}
    >
      {/* Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* High-tech Vignette Overlays for Depth & Brand Theme */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 35%, rgba(2, 6, 23, 0.75) 90%)',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

      {/* Floating Top HUD Badges */}
      <div className="absolute top-4 sm:top-5 inset-x-4 sm:inset-x-8 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-sky-500/30 text-xs font-mono font-bold text-sky-400 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>3D Infinite Tunnel Architecture</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-sm border border-slate-700/80 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Infinite Flight Active
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80">
          <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Infinite Loop</span>
        </div>
      </div>

      {/* Centered Cave / Tunnel Title Overlay - Positioned at the Middle of the Cave */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 pointer-events-none z-10">
        <div className="max-w-xl mx-auto space-y-2.5 backdrop-blur-sm bg-slate-950/50 p-5 sm:p-7 rounded-3xl border border-sky-500/30 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/40 text-[11px] font-mono uppercase tracking-widest text-sky-300 font-bold">
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>Framer HeroTunnel Engine</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Continuous AI Neural Dimensional Walk
          </h3>

          <p className="text-xs sm:text-sm text-slate-200/90 max-w-md mx-auto leading-relaxed drop-shadow-md">
            Infinite 3D perspective wireframe tunnel with dynamic segment recycling and real-time visual slab mapping.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-sky-300/90 bg-slate-900/90 px-3.5 py-1 rounded-full border border-sky-500/20">
              Scroll page to accelerate through the tunnel ↕
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
