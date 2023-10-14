import { useCallback, useEffect, useState, useRef, forwardRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";

export default function Carousel({ data }) {
  const { results, page } = data;

  // Truncate array to only 5 results
  const initialResults = results.slice(0, 5);
  // Limit page results from API call
  const pageLimit = 4;
  const minSlideLimit = 20;
  const [slides, setSlides] = useState(initialResults);

  const [pageCount, setPageCount] = useState(page);
  const [isSliderLoading, setSliderLoading] = useState(false);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);

  const fetchMoreResults = useCallback(async () => {
    if (!isSliderLoading) return;
    const data = await fetch(`${defaultEndpoint}&page=${pageCount}`);
    const newData = await data.json();
    setSlides((currentSlides) => {
      if (currentSlides.length === minSlideLimit || pageCount === pageLimit) {
        setHasMoreToLoad(false);
        return currentSlides;
      }
      setPageCount(pageCount + 1);
      return [...currentSlides, ...newData.results];
    });
  }, [setSlides, pageCount, isSliderLoading]);

  useEffect(() => {
    if (pageCount === slides.page) return;
    fetchMoreResults();
  }, [fetchMoreResults, slides.page, pageCount]);
  return (
    <section className="relative pt-12 overflow-hidden bg-gradient-to-t after:absolute after:top-0 after:left-0 after:right-0 after:w-full after:bg-gradient-to-t after:from-transparent after:to-black/50 after:z-[1] after:h-32 from-ui-700 via-ui-700 to-ui-800 min-h-screen text-white">
      <div className="w-full px-18">
        <Embla
          setSlides={setSlides}
          containScroll="trimSnaps"
          isSliderLoading={isSliderLoading}
          setSliderLoading={setSliderLoading}
          hasMoreToLoad={hasMoreToLoad}
        >
          {slides.map((slide, index) => {
            return (
              <div key={index}>
                {index}
                <VideoCard thumbnailStyle="poster" video={slide} />
              </div>
            );
          })}
        </Embla>
      </div>
    </section>
  );
}

const Embla = ({
  align = "start",
  axis = "x",
  containScroll = "",
  direction = "ltr",
  dragFree = false,
  draggable = true,
  inViewThreshold = 0,
  loop = false,
  skipSnaps = false,
  speed = 10,
  startIndex = 0,
  isSliderLoading = false,
  setSliderLoading,
  hasMoreToLoad,
  children,
  setSlides = () => {},
  ...props
}) => {
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [slidesInView, setSlidesInView] = useState([]);

  const [viewportRef, embla] = useEmblaCarousel({
    align: align,
    axis: axis,
    containScroll: containScroll,
    direction: direction,
    dragFree: dragFree,
    draggable: draggable,
    inViewThreshold: inViewThreshold,
    loop: loop,
    skipSnaps: skipSnaps,
    speed: speed,
    startIndex: startIndex,
  });

  const loadingMore = useInfiniteScroll(embla, children, hasMoreToLoad);
  // console.log(children);
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSliderLoading(loadingMore);
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
    setSlidesInView(embla.slidesInView(true));
  }, [embla, loadingMore, setSliderLoading]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className="relative mx-auto">
      <EmblaViewport ref={viewportRef}>
        <div className="grid w-full grid-flow-col auto-cols-2 sm:auto-cols-3 md:auto-cols-5 lg:auto-cols-7 xl:auto-cols-7">
          {Array.isArray(children)
            ? // ? React.Children.map(children, (child, index) => {
              children.map((child, index) => {
                let isInView = slidesInView.includes(index);
                return (
                  <div
                    key={index}
                    className={clsx("pl-4 transition-opacity duration-500", {
                      "opacity-100": isInView,
                      "opacity-50": !isInView,
                    })}
                  >
                    {/* {React.cloneElement(child)} */}
                  </div>
                );
              })
            : null}
          {hasMoreToLoad && (
            <div>
              <div>{loadingMore && <div>loading more</div>}</div>
            </div>
          )}
        </div>
      </EmblaViewport>
      <EmblaArrow onClick={scrollPrev} direction="left" enabled={prevBtnEnabled} />
      <EmblaArrow onClick={scrollNext} direction="right" enabled={nextBtnEnabled} />
    </div>
  );
};

