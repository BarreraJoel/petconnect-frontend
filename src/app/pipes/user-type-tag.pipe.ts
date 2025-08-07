import { Pipe, PipeTransform } from '@angular/core';
import { Severity } from '../types/severity';
import { UserTypeEnum } from '../enums/user-type';

@Pipe({
  name: 'userTypeTag',
  standalone: true
})
export class UserTypeTagPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): Severity {
    switch (value) {
      case UserTypeEnum.INDIVIDUAL:
        return "secondary";
        break;
      case UserTypeEnum.SHELTER:
        return 'danger';
        break;
      case UserTypeEnum.ADMIN:
        return 'success';
        break;
      default:
        return 'info';
        break;
    }
  }

}
