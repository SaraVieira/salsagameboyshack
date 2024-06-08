import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";

function CustomCarousel({ children }: { children: React.ReactNode[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
    }
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (children && val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (children && val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  return (
    <div className="relative w-full p-0 overflow-hidden flex justify-start items-center flex-row bg-black flex-nowrap">
      {children.map((item, index) => {
        return (
          <div
            className={
              "translate-x-0 transition-transform shrink-0 max-w-full overflow-hidden slider__item slider__item-active-" +
              (activeIndex + 1)
            }
            key={index}
          >
            {item}
          </div>
        );
      })}

      <button
        className="absolute top-1/2 -translate-y-1/2 z-20 text-4xl right-2 w-16 h-16"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          slideNext();
        }}
      >
        <ChevronRightIcon className="w-16 h-16" />
      </button>

      <button
        className="absolute z-20 text-4xl top-1/2 -translate-y-1/2 left-2 w-16 h-16"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          slidePrev();
        }}
      >
        <ChevronLeftIcon className="w-16 h-16" />
      </button>
    </div>
  );
}

export default CustomCarousel;
