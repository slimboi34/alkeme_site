import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

// Floating Light
const FloatingLight = () => {
  const lightRef = useRef();

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime();
      lightRef.current.position.x = Math.sin(t) * 10;
      lightRef.current.position.y = Math.cos(t) * 10;
      lightRef.current.position.z = Math.sin(t) * 10;
    }
  });

  return <pointLight ref={lightRef} intensity={1} color="#C0C0C0" />;
};

// Faster Moving, White Wireframe Cubes
const MovingCubes = ({ count = 1000 }) => {
  const cubes = Array.from({ length: count }, () => ({
    position: [
      (Math.random() - 0.5) * 120, // Random x position
      (Math.random() - 0.5) * 120, // Random y position
      (Math.random() - 0.5) * 120  // Random z position
    ],
    velocity: [
      (Math.random() - 0.5) * 0.5, // Increased x velocity
      (Math.random() - 0.5) * 0.5, // Increased y velocity
      (Math.random() - 0.5) * 0.5  // Increased z velocity
    ]
  }));

  return (
    <>
      {cubes.map((cube, index) => (
        <MovingCube key={index} {...cube} />
      ))}
    </>
  );
};

const MovingCube = ({ position, velocity }) => {
  const cubeRef = useRef();

  useFrame(() => {
    if (cubeRef.current) {
      // Update position based on velocity
      cubeRef.current.position.x += velocity[0];
      cubeRef.current.position.y += velocity[1];
      cubeRef.current.position.z += velocity[2];

      // Bounce off boundaries
      const boundary = 100;
      if (cubeRef.current.position.x > boundary || cubeRef.current.position.x < -boundary) velocity[0] = -velocity[0];
      if (cubeRef.current.position.y > boundary || cubeRef.current.position.y < -boundary) velocity[1] = -velocity[1];
      if (cubeRef.current.position.z > boundary || cubeRef.current.position.z < -boundary) velocity[2] = -velocity[2];
    }
  });

  return (
    <mesh ref={cubeRef} position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial
        color="white"          // Set color to white for wireframe
        wireframe={true}       // Enable wireframe mode
      />
    </mesh>
  );
};

const Home = () => {
  return (
    <div className="home">
      {/* Three.js Canvas Background */}
      <Canvas
        camera={{ position: [100, 100, 25], fov: 60 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} color="#ffffff" />
        <FloatingLight />
        <Stars radius={150} depth={80} count={8000} factor={6} saturation={0} />
        <MovingCubes count={500} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Main Content */}
      <div className="content">
        <img src={`${process.env.PUBLIC_URL}/Icon.svg`} alt="Alkeme UX Logo" className="animated-icon" />
        <h1>Welcome to Alkeme UX</h1>
        <p>
          Our mission is to cultivate a community of forward-thinkers and game-changers, united by a passion for innovation.
        </p>
      </div>
    </div>
  );
};

export default Home;