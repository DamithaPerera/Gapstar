const productRepo = require('./product.repository');
const { Parser } = require('json2csv');
const fs = require("fs")
const uniqid = require('uniqid');


class ProductService {

    /**
     * Create Product Service
     * @param requestBody {Object}
     * @param requestUserId {Number}
     * @returns {Promise<Model>}
     */
    static async createProductService(requestBody, requestUserId) {
        requestBody.userId = requestUserId
        return productRepo.createProductRepo(requestBody)
    }


    /**
     * Update Product service
     * @param requestBody {Object}
     * @param requestUserId {Number}
     * @param productId {Number}
     * @returns {Promise<[number, Model[]]>}
     */
    static async updateProductService(requestBody, requestUserId, productId) {
        requestBody.userId = requestUserId
        return productRepo.updateProductRepo(requestBody, productId)
    }


    /**
     * Get All users Products
     * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
     */
    static async getAllProductService() {
        return productRepo.getAllProductRepo()
    }

    /**
     * Get Product Service
     * @param productId {Number}
     * @returns {Promise<Model | null>}
     */
    static async getProductService(productId) {
        return productRepo.getProductRepo(productId)
    }

    /**
     * Delete product service
     * @param productId{Number}
     * @returns {Promise<number>}
     */
    static async deleteProductService(productId) {
        return productRepo.deleteProductRepo(productId)
    }

    /**
     * Get CSV product service
     * @param requestUserId {Number}
     * @returns {Promise<void>}
     */
    static async getCVSProductService(requestUserId) {
        const data = await productRepo.getCSVProductRepo(requestUserId)

        const json2csvParser = new Parser({header: false });
        const csv = json2csvParser.parse(data);
        fs.writeFile(`productList${uniqid()}.csv`, csv, error => {
            if (error) throw error;
        });

    }

}


module.exports = ProductService;