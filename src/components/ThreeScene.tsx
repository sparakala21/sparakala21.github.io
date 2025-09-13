'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current?.appendChild(renderer.domElement);
        camera.position.z = 5;

        const pointCount = 100000;
        const vertices = [];
        const colors = new Float32Array(pointCount * 3);
        const scale = 30 / 2000;
        for ( let i = 0; i < pointCount; i ++ ) {
            const x = THREE.MathUtils.randFloatSpread( 2000 );
            const y = THREE.MathUtils.randFloatSpread( 2000 );
            const z = THREE.MathUtils.randFloatSpread( 2000 );
            
            const hue = Math.random();
            const color = new THREE.Color().setHSL(hue, 0.7, 0.6);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            vertices.push( x, y, z );
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            sizeAttenuation: true,
            alphaTest: 0.5,
            transparent: true
            });
        const points = new THREE.Points( geometry, material );
        scene.add( points );

        // Render the scene and camera
        renderer.render(scene, camera);

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
    }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;