import {Pipe, PipeTransform} from '@angular/core';
import {Genre} from '../const/api';

@Pipe({
  name: 'genre',
  standalone: true,
})
export class GenrePipe implements PipeTransform {
  transform(value: Genre | null): string {
   switch (value) {
     case Genre.Action: return 'Боевик'
     case Genre.Comedy: return 'Комедия'
     case Genre.Drama: return 'Драма'
     case Genre.Horror: return 'Ужастик'
     case Genre.Thriller: return 'Триллер'
     default: return 'Неизвестно';
   }
  }
}
