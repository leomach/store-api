import ProductRepository from "../repositories/product.repository.js"
import SupplierRepository from "../repositories/supplier.repository.js"
import SaleRepository from "../repositories/sale.repository.js"
import ProductInfoRepository from "../repositories/productInfo.repository.js"

async function createProduct(product) {
    if (await SupplierRepository.getSupplier(product.supplierId)) {
        return await ProductRepository.insertProduct(product)
    }
    throw new Error("O supplier_id informado não existe")
}

async function getProducts() {
    return await ProductRepository.getProducts()
}

async function getProduct(id) {
    const product = await ProductRepository.getProduct(id)
    product.info = await ProductInfoRepository.getProductInfo(parseInt(id))
    return product
}

async function updateProduct(product) {
    if (await SupplierRepository.getSupplier(product.supplierId)) {
        return await ProductRepository.updateProduct(product)
    }
    throw new Error("O supplier_id informado não existe")
}

async function deleteProduct(id) {
    const sales = await SaleRepository.getSaleByProductId(id)
    if (sales.lenght > 0) {
        throw new Error("Não é possivel excluir, pois o produto tem vendas.")
    }
    return await ProductRepository.deleteProduct(id)
}

async function createProductInfo(productInfo) {
    await ProductInfoRepository.createProductInfo(productInfo)
}

async function updateProductInfo(productInfo) {
    await ProductInfoRepository.updateProductInfo(productInfo)
}

async function createReview(review, productId) {
    await ProductInfoRepository.createReview(review, productId)
}

async function deleteReview(productId, index) {
    await ProductInfoRepository.deleteReview(parseInt(productId), parseInt(index))
}

async function getProductsInfo() {
    return await ProductInfoRepository.getProductsInfo()
}

async function deleteProductInfo(productId) {
    await ProductInfoRepository.deleteProductInfo(productId)
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    createProductInfo,
    updateProductInfo,
    createReview,
    deleteReview,
    getProductsInfo,
    deleteProductInfo
}