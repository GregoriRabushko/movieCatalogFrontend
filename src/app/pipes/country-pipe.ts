import {Pipe, PipeTransform} from '@angular/core';
import {Country} from '../const/api';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {
  transform(value: Country | null): string {
    switch (value) {
      case Country.USA: return 'США'
      case Country.France: return 'Франция'
      case Country.UK: return 'Великобритания'
      case Country.Australia: return 'Австралия'
      case Country.Canada: return 'Канада'
      default: return 'Неизвестно';
    }
  }
}
