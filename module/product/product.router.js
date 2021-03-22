const router = require('express').Router();
const productController = require('./product.controller')
const validation = require('./product.validation');


router.post('/create', validation.create, productController.createProductController);

router.put('/update/:id', validation.update, productController.updateProductController);

router.get('/getAll', productController.getAllProductController);

router.get('/getAll/:id',productController.getProductController);

router.delete('/delete/:id',productController.deleteProductController);

router.get('/downloadCSV', productController.getCSVProductController);


module.exports = router;
