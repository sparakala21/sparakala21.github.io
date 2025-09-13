'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface BoidParams {
  boidCount: number;
  maxSpeed: number;
  maxForce: number;
  separationRadius: number;
  alignmentRadius: number;
  cohesionRadius: number;
  separationWeight: number;
  alignmentWeight: number;
  cohesionWeight: number;
  predatorAvoidanceRadius: number;
  predatorAvoidanceWeight: number;
}

class Boid {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  maxSpeed: number;
  maxForce: number;
  separationRadius: number;
  alignmentRadius: number;
  cohesionRadius: number;
  separationWeight: number;
  alignmentWeight: number;
  cohesionWeight: number;
  predatorAvoidanceRadius: number;
  predatorAvoidanceWeight: number;

  constructor(x: number, y: number, z: number, params: Partial<BoidParams> = {}) {
    this.position = new THREE.Vector3(x, y, z);
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.maxSpeed = params.maxSpeed || 2;
    this.maxForce = params.maxForce || 0.03;
    this.separationRadius = params.separationRadius || 25;
    this.alignmentRadius = params.alignmentRadius || 50;
    this.cohesionRadius = params.cohesionRadius || 50;
    this.separationWeight = params.separationWeight || 1.5;
    this.alignmentWeight = params.alignmentWeight || 1.0;
    this.cohesionWeight = params.cohesionWeight || 1.0;
    this.predatorAvoidanceRadius = params.predatorAvoidanceRadius || 100;
    this.predatorAvoidanceWeight = params.predatorAvoidanceWeight || 3.0;
  }

  update(boids: Boid[], predatorPosition?: THREE.Vector3) {
    // Calculate forces
    const sep = this.separate(boids);
    const ali = this.align(boids);
    const coh = this.cohesion(boids);
    const flee = predatorPosition ? this.fleePredator(predatorPosition) : new THREE.Vector3(0, 0, 0);

    // Weight the forces
    sep.multiplyScalar(this.separationWeight);
    ali.multiplyScalar(this.alignmentWeight);
    coh.multiplyScalar(this.cohesionWeight);
    flee.multiplyScalar(this.predatorAvoidanceWeight);

    // Apply forces
    this.acceleration.add(sep);
    this.acceleration.add(ali);
    this.acceleration.add(coh);
    this.acceleration.add(flee);

    // Update velocity
    this.velocity.add(this.acceleration);
    this.velocity.clampLength(0, this.maxSpeed);

    // Update position
    this.position.add(this.velocity);

    // Reset acceleration
    this.acceleration.multiplyScalar(0);

    // Wrap around edges
    this.wrapAround();
  }

  updateParams(params: Partial<BoidParams>) {
    this.separationRadius = params.separationRadius || this.separationRadius;
    this.alignmentRadius = params.alignmentRadius || this.alignmentRadius;
    this.cohesionRadius = params.cohesionRadius || this.cohesionRadius;
    this.separationWeight = params.separationWeight || this.separationWeight;
    this.alignmentWeight = params.alignmentWeight || this.alignmentWeight;
    this.cohesionWeight = params.cohesionWeight || this.cohesionWeight;
    this.maxSpeed = params.maxSpeed || this.maxSpeed;
    this.maxForce = params.maxForce || this.maxForce;
    this.predatorAvoidanceRadius = params.predatorAvoidanceRadius || this.predatorAvoidanceRadius;
    this.predatorAvoidanceWeight = params.predatorAvoidanceWeight || this.predatorAvoidanceWeight;
  }

  fleePredator(predatorPosition: THREE.Vector3): THREE.Vector3 {
    const distance = this.position.distanceTo(predatorPosition);
    
    if (distance < this.predatorAvoidanceRadius && distance > 0) {
      // Calculate flee force - opposite direction from predator
      const desired = new THREE.Vector3().subVectors(this.position, predatorPosition);
      desired.normalize();
      
      // Stronger force when closer to predator
      const panicFactor = Math.max(0, (this.predatorAvoidanceRadius - distance) / this.predatorAvoidanceRadius);
      const speedMultiplier = this.maxSpeed * (1 + panicFactor * 2); // Up to 3x speed when panicking
      
      desired.multiplyScalar(speedMultiplier);
      
      const steer = desired.sub(this.velocity);
      steer.clampLength(0, this.maxForce * (1 + panicFactor)); // Stronger steering when panicking
      return steer;
    }
    
    return new THREE.Vector3(0, 0, 0);
  }

