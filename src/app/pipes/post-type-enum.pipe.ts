import { Pipe, PipeTransform } from '@angular/core';
import { PostTypeEnum } from '../enums/post-type';

@Pipe({
  name: 'postTypeEnum',
  standalone: true
})
export class PostTypeEnumPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    switch (value) {
      case PostTypeEnum.ADOPT:
        return "Adopción";
        break;
      case PostTypeEnum.LOST:
        return 'Perdido';
        break;
      case PostTypeEnum.FOUND:
        return 'Encontrado';
        break;
      default:
        return 'info';
        break;
    }
  }

}
