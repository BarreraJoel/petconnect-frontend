import { PostTypeEnum } from "../../enums/post-type";

export interface UpdatePostDto {
    title?: string,
    city?: string,
    locality?: string,
    description?: string,
    type?: PostTypeEnum,
    image_url?: string | null,
}
