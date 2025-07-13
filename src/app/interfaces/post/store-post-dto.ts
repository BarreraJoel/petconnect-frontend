import { PostTypeEnum } from "../../enums/post-type";

export interface StorePostDto {
    title: string,
    city: string,
    locality: string,
    description: string,
    user_id: string,
    type: PostTypeEnum,
    image_url: File | null,
}
