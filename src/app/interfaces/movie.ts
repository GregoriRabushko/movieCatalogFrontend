export interface MovieDTO {
  name: string;
  description: string | null;
  imageID: string | null;
  movieID: string;
  country: string | null;
  year: number | null;
  quality: string | null;
  rating: number | null;
  genre: string;
  actors: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface MovieBase extends MovieDTO {
  id: string;
  countAll: number;
  countWatched: number;
  duration: string;
}
