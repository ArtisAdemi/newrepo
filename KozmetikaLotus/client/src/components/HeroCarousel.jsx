import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LotusHero from "../images/LotusHero.png";
import overlap from "../images/overlap.png"

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        { url: LotusHero, text: "Unlock Your Natural Glow" },
        { url: overlap, text: "Artistic Overlap Design" },
        { url: LotusHero, text: "Another Stunning Lotus Image" },
    ];

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length -1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return(
        <div className="h-[450px] md:h-[950px] w-full ">
            <div style={{backgroundImage: `url(${slides[currentIndex].url})`}} className="w-full h-full bg-center bg-cover duration-500">
                <div className="flex items-center justify-center">
                    <p className="mt-[205px] md:mt-[450px] text-white text-2xl md:text-7xl font-eb-garamond font-bold">{slides[currentIndex].text}</p>
                </div>
            </div>
            <div className="-mt-64 md:-mt-[500px] flex items-center justify-between">
                <button className="text-white opacity-70" onClick={prevSlide}><IoIosArrowBack size={50}/></button>
                <button className="text-white opacity-70" onClick={nextSlide}><IoIosArrowForward size={50}/></button>
            </div>
            <div className="mt-36 md:mt-[375px] right-0 left-0">
                 <div className="flex items-center justify-center gap-2">
                     {slides.map((_, i) => (
                         <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${currentIndex === i ? "p-2" : "bg-opacity-50"}`}>

                         </div>
                     ))}
                 </div>
            </div>
        </div>
    )
}