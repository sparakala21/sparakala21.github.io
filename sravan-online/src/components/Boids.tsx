'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

class Boid {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    acceleration: THREE.Vector3;
    maxSpeed: number;
    constructor(x, y, z) {
        this.position = new THREE.Vector3(x, y, z);
        this.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
        );
        this.acceleration = new THREE.Vector3(0, 0, 0);
        this.maxSpeed = 2;
        this.maxForce = 0.03;
        this.separationRadius = 25;
        this.alignmentRadius = 50;
        this.cohesionRadius = 50;
    }

    update(boids) {
        // Calculate forces
        const sep = this.separate(boids);
        const ali = this.align(boids);
        const coh = this.cohesion(boids);

        // Weight the forces
        sep.multiplyScalar(1.5);
        ali.multiplyScalar(1.0);
        coh.multiplyScalar(1.0);

        // Apply forces
        this.acceleration.add(sep);
        this.acceleration.add(ali);
        this.acceleration.add(coh);

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

  separate(boids) {
    const steer = new THREE.Vector3(0, 0, 0);
    let count = 0;

    for (let boid of boids) {
      const distance = this.position.distanceTo(boid.position);
      if (distance > 0 && distance < this.separationRadius) {
        const diff = new THREE.Vector3()
          .subVectors(this.position, boid.position)
          .normalize()
          .divideScalar(distance); // Weight by distance
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

  align(boids) {
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

  cohesion(boids) {
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

  seek(target) {
    const desired = new THREE.Vector3().subVectors(target, this.position);
    desired.normalize();
    desired.multiplyScalar(this.maxSpeed);

    const steer = desired.sub(this.velocity);
    steer.clampLength(0, this.maxForce);
    return steer;
  }

  wrapAround() {
    const bounds = 200;
    if (this.position.x < -bounds) this.position.x = bounds;
    if (this.position.x > bounds) this.position.x = -bounds;
    if (this.position.y < -bounds) this.position.y = bounds;
    if (this.position.y > bounds) this.position.y = -bounds;
    if (this.position.z < -bounds) this.position.z = bounds;
    if (this.position.z > bounds) this.position.z = -bounds;
  }
}

const Boids = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const boidsRef = useRef([]);
  const pointsRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;
    containerRef.current?.appendChild(renderer.domElement);

    // Create boids
    const boidCount = 20;
    const boids = [];
    for (let i = 0; i < boidCount; i++) {
      const boid = new Boid(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
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
      colors[i3] = speed / 2; // Red
      colors[i3 + 1] = 0.5; // Green
      colors[i3 + 2] = 1 - speed / 2; // Blue
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8
    });

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    scene.add(points);

    // Animation loop
    const animate = () => {
      // Update boids
      for (let boid of boidsRef.current) {
        boid.update(boidsRef.current);
      }

      // Update geometry
      const positions = pointsRef.current.geometry.attributes.position.array;
      const colors = pointsRef.current.geometry.attributes.color.array;
      
      for (let i = 0; i < boidsRef.current.length; i++) {
        const boid = boidsRef.current[i];
        const i3 = i * 3;
        
        positions[i3] = boid.position.x;
        positions[i3 + 1] = boid.position.y;
        positions[i3 + 2] = boid.position.z;
        
        // Update color based on speed
        const speed = boid.velocity.length();
        colors[i3] = speed / 2;
        colors[i3 + 1] = 0.5;
        colors[i3 + 2] = 1 - speed / 2;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;

      // Slowly rotate the camera
      const time = Date.now() * 0.0005;
      camera.position.x = Math.cos(time) * 300;
      camera.position.z = Math.sin(time) * 300;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
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
    if (!isMouseDown ) return;

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
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden',
        background: '#0a0a0a'
      }} 
    />
  );
};

export default Boids;