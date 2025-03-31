'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000); // Black background

    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Create glowing lines that disappear halfway
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x66ff66, // Pale green color
      linewidth: 4, // Thicker lines
      opacity: 0.8,
      transparent: true,
    });

    const lines: any = [];
    const lineCount = 100; // Increased number of lines

    // Adjust separation by using a wider random range for x and z positions
    for (let i = 0; i < lineCount; i++) {
      const points = [];
      points.push(new THREE.Vector3(0, -1, 0)); // Start from the bottom
      points.push(new THREE.Vector3(0, 1, 0));  // End at the top

      // Create the line geometry and material
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);

      // Randomize the position and size of each line
      line.position.x = Math.random() * 4 - 2; // Wider range for x to separate lines
      line.position.z = Math.random() * 4 - 2; // Wider range for z to separate lines

      // Add line to the scene
      scene.add(line);
      lines.push(line);
    }

    camera.position.z = 3;

    // Animation loop for line motion and fading effect
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate lines and make them disappear halfway
      lines.forEach((line: any) => {
        line.position.y += 0.01; // Move the lines upwards
        if (line.position.y > 0.5) {
          line.material.opacity = Math.max(0, 1 - (line.position.y - 0.5)); // Fade out halfway
        }

        if (line.position.y > 1) { // Reset lines to bottom after reaching top
          line.position.y = -1;
          line.material.opacity = 0.8; // Reset opacity
        }
      });

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={canvasRef} className="absolute top-0 left-0 z-[-1] w-full h-full">
      {/* Background will be rendered here */}
    </div>
  );
};

export default Background;
