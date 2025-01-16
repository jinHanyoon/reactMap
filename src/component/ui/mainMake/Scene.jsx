import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Stars } from "@react-three/drei";

function Scene({ objectList, setItemNumber, setModal }) {
  const meshRefs = useRef([]);
  const starsRef = useRef(); // Stars를 위한 ref 추가
  const [textColors, setTextColors] = useState([]);

  const generateColorFromPosition = (x, y) => {
    // 더 낮은 채도와 명도로 조정
    const hue = (x * 5 + y * 3) % 360;
    const saturation = 20 + (Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 15; // 채도 낮춤
    const lightness = 10 + (Math.sin((x + y) * 0.05) + 1) * 5; // 명도 낮춤

    return {
      primary: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      // 보조색은 더 어둡게
      secondary: `hsl(${(hue + 180) % 360}, ${saturation}%, ${Math.max(
        3,
        lightness - 5
      )}%)`,
      // 발광 효과는 약하게
      glow: `hsl(${(hue + 45) % 360}, ${Math.min(
        saturation + 10,
        100
      )}%, ${Math.min(25, lightness + 10)}%)`,
    };
  };

  useFrame(({ camera }) => {
    meshRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const rotationValue = 0.001 * (index + 1);
        mesh.rotation.x += rotationValue;
        mesh.rotation.y = mesh.rotation.x;

        // 카메라와의 거리 계산
        const distance = mesh.position.distanceTo(camera.position);
        const opacity = Math.max(0, 1 - distance / 20); // 거리 기반으로 투명도 조정

        // 텍스트 색상 업데이트
        setTextColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[index] = `rgba(255, 255, 255, ${opacity})`; // 투명도 적용
          return newColors;
        });
      }
    });
  });
  return (
    <>
      <group ref={starsRef}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade={true}
          speed={1}
        />
      </group>
      <fog attach="fog" args={["black", 5, 30]} />
      <ambientLight intensity={0.05} />
      <pointLight
        position={[10, 10, 10]}
        intensity={20}
        distance={20}
        decay={1}
      />

      {objectList.map((item, index) => {
        const colors = generateColorFromPosition(
          item.objectstyle.x,
          item.objectstyle.y
        );
        const screenScale = Math.min(
          window.innerWidth / 1920,
          window.innerHeight / 1080
        );
        // 정중앙에 맞추기 위해 수정
        const xPos = (item.objectstyle.x / window.innerWidth) * 20 - 10; // 중앙으로 이동
        const yPos = -((item.objectstyle.y / window.innerHeight) * 20 - 10); // Y축 반전
        const geometryType = index % 3;
        return (
          <mesh
            key={item.id}
            ref={(el) => (meshRefs.current[index] = el)}
            position={[xPos * screenScale, yPos * screenScale, 0]}
            scale={screenScale}
            onClick={() => {
              setItemNumber(item.id);
              setModal(true);
            }}
          >
            {geometryType === 0 && <sphereGeometry args={[1, 32, 32]} />}{" "}
            {/* 구체 */}
            {geometryType === 1 && (
              <torusGeometry args={[1, 0.4, 16, 100]} />
            )}{" "}
            {/* 우주 정거장 */}
            {geometryType === 2 && <octahedronGeometry args={[1]} />}{" "}
            {/* 위성 */}
            <meshStandardMaterial
              color={colors.primary}
              wireframe={true}
              wireframeLinewidth={1}
              emissive={colors.glow}
              emissiveIntensity={1}
              metalness={0.2}
              roughness={0.2}
              transparent={true}
              opacity={1}
              fog={true}
            />
            <Html
              center
              style={{
                pointerEvents: "none",
                zIndex: -10,
              }}
            >
              <div className="text-[max(17px,1vw)] whitespace-nowrap text-center translate-y-6 ">
                <p
                  style={{
                    color: textColors[index], // 상태에서 색상 가져오기
                    textShadow: `0 0 8px ${colors.glow}`,
                  }}
                  className="font-bold"
                >
                  {item.makeName}
                </p>
              </div>
            </Html>
          </mesh>
        );
      })}
      <OrbitControls />
    </>
  );
}

export default Scene;
