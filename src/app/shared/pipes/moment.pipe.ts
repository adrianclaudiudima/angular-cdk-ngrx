import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'momentUnixFormat'})
export class MomentPipe implements PipeTransform {
  transform(value: number, dateFormat: string): any {
    return moment.unix(value).format(dateFormat);
  }
}
