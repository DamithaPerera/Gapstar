const {commonResponse} = require('../../lib/util');
const responseMsg = require('../../lib/responseMessages');
const productService = require('./product.service');


class ProductController {


    /**
     * Create Product Controller
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async createProductController(req, res) {

        try {
            const requestBody = req.body
            const requestUserId = req.user.id
            await productService.createProductService(requestBody, requestUserId)
            const response = commonResponse(responseMsg.SUCCESS, undefined, responseMsg.PRODUCT_CREATE_SUCCESSFULLY)
            res.status(responseMsg.CODE.SUCCESS).json(response);

        } catch (error) {
            const response = commonResponse(responseMsg.FAIL, undefined, error)
            res.status(responseMsg.CODE.BAD_REQUEST).json(response);
        }
    }

    /**
     * Update Product controller
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async updateProductController(req, res) {

        try {
            const productId = req.params.id
            const requestBody = req.body
            const requestUserId = req.user.id
            await productService.updateProductService(requestBody, requestUserId, productId)
            const response = commonResponse(responseMsg.SUCCESS, undefined, responseMsg.PRODUCT_UPDATED_SUCCESSFULLY)
            res.status(responseMsg.CODE.SUCCESS).json(response);

        } catch (error) {
            const response = commonResponse(responseMsg.FAIL, undefined, error)
            res.status(responseMsg.CODE.BAD_REQUEST).json(response);
        }
    }

    /**
     * get all product controller
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async getAllProductController(req, res) {
        try {
            const data = await productService.getAllProductService()
            const response = commonResponse(responseMsg.SUCCESS, data, responseMsg.PRODUCT_LIST)
            res.status(responseMsg.CODE.SUCCESS).json(response);

        } catch (error) {
            console.log(error)
            const response = commonResponse(responseMsg.FAIL, undefined, error)
            res.status(responseMsg.CODE.BAD_REQUEST).json(response);
        }
    }

    /**
     * get product controller
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async getProductController(req, res) {
        try {
            const productId = req.params.id
            const data = await productService.getProductService(productId)
            const response = commonResponse(responseMsg.SUCCESS, data, responseMsg.PRODUCT_LIST)
            res.status(responseMsg.CODE.SUCCESS).json(response);

        } catch (error) {
            console.log(error)
            const response = commonResponse(responseMsg.FAIL, undefined, error)
            res.status(responseMsg.CODE.BAD_REQUEST).json(response);
        }
    }

    /**
     * delete product controller
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async deleteProductController(req, res) {
        try {
            const productId = req.params.id
            await productService.deleteProductService(productId)
            const response = commonResponse(responseMsg.SUCCESS, undefined, responseMsg.PRODUCT_DELETE)
            res.status(responseMsg.CODE.SUCCESS).json(response);

        } catch (error) {
            const response = commonResponse(responseMsg.FAIL, undefined, error)
            res.status(responseMsg.CODE.BAD_REQUEST).json(response);
        }
    }

    /**
     * Get CSV product controller
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async getCSVProductController(req, res) {
        try {
            const requestUserId = req.user.id
            await productService.getCVSProductService(requestUserId)
            const response = commonResponse(responseMsg.SUCCESS, undefined, responseMsg.PRODUCT_EXPORT)
            res.status(responseMsg.CODE.SUCCESS).json(response);

        } catch (error) {
            const response = commonResponse(responseMsg.FAIL, undefined, error)
            res.status(responseMsg.CODE.BAD_REQUEST).json(response);
        }
    }
}


module.exports = ProductController;