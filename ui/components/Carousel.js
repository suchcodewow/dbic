import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styled from "styled-components";
import { useCartContext, useCartDispatchContext } from "contexts/CartContext";

const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);

export default function EmblaCarousel({ catalog }) {
  const { cartDispatch } = useCartContext();
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 3,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <CarouselArea>
      <CarouselHeader>
        <h2>Suggestions for you</h2>
      </CarouselHeader>
      <CarouselViewPort ref={viewportRef}>
        <CarouselContainer>
          {catalog.map((item) => (
            <CarouselSlide
              key={item.id}
              onClick={() => cartDispatch({ type: "ADD_ITEM", item })}
            >
              <img src={`images/store/${item.img}`} alt="item" />
            </CarouselSlide>
          ))}
        </CarouselContainer>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </CarouselViewPort>
      <CarouselFooter />
    </CarouselArea>
  );
}
const CarouselFooter = styled.div`
  height: 20px;
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;
const CarouselHeader = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 20px;
  background-color: #fff;
  h2 {
    font-size: 22px;
    font-weight: 800;
    color: #333;
  }
`;
const CarouselSlide = styled.div`
  position: relative;
  /* flex: 0 0 100%; */
  width: 132px;
  height: 200px;
  background-color: #fff;
  /* display: flex; */
  img {
    padding: 15px;
    width: 132px;
    vertical-align: middle;
    max-height: 200px;
    margin: auto;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  padding: 0px;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const CarouselViewPort = styled.div`
  overflow: hidden;
  width: 100%;
`;

const CarouselArea = styled.div`
  position: relative;
  border-radius: 10px;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;

  .embla__button__svg {
    width: 100%;
    height: 100%;
    padding: 8px;
  }
  .embla__button {
    outline: 0;
    cursor: pointer;
    background-color: #333;
    touch-action: manipulation;
    position: absolute;
    z-index: 1;
    top: 50%;
    border: 0;
    justify-content: center;
    align-items: center;
    fill: #fff;
    padding: 0;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }
  button&:disabled {
    cursor: default;
    opacity: 0.3;
  }
  .embla__button--prev {
    left: 5px;
    width: 45px;
    height: 45px;
  }
  .embla__button--next {
    right: 5px;
    width: 45px;
    height: 45px;
  }
`;
