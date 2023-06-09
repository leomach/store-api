import SaleRepository from "../repositories/sale.repository.js"
import ClientRepository from "../repositories/client.repository.js"
import ProductRepository from "../repositories/product.repository.js"

async function createSale(sale) {
    let error = ""
    const product = await ProductRepository.getProduct(sale.productId)
    const client = await ClientRepository.getClient(sale.clientId)
    if (!client) {
        error = "O clientId informado não existe. "
    }
    if (!product) {
        error += "O productId informado não existe. "
    }
    if (error) {
        throw new Error(error)
    }
    if (product.stock > 0) {
        sale = await SaleRepository.insertSale(sale)
        product.stock--
        await ProductRepository.updateProduct(product)
        return sale
    } else {
        throw new Error("O produto informado não possui no estoque. ")
    }
}

async function getSales(productId, supplierId) {
    if (productId) {
        return await SaleRepository.getSaleByProductId(productId)
    }
    if (supplierId) {
        return await SaleRepository.getSaleBySupplierId(supplierId)
    }
    return await SaleRepository.getSales()
}

async function getSale(id) {
    return await SaleRepository.getSale(id)
}

async function updateSale(sale) {
    let error = ""
    if (!await ClientRepository.getClient(sale.clientId)) {
        error = "O clientId informado não existe. "
    }
    if (!await ProductRepository.getProduct(sale.productId)) {
        error += "O productId informado não existe."
    }
    if (error) {
        throw new Error(error)
    }
    return await SaleRepository.updateSale(sale)
}

async function deleteSale(id) {
    const sale = await SaleRepository.getSale(id)
    if (sale) {
        const product = await ProductRepository.getProduct(sale.productId)
        await SaleRepository.deleteSale(id)
        product.stock++
        await ProductRepository.updateProduct(product)
    } else {
        throw new Error("O ID da sale informado não existe")
    }
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}