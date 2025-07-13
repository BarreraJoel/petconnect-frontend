import { UserTypeEnum } from "../../enums/user-type";

export interface UserDto {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    type: UserTypeEnum,
    image_url: string | null,
}
