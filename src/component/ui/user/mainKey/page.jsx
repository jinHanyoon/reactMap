import React, {  useEffect, useRef } from 'react'
import {usePositionStore} from '../../../../zustand/positoinStore.js'
export default function UserComponent({ userUUID, userID, }) {
  
  // zustand 위차값 전역변수 사용
  const updatePosition = usePositionStore(state => state.updatePosition)
  const elementRef = useRef(0);
  const xPos = useRef(0);
  const yPos = useRef(0);
  const rotation = useRef(0);
  const pressedKeys = useRef(new Set());  // 동시에 눌린 키를 추적

    useEffect(() => {
     if(userID === userUUID){
      const handleKeyDown = (e) => {
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
          pressedKeys.current.add(e.key);
        }

        // 현재 눌린 키들의 조합에 따라 방향 결정
        if (pressedKeys.current.has('ArrowUp') && pressedKeys.current.has('ArrowLeft')) {
          rotation.current = -135;  // 왼쪽 위 대각선
          xPos.current -= 7;
          yPos.current -= 7;
        } else if (pressedKeys.current.has('ArrowUp') && pressedKeys.current.has('ArrowRight')) {
          rotation.current = -45;   // 오른쪽 위 대각선
          xPos.current += 7;
          yPos.current -= 7;
        } else if (pressedKeys.current.has('ArrowDown') && pressedKeys.current.has('ArrowLeft')) {
          rotation.current = 135;   // 왼쪽 아래 대각선
          xPos.current -= 7;
          yPos.current += 7;
        } else if (pressedKeys.current.has('ArrowDown') && pressedKeys.current.has('ArrowRight')) {
          rotation.current = 45;    // 오른쪽 아래 대각선
          xPos.current += 7;
          yPos.current += 7;
        } else if (pressedKeys.current.has('ArrowUp')) {
          rotation.current = -90;   // 위
          yPos.current -= 10;
        } else if (pressedKeys.current.has('ArrowDown')) {
          rotation.current = 90;    // 아래
          yPos.current += 10;
        } else if (pressedKeys.current.has('ArrowLeft')) {
          rotation.current = 180;   // 왼쪽
          xPos.current -= 10;
        } else if (pressedKeys.current.has('ArrowRight')) {
          rotation.current = 0;     // 오른쪽
          xPos.current += 10;
        }
        
        elementRef.current.style.left = `${xPos.current}px`;
        elementRef.current.style.top = `${yPos.current}px`;
        elementRef.current.style.transform = `rotate(${rotation.current}deg)`;
        updatePosition({ x: xPos.current, y: yPos.current });
      };

      const handleKeyUp = (e) => {
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          pressedKeys.current.delete(e.key);
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
    }, [userID, userUUID, updatePosition]);
        useEffect(()=>{
})


  return (
    <>
    <div 
    ref={elementRef}
    className='w-10 h-10 '
    style={{ position: 'absolute', transition:'0.5s ease'}}
  >
    <img src='img/space.png' alt='space'></img>
    </div>


        </>
  );

}