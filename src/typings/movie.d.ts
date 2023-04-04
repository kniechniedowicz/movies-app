export interface Movie {
  id: string;
  title: string;
  rate: number;
  duration: number;
  year: number;
  director: string;
  image?: string;
}

export interface MovieWithFavourites extends Movie {
  isAddedToFavourites: boolean;
}
