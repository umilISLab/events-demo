import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Sphere() {
  const myMesh = useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    // myMesh.current.rotation.x = a * 0.1;
    myMesh.current.rotation.y = a * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[0, 0, 5]} />
      <mesh ref={myMesh}>
        <sphereGeometry args={[1.8, 64, 32]} />
        <meshStandardMaterial wireframe />
      </mesh>
    </>
  );
}

export default Sphere;
