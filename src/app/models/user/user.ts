import { UserTypeEnum } from "../../enums/user-type";

export class User {

    constructor(
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public image_url: string | null,
        public type: UserTypeEnum,
        // public created_at: string,
        // public updated_at: string,
    ) {

    }

}
