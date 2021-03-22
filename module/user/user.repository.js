const sequelizeModel = require('../../model/index');
const isEmpty = require("is-empty");
const bcrypt = require("bcrypt");
const responseMsg = require('../../lib/responseMessages');


class UserRepository {

    /**
     * User Registration Repo
     * @param requestBody {Object}
     * @returns {Promise<requestBody>}
     */
    static async userRegistrationRepo(requestBody) {
        return sequelizeModel.userModel.create(requestBody);
    }

    /**
     * User Login
     * @param requestBody {Object}
     * @returns {Promise<unknown>}
     */
    static async userLoginRepo(requestBody) {
        return new Promise((resolve, reject) => {
            sequelizeModel.userModel.findOne({where: {email: requestBody.email}})
                .then((data) => {
                    bcrypt.compare(requestBody.password, data.password, (err, doesMatch) => {
                        if (doesMatch) {
                            resolve(data);
                        } else {
                            reject(responseMsg.INVALID_USER);
                        }
                    });
                });
        });
    }

    /**
     * Check JWT Token
     * @param token {String}
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    static async checkJwt(token) {
        return sequelizeModel.userModel.findOne({
            where: {
                accessToken: token
            }
        })
    }

    /**
     * update access token when login
     * @param data {Object}
     * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
     */
    static async userUpdateAccessTokenRepo(data) {
        return sequelizeModel.userModel.update({
            accessToken: data.accessToken,
        }, {
            where: {
                email: data.email
            }
        })
    }
}

module.exports = UserRepository;