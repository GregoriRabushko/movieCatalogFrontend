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
  actorsIDs: string[];
  createdAt: string;
  updatedAt: string | null;
}

export interface MovieBase extends MovieDTO {
  id: string;
  countAll: number;
  countWatched: number;
  duration: string;
}
