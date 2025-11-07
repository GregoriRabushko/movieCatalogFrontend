import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    const arr: string[] = value.split(' ');
    const hours = Math.floor(Number(arr[0]) / 60);
    const remainingMinutes = Number(arr[0]) % 60;
    return `${hours}ч ${remainingMinutes}мин`;
  }
}