  separate(boids: Boid[]): THREE.Vector3 {
    const steer = new THREE.Vector3(0, 0, 0);
    let count = 0;

    for (let boid of boids) {
      const distance = this.position.distanceTo(boid.position);
      if (distance > 0 && distance < this.separationRadius) {
        const diff = new THREE.Vector3()
          .subVectors(this.position, boid.position)
          .normalize()
          .divideScalar(distance);
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.divideScalar(count);
      steer.normalize();
      steer.multiplyScalar(this.maxSpeed);
      steer.sub(this.velocity);
      steer.clampLength(0, this.maxForce);
    }

    return steer;
  }

  align(boids: Boid[]): THREE.Vector3 {
    const sum = new THREE.Vector3(0, 0, 0);
    let count = 0;

    for (let boid of boids) {
      const distance = this.position.distanceTo(boid.position);
      if (distance > 0 && distance < this.alignmentRadius) {
        sum.add(boid.velocity);
        count++;
      }
    }

    if (count > 0) {
      sum.divideScalar(count);
      sum.normalize();
      sum.multiplyScalar(this.maxSpeed);
      const steer = sum.sub(this.velocity);
      steer.clampLength(0, this.maxForce);
      return steer;
    }

    return new THREE.Vector3(0, 0, 0);
  }

  cohesion(boids: Boid[]): THREE.Vector3 {
    const sum = new THREE.Vector3(0, 0, 0);
    let count = 0;

    for (let boid of boids) {
      const distance = this.position.distanceTo(boid.position);
      if (distance > 0 && distance < this.cohesionRadius) {
        sum.add(boid.position);
        count++;
      }
    }

    if (count > 0) {
      sum.divideScalar(count);
      return this.seek(sum);
    }

    return new THREE.Vector3(0, 0, 0);
  }

  seek(target: THREE.Vector3): THREE.Vector3 {
    const desired = new THREE.Vector3().subVectors(target, this.position);
    desired.normalize();
    desired.multiplyScalar(this.maxSpeed);

    const steer = desired.sub(this.velocity);
    steer.clampLength(0, this.maxForce);
    return steer;
  }

  wrapAround() {
    const bounds = 800;
    if (this.position.x < -bounds) this.position.x = bounds;
    if (this.position.x > bounds) this.position.x = -bounds;
    if (this.position.y < -bounds) this.position.y = bounds;
    if (this.position.y > bounds) this.position.y = -bounds;
    if (this.position.z < -bounds) this.position.z = bounds;
    if (this.position.z > bounds) this.position.z = -bounds;
  }
}

const Boids: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const boidsRef = useRef<Boid[]>([]);
  const pointsRef = useRef<THREE.Points | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const predatorPositionRef = useRef<THREE.Vector3 | null>(null);
  const [showControls, setShowControls] = useState(false);
  
  const [params, setParams] = useState<BoidParams>({
    boidCount: 200,
    maxSpeed: 2,
    maxForce: 0.03,
    separationRadius: 25,
    alignmentRadius: 50,
    cohesionRadius: 50,
    separationWeight: 1.5,
    alignmentWeight: 1.0,
    cohesionWeight: 1.0,
    predatorAvoidanceRadius: 100,
    predatorAvoidanceWeight: 3.0
  });

