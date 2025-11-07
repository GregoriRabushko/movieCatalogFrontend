import {Country, Genre, Quality} from '../const/api';

export interface MovieDTO {
  name: string;
  description: string | null;
  imageURL: string | null;
  movieURL: string;
  country: Country | null;
  year: number | null;
  quality: Quality | null;
  rating: number | null;
  genre: Genre | null;
}

export interface MovieBase extends MovieDTO {
  id: string;
  countAll: number;
  duration: string;
}
