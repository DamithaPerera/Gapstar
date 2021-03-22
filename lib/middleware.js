const config = require("config");
const isEmpty = require("is-empty");
const _ = require("lodash");
const urlPattern = require("url-pattern");
const {commonResponse} = require('../lib/util');
const responseMsg = require('../lib/responseMessages');
const {validateJWT, checkJwt} = require('../lib/util');
const jwt = require("jsonwebtoken");


class Middleware {

    /**
     * Check authentication for all the endpoints
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    static async authentication(req, res, next) {
        let response;

        if (await this.isGuestAction(req.path, req.method)) {
            next();
        } else {
            if (!isEmpty(req.headers["authorization"])) {
                let authHeader = req.headers["authorization"];
                authHeader = authHeader.replace("Bearer", "");
                authHeader = authHeader.trim();

                // check user logout or not
                if (!(await checkJwt(authHeader))) {
                    response = commonResponse(responseMsg.FAIL, null, responseMsg.INVALID_AUTHORIZATION_TOKEN);
                    res.status(responseMsg.CODE.FORBIDDEN).json(response);
                }
                const tokenInfo = await validateJWT(authHeader);
                if (!isEmpty(tokenInfo)) {
                    req.user = tokenInfo;

                    jwt.verify(authHeader, config.get("Access_Token"), (err, user) => {
                        if (err) {
                            response = commonResponse(responseMsg.FAIL, null, responseMsg.INVALID_AUTHORIZATION_TOKEN);
                            res.status(responseMsg.CODE.FORBIDDEN).json(response);
                        } else {
                            next();
                        }
                    });
                } else {
                    response = commonResponse(responseMsg.FAIL, null, responseMsg.INVALID_AUTHORIZATION_TOKEN);
                    res.status(responseMsg.CODE.FORBIDDEN).json(response);
                }
            } else {
                response = commonResponse(responseMsg.FAIL, null, responseMsg.INVALID_AUTHORIZATION_TOKEN);
                res.status(responseMsg.CODE.FORBIDDEN).json(response);
            }
        }
    }

    /**
     * guest action - not checking the accessToken
     * @param url {String}
     * @param method {String}
     * @returns {Promise<boolean>}
     */
    static async isGuestAction(url, method) {
        const isGuestAction = false;
        const guestActions = config.get("api.guestActions");
        for (let i = 0; i < guestActions.length; i++) {
            let pattern = new urlPattern(guestActions[i].url);
            let matchRes = pattern.match(url);

            if (method === guestActions[i].method && matchRes) {
                if (!isEmpty(matchRes.id) && !isEmpty(guestActions[i].ignore)) {
                    return _.indexOf(guestActions[i].ignore, matchRes.id) <= -1;
                } else {
                    return true;
                }
            }
        }
        return isGuestAction;
    }

}


module.exports = Middleware;