const jwt = require("jsonwebtoken");
const config = require("config");
const userRepo = require('../module/user/user.repository');

class Util {

    /**
     * Response
     * @param code {Number}
     * @param data {Object}
     * @param message {String}
     * @returns {{data, message, status}}
     */
    static commonResponse(code, data, message) {
        return {
            'status': code,
            message,
            data,
        };
    }

    /**
     * validate Token
     * @param token {String}
     * @returns {Promise<*>}
     */
    static async validateJWT(token) {
        let decoded;
        try {
            decoded = jwt.verify(token, config.get("Access_Token"));
        } catch (err) {
            return err;
        }
        return decoded;
    }

    /**
     * check token
     * @param token {String}
     * @returns {Promise<boolean>}
     */
    static async checkJwt(token) {
        const userDetails = await userRepo.checkJwt(token);
        return !!userDetails;
    }

    /**
     * Encode data to the token
     * @param user {Object}
     * @returns {Promise<[]>}
     */
    static async getJwt(user) {
        const data = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        let tokens = [];
        const accessToken = jwt.sign(data, config.get("Access_Token"), {
            expiresIn: config.get("AccessTokenExpirationTime"),
        });
        const refreshToken = jwt.sign(data, config.get("Refresh_Token"), {
            expiresIn: config.get("RefreshTokenExpirationTime"),
        });
        tokens.push(accessToken);
        tokens.push(refreshToken);
        return tokens;
    };

}

module.exports = Util;