import { Pipe, PipeTransform } from '@angular/core';
import { PostTypeEnum } from '../enums/post-type';
import { Severity } from '../types/severity';

@Pipe({
  name: 'postTypeTag',
  standalone: true
})
export class PostTypeTagPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]) {
    switch (value) {
      case PostTypeEnum.ADOPT:
        return 'soft-yellow';
        break;
      case PostTypeEnum.LOST:
        return 'soft-red'
        break;
      case PostTypeEnum.FOUND:
        return 'soft-green';
        break;
      default:
        return 'soft-red';
        break;
    }
  }

}
