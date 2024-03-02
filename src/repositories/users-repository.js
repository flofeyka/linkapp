const usersRepository = {
    findUser: async (users, fullName) => {
        let foundUsers = users;
        if (fullName) {
            foundUsers = foundUsers.filter((user) =>
                user.fullName.toLowerCase().indexOf(fullName.toLowerCase()) > -1);
        }
        return foundUsers;
    },
    createUser: async (users, fullName) => {
        if (fullName) {
            let lastUser = users[users.length - 1];
            const createdUser = {
                id: lastUser.id + 1,
                fullName: fullName,
                followed: false,
                status: null,
                friendsCount: 0,
                location: {
                    country: null,
                    city: null
                },
                photos: {
                    small: null,
                    large: null
                },
                isBanned: false
            }
            users.push(createdUser);
            return createdUser;
        } else {
            return undefined;
        }

    },
    editFullNameUser: async (users, id, fullName) => {
        let userFound = users.find(user => user.id === id);
        if (!fullName) {
            return undefined;
        }
        if (userFound) return userFound.fullName = fullName;
    },
    deleteUser: async (id, users) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) return users.splice(i, 1);
        }
        return false;
    },
    getUserById: async (id, users) => {
        return users.find(i => i.id === id)
    }
}

module.exports = usersRepository;