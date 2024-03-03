const { getProductCollection } = require('../controllers/productsController');

const getCollection = () => {
    return getProductCollection();
}

const getProductById = (id) => {
    const collection = getCollection();
    const product = collection.filter(item => item.id === id);

    return product.length ? product[0] : false
}

module.exports = {
    getCollection,
    getProductById
};