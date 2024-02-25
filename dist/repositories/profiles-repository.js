"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilesRepository = void 0;
exports.profilesRepository = {
    profileFind: (profiles, userId) => {
        return profiles.find(item => item.userId === userId);
    }
};
