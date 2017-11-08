const express = require('express'),
    api = express.Router(),
    UserController = require('../controllers/user'),
    ProductController = require('../controllers/product'),
    auth = require('../midelwares/auth');


api.get('/products', auth, ProductController.getProducts);
api.get('/products/:id', ProductController.getProduct);
api.post('/products', auth, ProductController.saveProduct);
api.put('/products/:id', auth, ProductController.updateProduct);
api.delete('/products/:id', auth, ProductController.deleteProduct);

api.post('/singup', UserController.singUp);
api.post('/signin', UserController.singIn);

api.get('/private', auth, (req, res) => {
    res.status(200).send({
        message: 'Tienes acceso'
    });
});

module.exports = api;