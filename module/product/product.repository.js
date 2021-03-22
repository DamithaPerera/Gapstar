const sequelizeModel = require('../../model/index');
const responseMsg = require('../../lib/responseMessages');

class ProductRepository {

    /**
     * Create Product Repo
     * @param data {Object}
     * @returns {Promise<data>}
     */
    static async createProductRepo(data) {
        return sequelizeModel.productModel.create(data);
    }


    /**
     * Update Product Repo
     * @param requestBody {Object}
     * @param productId {number}
     * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
     */
    static async updateProductRepo(requestBody, productId) {
        console.log(requestBody)
        console.log(productId)
        return sequelizeModel.productModel.update(requestBody, {
            where: {
                id: productId
            }
        })
    }

    /**
     * Get user All products
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
     */
    static async getAllProductRepo() {
        return sequelizeModel.productModel.findAll({
            attributes: ['id', 'name', 'slug', 'sku', 'brand'],
            include: [
                {
                    model: sequelizeModel.userModel,
                    attributes: ['name', 'email']
                }
            ]
        })
    }


    /**
     * Get Product Repo
     * @param productId {Number}
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes> | null>}
     */
    static async getProductRepo(productId) {
        return sequelizeModel.productModel.findOne({
            where: {
                id: productId
            },
            attributes: ['id', 'name', 'slug', 'sku', 'brand'],
            include: [
                {
                    model: sequelizeModel.userModel,
                    attributes: ['name', 'email']
                }
            ]
        })
    }

    /**
     * Delete Product Repo
     * @param productId{Number}
     * @returns {Promise<number>}
     */
    static async deleteProductRepo(productId) {
        return sequelizeModel.productModel.destroy({
            where: {
                id: productId
            },
        })
    }

    /**
     * Get CSV Product Repo
     * @param requestUserId {Number}
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
     */
    static async getCSVProductRepo(requestUserId) {
        return sequelizeModel.productModel.findAll({
            where: {
                userId: requestUserId
            },
            attributes: ['id', 'name', 'slug', 'sku', 'brand'],
        })
    }
}


module.exports = ProductRepository;