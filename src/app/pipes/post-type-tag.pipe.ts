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
        // return "warn";
        return 'bg-info';
        break;
      case PostTypeEnum.LOST:
        // return 'danger';
        return 'bg-warning'
        break;
      case PostTypeEnum.FOUND:
        // return 'success';
        return 'bg-success';
        break;
      default:
        return 'bg-danger';
        break;
    }
  }

}
