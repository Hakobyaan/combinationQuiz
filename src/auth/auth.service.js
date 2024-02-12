import jwt from 'jsonwebtoken';
import { UsersModel,AuthModel } from '../models';
import { ErrorsUtil, CryptoUtil } from '../utils';
import nodemailer from 'nodemailer';


import config from '../config/variables.config';

const { AUTH } = config;

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET
} = AUTH;

const { InputValidationError, UnauthorizedError } = ErrorsUtil;

export default class AuthService {
  static generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET);
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET);

    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, JWT_ACCESS_SECRET);
    } catch (error) {
      throw new UnauthorizedError(222);
    }
  }

  static validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new UnauthorizedError();
    }
  }

  static async refresh(token) {
    const user = AuthService.validateRefreshToken(token);
    user.role = ['admin'];
    const { accessToken, refreshToken } = AuthService.generateTokens(user);

    const payload = {
      accessToken,
      refreshToken,
      ...user
    };
    return payload;
  }

  static async googleLogin(userObject) {
    const user = await AuthModel.findByEmail(userObject.email);
    if (!user) {
      const newUser = {
        displayName: userObject.name,
        email: userObject.email,
        googleId: userObject.sub,
        picture: userObject.picture
      };
      const transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          // company mail
          user: 'khachatryanartur848@gmail.com',
          pass: 'pveuruzoqugxlrbn'
        }
      });

      const mailOptions = {
        // company mail
        from: 'khachatryanartur848@gmail.com',
        to: userObject.email,
        subject: 'Registration email',
        text: 'Congratulations!!! You are registered in our Best Optics company!!!'
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return error;
        }
        // console.log('Email sent: ' + info.response);
        return `Email sent: ${info.response}`;
      });
      return await UsersModel.create(newUser);
    }

    const payload = {
      googleId: user.googleId,
      email: user.email,
      displayName: user.displayName,
      picture: user.picture
      // role: user.role,
      // status: user.status,
    };
    return payload;
  }

  static async login(username, pwd) {
    const userAdmin = await UsersModel.findByUsername(username);

    if (!userAdmin) throw new InputValidationError('Invalid username or password');
    if (!CryptoUtil.isValidPassword(pwd, userAdmin.pwd)) {
      throw new InputValidationError('Invalid username or password');
    }

    delete userAdmin.pwd;
    const { accessToken, refreshToken } = AuthService.generateTokens({ ...userAdmin });

    const payload = {
      id: userAdmin.id,
      username: userAdmin.username,
      role: [userAdmin.role],
      accessToken,
      refreshToken
    };
    return payload;
  }
}
