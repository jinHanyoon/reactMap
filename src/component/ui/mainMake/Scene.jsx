import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

function Scene({ objectList, setItemNumber,setModal }) {
  // 3D 객체들의 참조를 저장하기 위한 refs
  const meshRefs = useRef([]); // 각 메시 객체에 대한 참조 배열
  const starsRef = useRef(); // 배경 별들의 참조
  const controlsRef = useRef(); // 카메라 컨트롤 참조

  // 텍스트 색상과 카메라 상태 관리
  const [textColors, setTextColors] = useState(() => new Array(objectList.length).fill('rgba(255, 255, 255, 1)'));
  const [cameraState, setCameraState] = useState({
    targetPos: null, // 카메라가 이동할 목표 위치
    lookAt: null,    // 카메라가 바라볼 위치
    isMoving: false  // 카메라 이동 중 여부
  });

  useEffect(() => {
  }, [controlsRef]); 
  // 텍스처 로딩
  const textures = useLoader(THREE.TextureLoader, [
    '/img/tx01.webp',
    '/img/tx02.webp',
    '/img/tx03.webp',

  ]);

  // 텍스처 설정 초기화
  useEffect(() => {
    textures.forEach(texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      texture.minFilter = THREE.LinearFilter;
    });
  }, [textures]);

  // 위치 기반 색상 생성 함수
  const generateColorFromPosition = useCallback((x, y) => {
    const hue = (x * 5 + y * 3) % 360;
    const saturation = 20 + (Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 15;
    const lightness = 10 + (Math.sin((x + y) * 0.05) + 1) * 50;

    return {
      glow: `hsl(${(hue + 45) % 360}, ${Math.min(saturation + 10, 100)}%, ${Math.min(25, lightness + 10)}%)`
    };
  }, []);

  // 메시 클릭 이벤트 핸들러
  const handleMeshClick = useCallback((item, position) => {
    setItemNumber(item.id);
    setModal(true)
    
    if (controlsRef.current) {
      const targetPosition = position.clone();
      const newCameraPos = targetPosition.clone().add(new THREE.Vector3(0, 0, 2));
      
      controlsRef.current.enabled = false;
      setCameraState({
        targetPos: newCameraPos,
        lookAt: targetPosition,
        isMoving: true
      });
    }
  }, [setItemNumber]);

  // 애니메이션 프레임 처리
  useFrame(({ clock, camera }) => {
    // 배경 별들 회전
    const time = clock.getElapsedTime() * 0.005;
    if (starsRef.current) {
      starsRef.current.rotation.set(time, time, 0);
    }

    // 각 메시의 회전과 텍스트 투명도 업데이트
    meshRefs.current.forEach((mesh, index) => {
      if (mesh) {
        // 메시 회전
        mesh.rotation.set(
          mesh.rotation.x + 0.001 * (index + 1),
          mesh.rotation.x,
          0
        );

        // 카메라와의 거리에 따른 텍스트 투명도 계산
        const opacity = Math.max(0, 1 - mesh.position.distanceTo(camera.position) / 15);
        setTextColors(prev => {
          const newColors = [...prev];
          newColors[index] = `rgba(255, 255, 255, ${opacity})`;
          return newColors;
        });
      }
    });

    // 카메라 이동 처리
    // 카메라 isMoving 과 controlsRef 값이 존재 할 경우
    // 위에 클릭 할 시 isMoving true 로 변경 controlRef = 현재 카메라 위치
    if (cameraState.isMoving && controlsRef.current) {
    //  최종 목적 값 click event 처리시 cameraState 좌표값 받음 
        const { targetPos, lookAt } = cameraState;
    //   현재 위치값
      const currentPos = controlsRef.current.object.position;
      
      // 부드러운 카메라 이동
      currentPos.lerp(targetPos, 0.05);
      controlsRef.current.target.lerp(lookAt, 0.05);
      controlsRef.current.update();

      // 목표 위치에 도달하면 이동 종료
      if (currentPos.distanceTo(targetPos) < 0.01) {
        controlsRef.current.target.copy(lookAt);
        controlsRef.current.enabled = true;
        setCameraState(prev => ({ ...prev, isMoving: false }));
      }
    }
  });

  // 화면 크기에 따른 스케일 계산
  const screenScale = useMemo(() => 
    Math.min(window.innerWidth / 1920, window.innerHeight / 1080),
    []
  );

  return (
    <>
      {/* 배경 별들 */}
      <group ref={starsRef}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
      </group>
      
      {/* 환경 설정 */}
      <fog attach="fog" args={["black", 5, 15]} />
      <ambientLight intensity={5} />
      <pointLight position={[0, 0, 15]} intensity={10} distance={50} decay={2} />

      {/* 3D 객체들 렌더링 */}
      {objectList.map((item, index) => {
        // 위치 계산
        const xPos = -10 + (item.objectstyle.x / window.innerWidth * 20);
        const yPos = -(-10 + (item.objectstyle.y / window.innerHeight * 20));
        const colors = generateColorFromPosition(item.objectstyle.x, item.objectstyle.y);
        const geometryType = item.id === 94 ? 1 : 0;

        return (
          <mesh
            key={item.id}
            ref={el => meshRefs.current[index] = el}
            position={[xPos * screenScale, yPos * screenScale, 
              // 소개 행성 모양
              item.id === 94 ? 5 : 0

            ]}
            scale={screenScale}
            onClick={() => handleMeshClick(
              item,
              new THREE.Vector3(xPos * screenScale, yPos * screenScale, 
                item.id === 94 ? 10 : 0
              )
            )}
          >
            {/* 지오메트리 타입에 따른 렌더링 */}
            {geometryType === 0 && <sphereGeometry args={[1, 32, 32]} />}
            {geometryType === 1 && <torusGeometry args={[1, 0.3, 16, 100]} />}
            {geometryType === 2 && <icosahedronGeometry args={[1]} />}
            {geometryType === 3 && <octahedronGeometry args={[1]} />}
            {geometryType === 4 && <dodecahedronGeometry args={[1]} />}

            {/* 재질 설정 */}
            <meshStandardMaterial
              map={geometryType === 1 ? textures[2] : index % 2 === 0 ? textures[0] : textures[1]}
              emissiveIntensity={1}
              metalness={geometryType === 1 ? 0.9 : 0.3}
              roughness={geometryType === 1 ? 0.2 : 0.6}
              transparent
              wireframe={geometryType === 1}
              opacity={1}
              fog
              side={THREE.DoubleSide}
              envMapIntensity={geometryType === 1 ? 2 : 1.5}
            />

            {/* HTML 오버레이 텍스트 */}
            <Html center style={{ pointerEvents: "none", zIndex: -10 }}>
              <div className="text-[max(17px,1vw)] whitespace-nowrap text-center translate-y-6">
                <p
                  className="font-bold"
                  style={{
                    color: textColors[index],
                    textShadow: `0 0 8px ${colors.glow}`
                  }}
                >
                  {item.makeName}
                </p>
              </div>
            </Html>
          </mesh>
        );
      })}

      {/* 카메라 컨트롤 */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={1}
        enableRotate
        enableZoom
        enablePan
      />
    </>
  );
}

export default Scene;
