module.exports = class UserDto {
  email;
  name;
  id;
  isActivated;

  constructor(model) {
    this.name = model.name;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
};
