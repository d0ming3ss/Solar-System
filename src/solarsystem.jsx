import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Planet from "./Planet";
import SaturnRings from "./saturnrings";
import UranRings from "./uranring";

function ParticleBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticles = () => {
      const particlesArray = [];
      for (let i = 0; i < 100; i++) {
        const size = Math.random() * 0.02 + 0.02;
        const positionX = Math.random() * 200 - 100;
        const positionY = Math.random() * 200 - 100;
        const positionZ = Math.random() * 200 - 100;
        particlesArray.push({
          size,
          position: [positionX, positionY, positionZ],
        });
      }
      setParticles(particlesArray);
    };
    createParticles();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 70%)",
      }}
    >
      {particles.map((particle, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `calc(50% + ${particle.position[1]}px)`,
            left: `calc(50% + ${particle.position[0]}px)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: Math.random() * 0.6 + 0.4,
            boxShadow: `0 0 ${
              Math.random() * 15 + 5
            }px rgba(255, 255, 255, 0.7)`,
            animation: "blink 1.5s ease-in-out infinite alternate",
          }}
        />
      ))}
    </div>
  );
}

function SolarSystem() {
  const [angles, setAngles] = useState(Array(8).fill(0));
  const [angularSpeedFactor, setAngularSpeedFactor] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  function getAngularSpeed(index) {
    const orbitalSpeeds = [
      47.87, // Merkury
      35.02, // Wenus
      29.78, // Ziemia
      24.077, // Mars
      13.07, // Jowisz
      9.69, // Saturn
      6.81, // Uran
      5.43, // Neptun
    ];
    const orbitalRadius = [
      4, // Merkury
      7, // Wenus
      10, // Ziemia
      15, // Mars
      22, // Jowisz
      30, // Saturn
      40, // Uran
      50, // Neptun
    ];
    const orbitalPeriod =
      (2 * Math.PI * orbitalRadius[index]) / orbitalSpeeds[index];
    const angularSpeed = (2 * Math.PI) / orbitalPeriod;
    const slowdownFactor = 0.002;

    return angularSpeed * slowdownFactor;
  }

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setAngles((prevAngles) =>
        prevAngles.map(
          (angle, index) => angle + getAngularSpeed(index) * angularSpeedFactor
        )
      );
    }, 16);

    return () => clearInterval(interval);
  }, [angularSpeedFactor, isRunning]);

  const planetSizes = [
    1, // Merkury
    1.3, // Wenus
    1.5, // Ziemia
    1.2, // Mars
    4, // Jowisz
    2.7, // Saturn
    2.6, // Uran
    2.6, // Neptun
  ];

  const orbitalRadii = [
    12, // Merkury
    16, // Wenus
    22.2, // Ziemia
    27.5, // Mars
    38.5, // Jowisz
    53.5, // Saturn
    70.5, // Uran
    80, // Neptun
  ];

  const planetNames = [
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
  ];

  const planetPositions = orbitalRadii.map((radius, index) => [
    Math.cos(angles[index]) * radius,
    0,
    Math.sin(angles[index]) * radius,
  ]);

  return (
    <>
      <ParticleBackground />
      <Canvas
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 60, 100]} />
        <ambientLight intensity={0.5} />
        <group>
          <directionalLight position={[10, 10, 10]} />
          <pointLight position={[0, 0, 0]} intensity={1.5} /> {/* Słońce */}
        </group>
        <OrbitControls enableZoom={true} maxDistance={200} minDistance={30} />
        <Planet position={[0, 0, 0]} size={10} planetName="Sun" isSun={true} />
        {/* Słońce */}
        {planetPositions.map((position, index) => (
          <Planet
            key={index}
            position={position}
            size={planetSizes[index]}
            planetName={planetNames[index]}
          />
        ))}
        <SaturnRings position={planetPositions[5]} size={planetSizes[5]} />
        {/* Pierścienie Saturna */}
        <UranRings
          position={planetPositions[6]}
          size={planetSizes[6]}
          tiltAngle={50}
        />
        {/* Pierścienie Urana */}
      </Canvas>

      {/* Panel z miniaturkami po prawej stronie */}
      <div
        style={{
          paddingTop: "3%",
          paddingRight: "1%",
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "yellow",
              marginBottom: "5px",
              boxShadow: "0 0 15px 10px rgba(255, 255, 0, 0.7)",
            }}
          ></div>
          <span style={{ color: "white" }}>Słońce</span>
        </div>

        {planetNames.map((planetName, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: getPlanetColor(planetName),
                marginBottom: "5px",
              }}
            ></div>
            <span style={{ color: "white" }}>{planetName}</span>
          </div>
        ))}
      </div>

      {/* Przyciski do kontrolowania ruchu */}
      <div
        style={{
          paddingTop: "5%",
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: "20px",
          alignItems: "center",
          color: "white",
        }}
      >
        <button
          onClick={() => setIsRunning(false)}
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.3)",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
            transition: "background-color 0.3s ease",
          }}
        >
          STOP
        </button>
        <button
          onClick={() => setIsRunning(true)}
          style={{
            backgroundColor: "rgba(0, 255, 0, 0.3)",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
            transition: "background-color 0.3s ease",
          }}
        >
          START
        </button>
      </div>

      {/* Przyciski do zmiany prędkości */}
      <div
        style={{
          paddingTop: "20px",
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: "20px",
          alignItems: "center",
          color: "white",
        }}
      >
        <button
          onClick={() => setAngularSpeedFactor(angularSpeedFactor - 0.1)}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
            transition: "background-color 0.3s ease",
          }}
        >
          Reduce speed
        </button>
        <span style={{ fontSize: "18px" }}>
          {angularSpeedFactor.toFixed(2)}
        </span>
        <button
          onClick={() => setAngularSpeedFactor(angularSpeedFactor + 0.1)}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
            transition: "background-color 0.3s ease",
          }}
        >
          Increase speed
        </button>
      </div>

      {/* Napis "Solar system" */}
      <div
        style={{
          paddingLeft: "2%",
          position: "absolute",
          top: "30px",
          left: "20px",
          fontSize: "40px",
          fontWeight: "bold",
          color: "#fff",
          textShadow:
            "0px 0px 10px rgba(255, 255, 255, 0.9), 0px 0px 20px rgba(255, 255, 255, 0.6), 0px 0px 30px rgba(255, 255, 255, 0.4)",
          letterSpacing: "5px",
          animation: "glow 1.5s ease-in-out infinite alternate",
        }}
      >
        🌌 Solar System
      </div>

      {/* Znak wodny */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "14px",
          fontStyle: "italic",
          textShadow: "0 0 5px rgba(255, 255, 255, 0.9)",
        }}
      >
        © 2025 - Created by Dominik Ciura
      </div>

      <style>
        {`
          @keyframes glow {
            0% {
              text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.9), 0px 0px 20px rgba(255, 255, 255, 0.6), 0px 0px 30px rgba(255, 255, 255, 0.4);
            }
            100% {
              text-shadow: 0px 0px 20px rgba(255, 255, 255, 1), 0px 0px 30px rgba(255, 255, 255, 0.8), 0px 0px 50px rgba(255, 255, 255, 0.5);
            }
          }
        `}
      </style>
    </>
  );
}

function getPlanetColor(planetName) {
  switch (planetName) {
    case "Mercury":
      return "#808080"; // Szary
    case "Venus":
      return "#ffcc00"; // Żółto-pomarańczowy
    case "Earth":
      return "#0000ff"; // Niebieski
    case "Mars":
      return "#ff0000"; // Czerwony
    case "Jupiter":
      return "#b68c4a"; // Jasno-brązowy
    case "Saturn":
      return "#ccd200"; // Jasnożółty
    case "Uranus":
      return "#66ccff"; // Niebieski
    case "Neptune":
      return "#191970"; // Ciemnoniebieski
    default:
      return "#ffffff"; // Biały, jeśli brak planety
  }
}

export default SolarSystem;
