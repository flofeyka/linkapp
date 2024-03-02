const profilesRepository = {
    profileFind: async (profiles, userId) => {
        if(!userId) {
            return undefined;
        }
        return profiles.find(item => item.userId === userId);
    }
}

module.exports = profilesRepository;