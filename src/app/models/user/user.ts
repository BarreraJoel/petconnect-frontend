import { UserTypeEnum } from "../../enums/user-type";

export interface User {
    uuid: string,
    username: string,
    email: string,
    password: string,
    image_url: string | null,
    instagram_url: string | null,
    facebook_url: string | null,
    twitter_url: string | null,
    linkedin_url: string | null,
}
