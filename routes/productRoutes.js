const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

router.post("/", authMiddleware, createProduct);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.put("/:id", authMiddleware, updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;