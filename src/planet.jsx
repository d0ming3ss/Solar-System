import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import PropTypes from "prop-types";
import * as THREE from "three";

function Planet({ position, size, planetName, isSun }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current && !isSun) {
      ref.current.rotation.y += 0.01;
    }
  });

  const planetMaterial = new THREE.MeshStandardMaterial({
    color: getPlanetColor(planetName),
    emissive: isSun ? new THREE.Color(1, 1, 0) : undefined,
    emissiveIntensity: isSun ? 1.5 : 0,
    roughness: 0.5,
    metalness: 0.5,
  });

  return (
    <Sphere ref={ref} args={[size, 32, 32]} position={position}>
      <meshStandardMaterial {...planetMaterial} />
    </Sphere>
  );
}

Planet.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.number.isRequired,
  planetName: PropTypes.string.isRequired,
  isSun: PropTypes.bool,
};

function getPlanetColor(planetName) {
  switch (planetName) {
    case "Mercury":
      return new THREE.Color(0.5, 0.5, 0.5); // Szary
    case "Venus":
      return new THREE.Color(1.0, 0.9, 0.3); // Żółto-pomarańczowy
    case "Earth":
      return new THREE.Color(0.0, 0.0, 1.0); // Niebieski
    case "Mars":
      return new THREE.Color(1.0, 0.0, 0.0); // Czerwony
    case "Jupiter":
      return new THREE.Color(0.7, 0.5, 0.3); // Jasno-brązowy
    case "Saturn":
      return new THREE.Color(0.8, 0.7, 0.2); // Jasnożółty
    case "Uranus":
      return new THREE.Color(0.4, 0.8, 1.0); // Niebieski
    case "Neptune":
      return new THREE.Color(0.1, 0.1, 0.7); // Ciemnoniebieski
    default:
      return new THREE.Color(1, 1, 1); // Biały, jeśli brak planety
  }
}

export default Planet;
