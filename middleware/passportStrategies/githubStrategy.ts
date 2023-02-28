import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { userModel } from '../../models/userModel';
interface IVerifyOptions {
    message: string;
}
const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "5a61fff9b8cdeb017171",
        clientSecret: "89ec5dab4ae80cf04806a70cfa619979f4aebf68",
        callbackURL: "/auth/github/callback",
        passReqToCallback: true,
    },

    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: any, profile: any, done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void) => {
        console.log({ profile });
        profile = userModel.createNewuser(Number(profile.id), profile.displayName);
        done(null, profile)
    },

);


const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
