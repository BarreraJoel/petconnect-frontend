import { PostTypeEnum } from "../../enums/post-type";

export interface Post {
    uuid: string,
    type: PostTypeEnum,
    title: string,
    city: string,
    locality: string,
    description: string,
    images_url: string[] | null,
    is_approved: boolean,
    user_id: string,
    created_at: Date
    updated_at: Date
}
