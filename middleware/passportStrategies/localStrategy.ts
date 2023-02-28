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
    const user = getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
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

/*
FIX ME (types) 😭
*/
passport.serializeUser(function (user: Express.User, done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void) {
  done(null, (user as any).id);
});

/*
FIX ME (types) 😭
*/
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
