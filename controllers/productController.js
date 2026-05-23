const Product = require("../models/product");

const createProduct = async (req, res) => {

    try {

        const product = await Product.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getProducts = async (req, res) => {

    try {

        const { category, sort } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        let products = Product.find(filter);

        if (sort === "low") {
            products = products.sort({ price: 1 });
        }

        if (sort === "high") {
            products = products.sort({ price: -1 });
        }

        const result = await products;

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getSingleProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Product deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};