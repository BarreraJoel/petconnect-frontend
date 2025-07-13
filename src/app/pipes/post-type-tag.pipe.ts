import { Pipe, PipeTransform } from '@angular/core';
import { PostTypeEnum } from '../enums/post-type';
import { Severity } from '../types/severity';

@Pipe({
  name: 'postTypeTag',
  standalone: true
})
export class PostTypeTagPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): Severity {
    switch (value) {
      case PostTypeEnum.ADOPT:
        return "warn";
        break;
      case PostTypeEnum.LOST:
        return 'danger';
        break;
      case PostTypeEnum.FOUND:
        return 'success';
        break;
      default:
        return 'info';
        break;
    }
  }

}
