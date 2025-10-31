export interface MovieDTO {
  name: string;
  description: string | null;
  imageID: string | null;
  movieID: string;
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
}
