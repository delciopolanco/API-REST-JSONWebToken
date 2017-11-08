const Product = require('../models/product');
const mongoose = require('mongoose');

function getProduct(req, res) {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
        if (err) {
            return res.status(500).send({
                message: `Error al realizar la petición: ${err}`
            });
        }
        if (!product) {
            return res.status(404).send({
                message: `El producto no existe`
            });
        }

        res.status(200).send({
            product
        });
    });
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(500).send({
                message: `Error al realizar la petición: ${err}`
            });
        }
        if (!products) {
            return res.status(404).send({
                message: `No existen productos `
            });
        }

        res.status(200).send({
            products
        });
    });
}

function updateProduct(req, res) {
    let id = req.params.id,
        update = req.body;

    Product.findByIdAndUpdate(id, update, (err, product) => {

        if (err || product === null) {
            return res.status(500).send({
                message: `Error al realizar la borrar el producto: ${err}`
            });
        }

        res.status(200).send({
            product: update
        });
    });
}

function saveProduct(req, res) {
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productStored) => {
        if (err) {
            res.status(500).send({
                message: `Error al salvar el producto ${err}`
            });
        }

        res.status(200).send({
            product: productStored
        });
    });
}

function deleteProduct(req, res) {
    let id = req.params.id;

    Product.findByIdAndRemove(id, (err, product) => {

        if (err || product === null) {
            return res.status(500).send({
                message: `Error al realizar la borrar el producto: ${err}`
            });
        }

        product.remove(err => {
            if (err) {
                return res.status(500).send({
                    message: `Error al realizar la borrar el producto: ${err}`
                });
            }

            res.status(200).send({
                message: 'El producto se ha elminado correctamente'
            });

        });

    });
}

module.exports = {
    getProduct,
    getProducts,
    updateProduct,
    saveProduct,
    deleteProduct
};