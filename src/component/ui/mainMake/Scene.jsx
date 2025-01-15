import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';

function Scene({ objectList, setItemNumber, setModal }) {
    const meshRefs = useRef([]);
    const [textColors, setTextColors] = useState(objectList.map(() => 'rgba(255, 255, 255, 0.8)')); // 초기 색상 설정

    const generateColorFromPosition = (x, y) => {
        const hue = ((x * 5) + (y * 3)) % 360;
        const saturation = 30 + ((Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 20);
        const lightness = 15 + ((Math.sin((x + y) * 0.05) + 1) * 10);
        
        return {
            primary: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            secondary: `hsl(${(hue + 180) % 360}, ${saturation}%, ${Math.max(5, lightness - 10)}%)`,
            glow: `hsl(${(hue + 90) % 360}, ${saturation}%, ${Math.min(40, lightness + 15)}%)`
        };
    };

    useFrame(({ camera }) => {
        meshRefs.current.forEach((mesh, index) => {
            if (mesh) {
                mesh.rotation.y += 0.001 * (index + 1); // 회전 속도 조정

                // 카메라와의 거리 계산
                const distance = mesh.position.distanceTo(camera.position);
                const opacity = Math.max(0, 1 - distance / 20); // 거리 기반으로 투명도 조정

                // 텍스트 색상 업데이트
                setTextColors(prevColors => {
                    const newColors = [...prevColors];
                    newColors[index] = `rgba(255, 255, 255, ${opacity})`; // 투명도 적용
                    return newColors;
                });
            }
        });
    });

    return (
        <>
            <fog attach="fog" args={['black', 5, 30]} />
            <ambientLight intensity={0.05} />
            <pointLight 
                position={[10, 10, 10]} 
                intensity={20}
                distance={20}
                decay={1}
            />
            
            {objectList.map((item, index) => {
                const colors = generateColorFromPosition(item.objectstyle.x, item.objectstyle.y);
                const screenScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
                // 정중앙에 맞추기 위해 수정
                const xPos = (item.objectstyle.x / window.innerWidth) * 20 - 10; // 중앙으로 이동
                const yPos = -((item.objectstyle.y / window.innerHeight) * 20 - 10); // Y축 반전
                
                return (
                    <mesh
                        key={item.id}
                        ref={el => meshRefs.current[index] = el}
                        position={[xPos * screenScale, yPos * screenScale, 0]}
                        scale={screenScale}
                        onClick={() => {
                            setItemNumber(item.id);
                            setModal(true);
                        }}
                    >
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshStandardMaterial 
                            color={colors.primary}
                            wireframe={true}
                            wireframeLinewidth={1}
                            emissive={colors.glow}
                            emissiveIntensity={0.5}
                            metalness={1}
                            roughness={0}
                            fog={true}
                        />
                        <Html
                            center
                            style={{
                                pointerEvents: 'none',
                                zIndex: -10
                            }}
                        >
                            <div className="text-[max(24px,1.5vw)] whitespace-nowrap text-center">
                                <p style={{ 
                                    color: textColors[index], // 상태에서 색상 가져오기
                                    textShadow: `0 0 8px ${colors.glow}`,
                                }} className="font-bold">
                                    {item.makeName}
                                </p>
                            </div>
                        </Html>
                    </mesh>
                );
            })}
            <OrbitControls /> {/* OrbitControls 추가 */}
        </>
    );
}

export default Scene; // default로 내보내기