const EmblaViewport = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      className={clsx(
        {
          "before:hidden before:content-slide-scroll-2 sm:before:content-slide-scroll-2 md:before:content-slide-scroll-3 lg:before:content-slide-scroll-5 xl:before:content-slide-scroll-7":
            !className || className === "",
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

EmblaViewport.displayName = "EmblaViewport";

export const useInfiniteScroll = (embla, slides, hasMoreToLoad) => {
  const scrollListener = useRef(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pointerIsDown, setPointerIsDown] = useState(false);

  const setPointerDown = useCallback(() => setPointerIsDown(true), []);
  const setPointerNotDown = useCallback(() => setPointerIsDown(false), []);

  const lastSlideIsInView = useCallback(() => {
    if (!embla) return false;
    const lastSlide = embla.slideNodes().length - 1;
    return embla.slidesInView().indexOf(lastSlide) !== -1;
  }, [embla]);

  const onScroll = useCallback(() => {
    if (!embla) return;
    setLoadingMore((isLoadingMore) => {
      if (isLoadingMore) return true;
      const shouldLoadMore = lastSlideIsInView();
      if (shouldLoadMore) embla.off("scroll", scrollListener.current);
      return shouldLoadMore;
    });
  }, [embla, setLoadingMore, lastSlideIsInView]);

  const addScrollListener = useCallback(() => {
    if (!embla || !hasMoreToLoad) return;
    scrollListener.current = () => onScroll();
    embla.on("scroll", scrollListener.current);
  }, [embla, hasMoreToLoad, onScroll]);

  const reloadEmbla = useCallback(() => {
    if (!embla) return;
    const oldEngine = embla.internalEngine();
    embla.reInit();
    const newEngine = embla.internalEngine();
    const propsToCopy = ["scrollBody", "location", "target"];
    propsToCopy.forEach((p) => Object.assign(newEngine[p], oldEngine[p]));
    const { index } = newEngine.scrollTarget.byDistance(0, false);
    newEngine.index.set(index);
    newEngine.animation.start();
    setLoadingMore(false);
  }, [embla]);

  useEffect(() => {
    if (!embla || slides.length === embla.slideNodes().length - 1) return;
    const engine = embla.internalEngine();
    const boundsActive = engine.limit.reachedMax(engine.target.get());
    engine.scrollBounds.toggleActive(boundsActive);
  }, [embla, slides]);

  useEffect(() => {
    if (!embla || !hasMoreToLoad || pointerIsDown) return;
    if (slides.length === embla.slideNodes().length - 1) return;
    reloadEmbla();
    addScrollListener();
  }, [embla, slides, pointerIsDown, hasMoreToLoad, reloadEmbla, addScrollListener]);

  useEffect(() => {
    if (!embla || hasMoreToLoad) return;
    if (slides.length === embla.slideNodes().length) return;
    if (pointerIsDown && !lastSlideIsInView()) return;
    reloadEmbla();
    embla.off("pointerDown", setPointerDown);
    embla.off("pointerUp", setPointerNotDown);
  }, [embla, slides, hasMoreToLoad, pointerIsDown, setPointerDown, setPointerNotDown, reloadEmbla, lastSlideIsInView]);

  useEffect(() => {
    if (!embla) return;
    embla.on("pointerDown", setPointerDown);
    embla.on("pointerUp", setPointerNotDown);
    addScrollListener();
  }, [embla, setPointerDown, setPointerNotDown, addScrollListener]);

  return loadingMore;
};

const VideoCard = ({ video = {}, isInView, thumbnailStyle = "backdrop", ...props }) => {
  const { poster_path, id, backdrop_path, overview, title } = video;
  // const mediaType = 'poster';
  const mediaType = "backdrop";

  return (
    <Link
      tabIndex={isInView ? null : "-1"}
      href={`/watch/${id}`}
      className={clsx(
        "video-card will-change-transform cursor-pointer scale-100 group subpixel-antialiased relative transition-transform-shadow duration-300 ease-out block backface-hidden rounded-md overflow-hidden hover:bg-ui-800 w-full after:border-transparent after:border-4 after:absolute after:transition-border after:rounded-md after:duration-300 after:ease-out after:inset-0 hover:after:border-white",
        {}
      )}
      {...props}
    >
      <div className="relative overflow-hidden rounded-md backface-hidden after:absolute after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:inset-0 after:rounded-md after:bg-gradient-to-t after:from-black/70 after:to-black/70">
        <div className="block">
          {thumbnailStyle === "poster" ? (
            <Thumbnail width={175} height={250} src={poster_path} />
          ) : (
            <Thumbnail width={341} height={192} src={backdrop_path} />
          )}
        </div>
        <div className="absolute backface-hidden z-[1] bottom-0 transition-opacity duration-300 ease-in-out w-full h-full p-4 overflow-hidden opacity-0 rounded-md group-hover:opacity-100">
          <div className="flex-1">
            <span className="subpixel-antialiased font-medium leading-normal tracking-tight backface-hidden line-clamp-2 text-ellipsis">
              {!title ? "Not available" : title}
            </span>
            <p className="mt-2 text-xs line-clamp-2 text-ellipsis">{overview}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Image = ({
  src = "",
  className,
  width = 50,
  height = 50,
  layout = "responsive",
  fadeIn = true,
  alt = "",
  ...props
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleLoad = (event) => {
    event.persist();
    if (event.target.srcset) {
      setIsImageLoaded(true);
    }
  };

  return (
    <div
      className={clsx(
        "relative after:bg-ui-600 after:animate-pulse after:absolute after:inset-0 after:z-[-1]",
        className
      )}
    >
      <div
        className={clsx(
          "block transition-opacity duration-500 ease-in",
          { "opacity-100": isImageLoaded && fadeIn },
          { "opacity-0": !isImageLoaded && fadeIn }
        )}
      >
        <NextImage src={src} alt={alt} layout={layout} width={width} height={height} onLoad={handleLoad} {...props} />
      </div>
    </div>
  );
};

const Thumbnail = ({ alt, quality = "low", src, ...props }) => {
  const imageSource = `https://image.tmdb.org/t/p/${quality === "low" ? "w500" : "original"}/${src}`;

  return <Image src={imageSource} alt={alt} {...props} />;
};

const EmblaArrow = ({ enabled, direction, onClick }) => {
  const Icon = direction === "left" ? "left" : "right";
  return (
    <button
      className={clsx(
        "absolute inset-y-0 items-center justify-center hidden h-full z-[1] p-0 text-lg disabled:opacity-30 hover:bg-ui-900/50 disabled:cursor-default transition-colors bg-transparent border-none cursor-pointer w-18 md:flex",
        {
          "left-0 -ml-18 after:left-1/2 after:-translate-x-1/2": direction === "left",
          "right-0 -mr-18 after:right-1/2 after:translate-x-1/2": direction === "right",
        }
      )}
      onClick={onClick}
      disabled={!enabled}
    >
      <Icon className="w-full h-full" />
    </button>
  );
};
