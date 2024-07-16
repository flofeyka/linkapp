module.exports = class ClosedProfileDto {
    constructor({ id, name, status, followers, isProfileClosed }) {
      Object.assign(this, { id, name, status, followersCount: followers.length, isProfileClosed });
    }
  }
  