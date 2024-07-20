const ApiError = require("../exceptions/ApiError");
const User = require("../models/User")
const bcrypt = require("bcrypt");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/UserDto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ResetToken = require("../models/ResetToken");

const authService = {
  async signIn(email, password) {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      throw ApiError.Unauthorized("Invalid email or password");
    }

    const passwordCompared = await bcrypt.compare(password, userFound.password);

    if (!passwordCompared) {
      throw ApiError.Unauthorized("Invalid email or password");
    }

    const user = new UserDto(userFound);

    const tokens = tokenService.generateTokens(user);
    await tokenService.updateRefreshToken(user.id, tokens.refreshToken)
    return {
      user, ...tokens
    }

  },

  async signUp(name, email, password) {
    const isUserFound = await User.findOne({ email });
    if (isUserFound) {
      throw ApiError.BadRequest("This email already exists")
    }

    const passwordSalt = await bcrypt.genSalt(10, "a");
    const passwordHash = await bcrypt.hash(password, passwordSalt);
    const newUser = await User.create({
      name, email, password: passwordHash
    });

    const user = new UserDto(newUser);
    const tokens = tokenService.generateTokens(user);
    await tokenService.updateRefreshToken(newUser._id, tokens.refreshToken);

    return {
      user, ...tokens
    }
  },

  async getUserData(refreshToken) {
    const tokenData = await tokenService.validateRefreshToken(refreshToken);
    const userFound = await User.findById(tokenData.user);
    if (!userFound) {
      throw ApiError.Unauthorized("Login is expired")
    }

    const user = new UserDto(userFound);
    const tokens = tokenService.generateTokens(user);
    await tokenService.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user,
      ...tokens
    }
  },

  async requestPasswordReset(email) {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw HttpError(400, 'User with this email does not exist');
    }

    const FIFTH_MINUTES = 15 * 60 * 1000;
    const now = Date.now();

    const tokenFound = await ResetToken.findOne({ user: existingUser._id });

    if (tokenFound && tokenFound.requestedAt && now - tokenFound.requestedAt < FIFTH_MINUTES) {
      throw ApiError.BadRequest('Password reset was already requested, wait for 15 minutes');
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });

    if (tokenFound) {
      tokenFound.resetToken = token;
      tokenFound.requestedAt = now;
      await tokenFound.save();
    } else {
      await ResetToken.create({
        user: existingUser._id,
        resetToken: token,
        requestedAt: now
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: existingUser.email,
      from: process.env.EMAIL,
      subject: 'Password Reset LinkApp',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                 Please click on the following link, or paste this into your browser to complete the process:\n\n
                 ${process.env.CLIENT_URL}/auth/reset-password/${token}\n\n
                 If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });

    return true;
  },

  async resetPassword(resetToken, password) {
    const validToken = await tokenService.isResetTokenValid(resetToken);

    const userFound = await User.findById(validToken.user);
    const isPasswordOld = await bcrypt.compare(password, userFound.password);
    if(isPasswordOld) {
      throw ApiError.BadRequest("The old and new passwords shouldn't be the same")
    }
    
    const newPasswordSalt = await bcrypt.genSalt(10, "a");
    const newPasswordHashed = await bcrypt.hash(password, newPasswordSalt);

    const userUpdated = await User.updateOne({_id: validToken.user}, {
      password: newPasswordHashed
    });


    if(userUpdated.modifiedCount !== 1) {
      throw ApiError.BadRequest("Error while password reseting");
    }

    return userUpdated.modifiedCount === 1;

  }

}

module.exports = authService;