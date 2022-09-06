
import User from '../models/Users';
import * as Bcrypt from "bcrypt";
import * as Jwt from 'jsonwebtoken';
import { getEnviromentVariable } from "../enviroments/env";

import { Utils } from "../utils/Utils";
import { ApiResponse } from '../utils/ApiResponse';
import { resolve } from 'path';
import { Logger } from '../logger/Logger';

const logger = new Logger().logger;
export class UserController {

    /**
    * New user signup process and send verification code to user email.
    * @function UserController/signUp
    * @param {object} req  - http request object.
    * @param {object} res  - http response object.
    * @param {object} next - callback function to handle next request.
    */

    static async signUp(req, res, next) {
        try {

            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const verificationToken = Utils.genericVerificationToken();
            const encryptedPassword = await Utils.encryptPassword(password);

            const data = {
                email: email,
                username: username,
                password: encryptedPassword,
                verification_token: verificationToken,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME

            }
            console.log(data);
            let user = await new User(data).save();
            ApiResponse.successResponseWithData(res, "Registration Successfully", user);
            // res.send(user);

        } catch (e) {
            next(e)
        }

    }

    static async login(req, res, next) {
        let password = req.body.password;
        let user = req.user;

        try {
            await Utils.compairPassword(
                {
                    plainPassword: password,
                    encryptedPassword: user.password
                }
            );
            const data = {
                user_id: user._id,
                email: user.email
            }

            const token = Jwt.sign(data, getEnviromentVariable().jwt_secret, { expiresIn: '120d' });

            const respData = {
                user: user,
                token: token
            }
            logger.info("action:User/login", respData);
            res.send(respData);


        } catch (e) {

            console.log(e)
            next(e)
        }
        // finally {
        //     await cleanUp()
        // }


    }


}