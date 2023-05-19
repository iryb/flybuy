interface BannerSlide {
  image: string;
  title: string;
  link: string;
}

interface BannerState {
  data: BannerSlide[] | null;
}

export type { BannerState, BannerSlide };
