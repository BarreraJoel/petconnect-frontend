import { Pipe, PipeTransform } from '@angular/core';
import { UserTypeEnum } from '../enums/user-type';

@Pipe({
  name: 'userTypeEnum',
  standalone: true
})
export class UserTypeEnumPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    switch (value) {
      case UserTypeEnum.INDIVIDUAL:
        return "Particular";
        break;
      case UserTypeEnum.SHELTER:
        return 'Refugio';
        break;
      case UserTypeEnum.ADMIN:
        return 'Administrador';
        break;
      default:
        return '';
        break;
    }

  }

}
