import React, { useEffect, useState } from 'react'
import supabase from '../../../api/supabase/supabaseApi'

export default function Modal({itemId,setModal}) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [startAnimation, setStartAnimation] = useState(true)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    const minSwipeDistance = 50
    const totalSlides = 5

    useEffect(() => {
        setStartAnimation(true)
    }, [currentSlide])

    const handleNextSlide = () => {
        setStartAnimation(false)
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % 5)
        }, 300)
    }

    const handlePrevSlide = () => {
        setStartAnimation(false)
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + 5) % 5)
        }, 300)
    }

    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            handleNextSlide()
        }
        if (isRightSwipe) {
            handlePrevSlide()
        }
    }

    return (
        <div className='fixed h-full inset-0 flex items-center justify-center backdrop-blur-sm z-50'>
            <div 
                className='relative text-white rounded-lg shadow-2xl p-6 md:p-10 max-w-3xl w-full h-full flex flex-col justify-between overflow-hidden mx-4'
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className='h-[calc(100%-3rem)] text-center pt-12'>
                    <ul className='relative w-full h-[calc(100%-3rem)]'>
                        <li onClick={handleNextSlide}
                            className={`transform transition-all duration-500 absolute top-0 left-0 w-full cursor-pointer
                                ${currentSlide === 0 ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
                            <h2 className="text-3xl pt-6 md:text-5xl font-bold mb-14 md:mb-16 font-space-mono">
                                안녕하세요!

                            </h2>
                            <div className="mb-10">
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    효율적이면서도 인터랙티브한 웹사이트를 만드는
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    프론트엔드 개발자 윤진한입니다.
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    상상 속 아이디어를 현실의 웹사이트로 구현하는 일에
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    큰 즐거움을 느끼고,
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    최적화된 코드와 흥미로운 인터랙션으로
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal">
                                    사용자 경험을 향상시키고 있습니다.
                                </p>
                            </div>
                        </li>

                        <li onClick={handleNextSlide}
                            className={`transform transition-all duration-500 absolute w-full cursor-pointer
                                ${currentSlide === 1 ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-0'}`}>
                            <h2 className="text-3xl md:text-5xl font-bold mb-16 md:mb-32 font-space-mono invisible">
                            </h2>
                            <div className="text-3xl pt-6 md:text-5xl  mb-16 md:mb-16 font-space-mono">
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    2년간의 퍼블리싱 학원 강의와
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    홈페이지 유지보수 경험으로
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    문제를 빠르게 파악하고 해결하는 능력을 키웠습니다.
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    Next.js, Supabase, Tailwind CSS 등
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-6">
                                    최신 기술을 활용한 실험적인 프로젝트를 통해
                                </p>
                                <p className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal">
                                    끊임없이 성장하고 있습니다.
                                </p>
                            </div>
                        </li>

                        <li onClick={handleNextSlide}
                            className={`transform transition-all duration-500 absolute w-full cursor-pointer
                                ${currentSlide === 2 ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 font-space-mono">
                                Technical Skills
                            </h2>
                            <div className="text-sm md:text-lg leading-loose font-space-mono whitespace-normal">
                                <h3 className="text-xl md:text-2xl mb-3 text-blue-400">Primary Technologies</h3>
                                <p className="mb-6">React • Next.js • JavaScript • jQuery</p>
                                
                                <h3 className="text-xl md:text-2xl mb-3 text-blue-400">Additional Expertise</h3>
                                <p className="mb-6">GSAP • Supabase • React Three Fiber</p>

                                <h3 className="text-xl md:text-2xl mb-3 text-blue-400">Development Tools</h3>
                                <p className="mb-6">VS Code • Curosr </p>

                                <h3 className="text-xl md:text-2xl mb-3 text-blue-400">Web Fundamentals</h3>
                                <p>HTML5 • CSS3 • Tailwind CSS </p>
                            </div>
                        </li>

                        <li onClick={handleNextSlide}
                            className={`transform transition-all duration-500 absolute w-full cursor-pointer
                                ${currentSlide === 3 ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 font-space-mono">
                                Work Experience
                            </h2>
                            <div className="inline-block text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-10 text-left">
                                <h3 className="text-xl md:text-2xl mb-4 text-blue-400">디자인나스</h3>
                                <p className="mb-2">2022.04 - 2024.02 (1년 11개월)</p>
                                <p className="mb-2">• 퍼블리싱 (HTML, jQuery)</p>
                                <p className="mb-2">• 홈페이지 관리 및 유지보수</p>
                                <p className="mb-8">• 퍼블리싱 강의</p>

                                <h3 className="text-xl md:text-2xl mb-4 text-blue-400">주요 업무</h3>
                                <p className="mb-2">• 기업 홈페이지 퍼블리싱 작업</p>
                                <p className="mb-2">• 반응형 웹사이트 유지보수</p>
                                <p className="mb-2">• HTML/CSS/jQuery 기초 강의</p>
                            </div>
                        </li>

                        <li onClick={handleNextSlide}
                            className={`transform transition-all duration-500 absolute w-full cursor-pointer
                                ${currentSlide === 4 ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 font-space-mono">
                                Preferred Team Culture
                            </h2>
                            <div className="inline-block text-sm md:text-lg leading-loose font-space-mono whitespace-normal mb-10 text-left">
                                <h3 className="text-xl md:text-2xl mb-4 text-blue-400">추구하는 팀</h3>
                                <p className="mb-2">• 서로 배려하며 존중하는 문화의 팀</p>
                                <p className="mb-2">• 활발한 코드 리뷰와 피드백이 있는 팀</p>
                                <p className="mb-8">• 새로운 시도를 장려하는 팀</p>
                                
                                <h3 className="text-xl md:text-2xl mb-4 text-blue-400">개인 성향</h3>
                                <p className="mb-2">• 적극적이고 원활한 소통 지향</p>
                                <p className="mb-2">• 새로운 기술에 대한 학습 열정</p>
                                <p className="mb-2">• 끈기있는 문제 해결 능력</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex justify-center items-center gap-3 mb-8">
                        {[...Array(totalSlides)].map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                    currentSlide === index ? 'w-12 bg-blue-400' : 'w-3 bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                    <button 
                        onClick={() => setModal(false)} 
                        className='w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl'
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    )
}