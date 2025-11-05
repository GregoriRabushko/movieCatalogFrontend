export interface MovieDTO {
  name: string;
  description: string | null;
  imageURL: string | null;
  movieURL: string;
  country: string | null;
  year: number | null;
  quality: string | null;
  rating: number | null;
  genre: string;
  createdAt: string;
}

export interface MovieBase extends MovieDTO {
  id: string;
  countAll: number;
  countWatched: number | null;
  duration: string;
}
