import { useMediaQuery } from "@uidotdev/usehooks";

export function useImagesPerPage() {
  const isMobile = useMediaQuery("(max-width: 430px)");
  const isSmallTablet = useMediaQuery(
    "(min-width: 431px) and (max-width: 850px)"
  );
  const isTablet = useMediaQuery("(min-width: 851px) and (max-width: 1024px)");

  const imagesPerPage = isMobile ? 1 : isSmallTablet ? 2 : isTablet ? 3 : 4;
  return imagesPerPage;
}
