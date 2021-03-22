const {commonResponse,getJwt } = require('../../lib/util');
const responseMsg = require('../../lib/responseMessages');
const userService = require('./user.service');


class UserController {

    /**
     * user register controller
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async registerUserController(req, res) {

        try {
            const requestBody = req.body
            await userService.userRegistrationService(requestBody)
            const response = commonResponse(responseMsg.SUCCESS, undefined, responseMsg.REGISTRATION_SUCCESS)
            res.status(responseMsg.CODE.SUCCESS).json(response);

        } catch (error) {
            const response = commonResponse(responseMsg.FAIL, undefined, error)
            res.status(responseMsg.CODE.BAD_REQUEST).json(response);
        }

    }

    /**
     * user login controller
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async loginUserController(req, res) {

        try {
            const requestBody = req.body
            const data = await userService.userLoginService(requestBody)
            const tokens = await getJwt(data);
            data.accessToken = tokens[0];
            data.refreshToken = tokens[1];
            await userService.userUpdateAccessTokenService(data)
            const response = commonResponse(responseMsg.SUCCESS, data, responseMsg.USER_LOGIN)
            res.status(responseMsg.CODE.SUCCESS).json(response);

        } catch (error) {
            console.log(error)
            const response = commonResponse(responseMsg.FAIL, undefined, error)
            res.status(responseMsg.CODE.BAD_REQUEST).json(response);
        }

    }
}

module.exports = UserController;