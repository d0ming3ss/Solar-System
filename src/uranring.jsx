import { useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { Torus } from "@react-three/drei";

function UranRings({ position, size, tiltAngle = 50 }) {
  const ref = useRef();

  const tilt = new THREE.Euler(THREE.MathUtils.degToRad(tiltAngle), 0, 0);

  return (
    <group position={position} rotation={tilt}>
      <Torus
        ref={ref}
        args={[size * 1.7, size * 0.02, 16, 100]}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color={new THREE.Color(1.2, 0.8, 0.9)}
          emissive={new THREE.Color(0, 1, 1)}
          emissiveIntensity={0.1}
        />
      </Torus>
    </group>
  );
}

UranRings.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.number.isRequired,
  tiltAngle: PropTypes.number,
};

export default UranRings;
