import { UserTypeEnum } from "../../enums/user-type";

export interface User {
    uuid: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    image_url: string | null,
    instagram_url: string | null,
    facebook_url: string | null,
    twitter_url: string | null,
    linkedin_url: string | null,
    // type: UserTypeEnum,
}
