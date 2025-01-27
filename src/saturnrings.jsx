import { useRef } from "react";
import { Ring } from "@react-three/drei";
import PropTypes from "prop-types";
import * as THREE from "three";

function SaturnRings({ position, size }) {
  const ref = useRef();

  return (
    <Ring
      ref={ref}
      args={[size + 1.5, size + 3, 64]}
      rotation={[Math.PI / 2, 0, 0]}
      position={position}
    >
      <meshStandardMaterial
        color="#c8c8c8"
        roughness={0.4}
        metalness={0.5}
        side={THREE.DoubleSide}
      />
    </Ring>
  );
}

SaturnRings.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.number.isRequired,
};

export default SaturnRings;
