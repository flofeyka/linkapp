import {profileType} from "../types/types";

export const profilesRepository = {
    profileFind: (profiles: Array<profileType>, userId: number) => {
        return profiles.find(item => item.userId === userId);
    }
}