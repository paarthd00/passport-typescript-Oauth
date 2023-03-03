import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById } from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    try {
      const user = getUserByEmailIdAndPassword(email, password);
      return done(null, user ? user : false)
    } catch (err: any) {
      done(null, false, err);
    }
  }
);

declare module "express" {
  interface User {
    id: number,
    name: string,
    email: string,
    password: string
  }
}

interface IVerifyOptions {
  message: string;
}

passport.serializeUser(function (user: Express.User, done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void) {
  done(null, (user as any).id);
});

passport.deserializeUser(function (id: number, done: (error: any, user?: Express.User | false | null, options?: IVerifyOptions) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
