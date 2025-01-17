import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Stars } from "@react-three/drei";
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
function Scene({ objectList, setItemNumber, setModal }) {
  const meshRefs = useRef([]);
  const starsRef = useRef(); // Stars를 위한 ref 추가
  const controlsRef = useRef(); 
  const [textColors, setTextColors] = useState([]);
  const [targetCameraPos, setTargetCameraPos] = useState(null);
  const [targetLookAt, setTargetLookAt] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  const [texture1, texture2, texture3] = useLoader(THREE.TextureLoader, [
    '/img/tx01.webp',
    '/img/tx02.webp',
    '/img/tx03.webp'
  ]);
  
  useEffect(() => {
    if (texture1 && texture2 && texture3) {  // texture3 체크 추가
      console.log("Textures loaded:", texture1, texture2, texture3);
      
      // 텍스처 설정에 texture3 포함
      [texture1, texture2, texture3].forEach((texture, index) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.minFilter = THREE.LinearFilter;
        console.log(`Texture ${index} configured:`, texture);
      });
    }
  }, [texture1, texture2, texture3]);
  const generateColorFromPosition = (x, y) => {
    // 더 낮은 채도와 명도로 조정
    const hue = (x * 5 + y * 3) % 360;
    const saturation = 20 + (Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 15; // 채도 낮춤
    const lightness = 10 + (Math.sin((x + y) * 0.05) + 1) * 50; // 명도 낮춤

    return {
      primary: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
      // 보조색은 더 어둡게
      secondary: `hsl(${(hue + 180) % 360}, ${saturation}%, ${Math.max(
        3,
        lightness - 1
      )}%)`,
      // 발광 효과는 약하게
      glow: `hsl(${(hue + 45) % 360}, ${Math.min(
        saturation + 10,
        100
      )}%, ${Math.min(25, lightness + 10)}%)`,
    };
  };


  useFrame(({ clock }) => {
    if (starsRef.current) {
        starsRef.current.rotation.x = clock.getElapsedTime() * 0.005;
        starsRef.current.rotation.y = clock.getElapsedTime() * 0.005;
    }
});


  useFrame(({ camera }) => {
    meshRefs.current.forEach((mesh, index) => {
      if (mesh) {
        const rotationValue = 0.001 * (index + 1);
        mesh.rotation.x += rotationValue;
        mesh.rotation.y = mesh.rotation.x;

        // 카메라와의 거리 계산
        const distance = mesh.position.distanceTo(camera.position);
        const opacity = Math.max(0, 1 - distance / 15); // 거리 기반으로 투명도 조정

        // 텍스트 색상 업데이트
        setTextColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[index] = `rgba(255, 255, 255, ${opacity})`; // 투명도 적용
          return newColors;
        });
      }
      
    });


  });
//   
  useFrame(() => {
    if (targetCameraPos && isMoving && controlsRef.current) {
      const currentPos = controlsRef.current.object.position;
      currentPos.lerp(targetCameraPos, 0.05);
      controlsRef.current.target.lerp(targetLookAt, 0.05);
      
      controlsRef.current.update();
      
      // 이동이 완료되면 모든 상태 초기화하고 타겟 추적 중단
      if (currentPos.distanceTo(targetCameraPos) < 0.01) {
        controlsRef.current.target.copy(targetLookAt); // 마지막 위치로 타겟 설정
        setTargetCameraPos(null);
        setTargetLookAt(null);
        setIsMoving(false);
        controlsRef.current.enabled = true; // OrbitControls 다시 활성화
      }
    }
  });
  const handleMeshClick = (item, position) => {
    setItemNumber(item.id);
  
    if (controlsRef.current) {
      const targetPosition = position.clone();
      const distance = 2;
      const newCameraPos = targetPosition.clone().add(new THREE.Vector3(0, 0, distance));
   
      controlsRef.current.enabled = false; // 이동 중에는 OrbitControls 비활성화
      setTargetLookAt(targetPosition);
      setTargetCameraPos(newCameraPos);
      setIsMoving(true);
    //   setModal(true)

    }
  };
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
          speed={2}
          rotate={true} 
        />
      </group>
      <fog attach="fog" args={["black", 5, 15]} />
      <ambientLight intensity={5} />
      <pointLight
       position={[0, 0, 15]}  // z축으로 더 멀리 이동하여 전체를 비춤
       intensity={10}        // 강도 증가
       distance={50}          // 도달 거리 증가
       decay={2} 
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
        const xPos = -10 + (item.objectstyle.x / window.innerWidth * 20);
        const yPos = -(-10 + (item.objectstyle.y / window.innerHeight * 20));
      
        const geometryType = index %5; 
        return (
          <mesh
            key={item.id}
            ref={(el) => (meshRefs.current[index] = el)}
            position={[xPos * screenScale, yPos * screenScale, 0]}
            scale={screenScale}
            onClick={() => {
                handleMeshClick(item, new THREE.Vector3(xPos * screenScale, yPos * screenScale, 0));
            }}
          >
            
            {geometryType === 0 && <sphereGeometry args={[1, 32, 32]} />} {/* 행성 */}
{geometryType === 1 && <torusGeometry args={[1, 0.3, 16, 100]} />} {/* 우주 정거장 */}
{geometryType === 2 && <icosahedronGeometry args={[1]} />} {/* 복잡한 위성 */}
{geometryType === 3 && <octahedronGeometry args={[1]} />} {/* 각진 위성 */}
{geometryType === 4 && <dodecahedronGeometry args={[1]} />} {/* 우주 구조물 */}

<meshStandardMaterial
 map={geometryType === 1 ? texture3 : index % 2 === 0 ? texture1 : texture2}  // 도넛(torus)은 texture3, 나머지는 texture1과 texture2 번갈아가며
//    emissive={colors.glow}
   emissiveIntensity={1}    // 발광 강도 조절
   metalness={geometryType === 1 ? 0.9 : 0.3}    // 도넛은 금속성 높게
   roughness={geometryType === 1 ? 0.2 : 0.6}    // 도넛은 거칠기 낮게 (더 반짝이게)
   transparent={true}
   wireframe={geometryType === 1}  // 도넛 모양일 때만 와이어프레임 적용
   wireframeLinewidth={1}          // 와이어프레임 선 두께
   opacity={1}
   fog={true}
   side={THREE.DoubleSide}
   envMapIntensity={geometryType === 1 ? 2 : 1.5} 
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
   <OrbitControls 
   ref={controlsRef}
   enableDamping={true}
   dampingFactor={1}
   enableRotate={true}  // 회전 활성화
   enableZoom={true}    // 줌 활성화
   enablePan={true}   
     />
    </>
  );
}

export default Scene;
