const userRepo = require('./user.repository');

class UserService {

    /**
     * User Registration Service
     * @param requestBody {Object}
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    static async userRegistrationService(requestBody) {
        return await userRepo.userRegistrationRepo(requestBody)
    }

    /**
     *  user login service
     * @param requestBody {Object}
     * @returns {Promise<{name: *, email: *}>}
     */
    static async userLoginService(requestBody) {
        const data = await userRepo.userLoginRepo(requestBody)
        return {
            'id': data.id,
            'name': data.name,
            'email': data.email
        }
    }

    /**
     * update access token service
     * @param data {Object}
     * @returns {Promise<[number, Model[]]>}
     */
    static async userUpdateAccessTokenService(data) {
        return await userRepo.userUpdateAccessTokenRepo(data)
    }
}

module.exports = UserService;