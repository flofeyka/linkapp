module.exports = class UserDto {
    constructor({ id, name, isProfileClosed, followers, status }) {
        Object.assign(this, { id, name, status, followersCount: followers.length, isProfileClosed })
    }
}