  const updateParams = (newParams: BoidParams) => {
    setParams(newParams);
    boidsRef.current.forEach(boid => {
      boid.updateParams(newParams);
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let animationId: number;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 300);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    containerRef.current?.appendChild(renderer.domElement);

    // Create boids
    const boidCount = params.boidCount;
    const boids: Boid[] = [];
    for (let i = 0; i < boidCount; i++) {
      const boid = new Boid(
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 1200,
        params
      );
      boids.push(boid);
    }
    boidsRef.current = boids;

    // Create geometry for points
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(boidCount * 3);
    const colors = new Float32Array(boidCount * 3);

    // Initialize positions and colors
    for (let i = 0; i < boidCount; i++) {
      const i3 = i * 3;
      positions[i3] = boids[i].position.x;
      positions[i3 + 1] = boids[i].position.y;
      positions[i3 + 2] = boids[i].position.z;
      
      // Color based on velocity
      const speed = boids[i].velocity.length();
      colors[i3] = speed / 2;
      colors[i3 + 1] = 0.5;
      colors[i3 + 2] = 1 - speed / 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    scene.add(points);

    // Mouse tracking for predator position
    const updateMousePosition = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Convert mouse position to 3D world coordinates
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      
      // Project mouse position onto a plane at z=0
      const planeNormal = new THREE.Vector3(0, 0, 1);
      const planePoint = new THREE.Vector3(0, 0, 0);
      const plane = new THREE.Plane(planeNormal, 0);
      const intersection = new THREE.Vector3();
      
      if (raycasterRef.current.ray.intersectPlane(plane, intersection)) {
        predatorPositionRef.current = intersection;
      }
    };

    const onMouseLeave = () => {
      predatorPositionRef.current = null;
    };

    // Animation loop
    const animate = () => {
      // Update boids with predator position
      for (let boid of boidsRef.current) {
        boid.update(boidsRef.current, predatorPositionRef.current || undefined);
      }

      // Update geometry
      if (pointsRef.current) {
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
        
        for (let i = 0; i < boidsRef.current.length; i++) {
          const boid = boidsRef.current[i];
          const i3 = i * 3;
          
          positions[i3] = boid.position.x;
          positions[i3 + 1] = boid.position.y;
          positions[i3 + 2] = boid.position.z;
          
          // Update color based on speed and fear
          const speed = boid.velocity.length();
          const predatorDistance = predatorPositionRef.current ? 
            boid.position.distanceTo(predatorPositionRef.current) : Infinity;
          const fearFactor = predatorDistance < boid.predatorAvoidanceRadius ? 
            1 - (predatorDistance / boid.predatorAvoidanceRadius) : 0;
          
          // More red when afraid, more blue when calm
          colors[i3] = Math.min(1, (speed / 2) + fearFactor);
          colors[i3 + 1] = 0.5 * (1 - fearFactor);
          colors[i3 + 2] = Math.max(0, (1 - speed / 2) - fearFactor);
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.geometry.attributes.color.needsUpdate = true;
      }

      // Slowly rotate the camera
      const time = Date.now() * 0.0005;
      camera.position.x = Math.cos(time) * 300;
      camera.position.z = Math.sin(time) * 300;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Always update predator position
      updateMousePosition(event);

      if (!isMouseDown) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      // Rotate camera around origin
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(camera.position);
      spherical.theta -= deltaX * 0.01;
      spherical.phi += deltaY * 0.01;
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

      camera.position.setFromSpherical(spherical);
      camera.lookAt(0, 0, 0);

      mouseX = event.clientX;
      mouseY = event.clientY;

      renderer.render(scene, camera);
    };

    const handleWheel = (event: WheelEvent) => {
      const scale = event.deltaY > 0 ? 1.1 : 0.9;
      camera.position.multiplyScalar(scale);
      renderer.render(scene, camera);
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseleave', onMouseLeave);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [params.boidCount]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          overflow: 'hidden',
          background: '#0a0a0a',
          cursor: 'crosshair'
        }} 
      />
      
      {/* Toggle Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 15px',
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          backdropFilter: 'blur(10px)'
        }}
      >
        {showControls ? 'Hide Controls' : 'Show Controls'}
      </button>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        fontSize: '14px',
        maxWidth: '250px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#ff6b6b' }}>🦅 Predator Mode</h4>
        <p style={{ margin: '0', lineHeight: '1.4' }}>
          Move your cursor to act as a predator! Boids will flee in terror, turning red when afraid.
        </p>
      </div>

      {/* Control Panel */}
      {showControls && (
        <div style={{
          position: 'absolute',
          top: '70px',
          right: '20px',
          width: '300px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          fontSize: '14px',
          maxHeight: '70vh',
          overflowY: 'auto'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#fff' }}>Boids Parameters</h3>
          
          <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(255, 107, 107, 0.1)', borderRadius: '5px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#ff6b6b' }}>
                Predator Avoidance Radius: {params.predatorAvoidanceRadius}
              </label>
              <input
                type="range"
                min="50"
                max="200"
                step="10"
                value={params.predatorAvoidanceRadius}
                onChange={(e) => updateParams({...params, predatorAvoidanceRadius: parseInt(e.target.value)})}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#ff6b6b' }}>
                Predator Avoidance Weight: {params.predatorAvoidanceWeight.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={params.predatorAvoidanceWeight}
                onChange={(e) => updateParams({...params, predatorAvoidanceWeight: parseFloat(e.target.value)})}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Separation Weight: {params.separationWeight.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={params.separationWeight}
              onChange={(e) => updateParams({...params, separationWeight: parseFloat(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Alignment Weight: {params.alignmentWeight.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={params.alignmentWeight}
              onChange={(e) => updateParams({...params, alignmentWeight: parseFloat(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Cohesion Weight: {params.cohesionWeight.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={params.cohesionWeight}
              onChange={(e) => updateParams({...params, cohesionWeight: parseFloat(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Separation Radius: {params.separationRadius}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={params.separationRadius}
              onChange={(e) => updateParams({...params, separationRadius: parseInt(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Alignment Radius: {params.alignmentRadius}
            </label>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={params.alignmentRadius}
              onChange={(e) => updateParams({...params, alignmentRadius: parseInt(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Cohesion Radius: {params.cohesionRadius}
            </label>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={params.cohesionRadius}
              onChange={(e) => updateParams({...params, cohesionRadius: parseInt(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Max Speed: {params.maxSpeed.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={params.maxSpeed}
              onChange={(e) => updateParams({...params, maxSpeed: parseFloat(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Max Force: {params.maxForce.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.01"
              max="0.1"
              step="0.005"
              value={params.maxForce}
              onChange={(e) => updateParams({...params, maxForce: parseFloat(e.target.value)})}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginTop: '20px', fontSize: '12px', color: '#ccc' }}>
            <p><strong>Separation:</strong> Avoid crowding neighbors</p>
            <p><strong>Alignment:</strong> Steer towards average heading</p>
            <p><strong>Cohesion:</strong> Steer towards group center</p>
            <p style={{ color: '#ff6b6b' }}><strong>Predator Avoidance:</strong> Flee from threats</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boids;