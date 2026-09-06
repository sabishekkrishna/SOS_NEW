export type RoutePath =
  | '/'
  | '/archive/reel-09'
  | '/archive/reel-07'
  | '/archive/reel-03'
  | '/archive/reel-01'
  | '/materials'
  | '/vault';

export interface ExhibitMeta {
  id: string;
  path: RoutePath;
  reelNumber: string;
  reelRoman: string;
  title: string;
  subtitle: string;
  thumbnailDesc: string;
}

export interface LightboxState {
  isOpen: boolean;
  imageSrc: string;
  altText: string;
  caption?: string;
}
