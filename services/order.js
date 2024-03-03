const generateOrderId = (orders) => {
    return orders.length + 1;
}

const getNewOrderData = (orders) => {
    return {
        id: generateOrderId(orders),
        status: 'NEW',
        products: []
    };
}

module.exports = {
    getNewOrderData
};