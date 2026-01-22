import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './../../css/carrousel.css';

interface carrousel {
  imgs: string[];
  texts?: string[];
}

const CarrouselCAFSA = ({ imgs, texts }: carrousel) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 === imgs.length ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? imgs.length - 1 : prevIndex - 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [imgs]);

  return (
    <div className="carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={imgs[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <div className="overlay"></div>

      <div className="carousel-text">
        <motion.h2
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="textCarrousel"
        >
          {texts ? texts[currentIndex] : "CAFSA"}
        </motion.h2>
      </div>

      <div className="slide_direction">
        <div className="left" onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
            <path fill="white" d="M560 976 160 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </div>

        <div className="right" onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
            <path fill="white" d="m400 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </div>
      </div>

      <div className="indicator">
        {imgs.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarrouselCAFSA;