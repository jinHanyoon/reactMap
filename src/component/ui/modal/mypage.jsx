import React, { useEffect, useState } from 'react'
import supabase from '../../../api/supabase/supabaseApi'

export default function Modal({itemId,setModal}) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [startAnimation, setStartAnimation] = useState(true)

    useEffect(() => {
        setStartAnimation(true)
    }, [currentSlide])

    const handleNextSlide = () => {
        setStartAnimation(false)
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % 5)
        }, 300)
    }

    return (
        <div className='fixed h-full inset-0 flex items-center justify-center backdrop-blur-sm z-50'>
            <div className='relative text-white rounded-lg shadow-2xl p-6 md:p-10 max-w-3xl w-full h-full flex flex-col justify-between overflow-hidden mx-4'>
                <div className='h-full text-center pt-24 md:pt-12'>
                <ul>
                <li onClick={handleNextSlide}
        className={`transform transition-all duration-500 absolute w-full cursor-pointer
            ${currentSlide === 0 ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 font-space-mono">
            안녕하세요!
        </h2>
        <div className="mb-20">
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                효율적이면서도 인터랙티브한 웹사이트를 만드는
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                프론트엔드 개발자 윤진한입니다.
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                상상 속 아이디어를 현실의 웹사이트로 구현하는 일에
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                큰 즐거움을 느끼고,
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                최적화된 코드와 흥미로운 인터랙션으로
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap">
                사용자 경험을 향상시키고 있습니다.
            </p>
        </div>
    </li>

    <li onClick={handleNextSlide}
        className={`transform transition-all duration-500 absolute w-full cursor-pointer
            ${currentSlide === 1 ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
       <h2 className="text-4xl md:text-5xl font-bold mb-16 md:mb-32 font-space-mono  invisible">
        </h2>
        <div className="mb-20">
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                2년간의 퍼블리싱 학원 강의와
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                홈페이지 유지보수 경험으로
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                문제를 빠르게 파악하고 해결하는 능력을 키웠습니다.
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                Next.js, Supabase, Tailwind CSS 등
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-6">
                최신 기술을 활용한 실험적인 프로젝트를 통해
            </p>
            <p className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap">
                끊임없이 성장하고 있습니다.
            </p>
        </div>
    </li>
    <li onClick={handleNextSlide}
        className={`transform transition-all duration-500 absolute w-full cursor-pointer
            ${currentSlide === 2 ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 font-space-mono">
            Technical Skills
        </h2>
        <div className="text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap">
            <h3 className="text-2xl mb-3 text-blue-400">Primary Technologies</h3>
            <p className="mb-6">React • Next.js • JavaScript • jQuery</p>
            
            <h3 className="text-2xl mb-3 text-blue-400">Additional Expertise</h3>
            <p className="mb-6">GSAP • Supabase • React Three Fiber</p>

            <h3 className="text-2xl mb-3 text-blue-400">Development Tools</h3>
            <p className="mb-6">VS Code • Curosr </p>

            <h3 className="text-2xl mb-3 text-blue-400">Web Fundamentals</h3>
            <p>HTML5 • CSS3 • Tailwind CSS </p>
        </div>
    </li>
    <li onClick={handleNextSlide}
        className={`transform transition-all duration-500 absolute w-full cursor-pointer
            ${currentSlide === 3 ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 font-space-mono">
            Work Experience
        </h2>
        <div className="inline-block text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-20 text-left">
            <h3 className="text-2xl mb-4 text-blue-400">디자인나스</h3>
            <p className="mb-2">2022.04 - 2024.02 (1년 11개월)</p>
            <p className="mb-2">• 퍼블리싱 (HTML, jQuery)</p>
            <p className="mb-2">• 홈페이지 관리 및 유지보수</p>
            <p className="mb-8">• 퍼블리싱 강의</p>

            <h3 className="text-2xl mb-4 text-blue-400">주요 업무</h3>
            <p className="mb-2">• 기업 홈페이지 퍼블리싱 작업</p>
            <p className="mb-2">• 반응형 웹사이트 유지보수</p>
            <p className="mb-2">• HTML/CSS/jQuery 기초 강의</p>
        </div>
    </li>

    <li onClick={handleNextSlide}
        className={`transform transition-all duration-500 absolute w-full cursor-pointer
            ${currentSlide === 4 ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-16 font-space-mono">
            Preferred Team Culture
        </h2>
        <div className="inline-block text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-20 text-left">
            <h3 className="text-2xl mb-4 text-blue-400">추구하는 팀</h3>
            <p className="mb-2">• 서로 배려하며 존중하는 문화의 팀</p>
            <p className="mb-2">• 활발한 코드 리뷰와 피드백이 있는 팀</p>
            <p className="mb-8">• 새로운 시도를 장려하는 팀</p>
            
            <h3 className="text-2xl mb-4 text-blue-400">개인 성향</h3>
            <p className="mb-2">• 적극적이고 원활한 소통 지향</p>
            <p className="mb-2">• 새로운 기술에 대한 학습 열정</p>
            <p className="mb-2">• 끈기있는 문제 해결 능력</p>
        </div>
    </li>

   
</ul>
                </div>

                <button 
                    onClick={() => setModal(false)} 
                    className='mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl'
                >
                    닫기
                </button>
            </div>
        </div>
    )
}