const { getNewOrderData } = require('../services/order');
const { validateString } = require('../services/validation');
const orders = [];

const createOrder = async (req, res) => {
    try {
        const order = getNewOrderData(orders);
        orders.push(order);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
}

const getOrder = async (req, res) => {
    try {
        const orderId = parseInt(req.params.order_id);
        const order = orders.find(order => order.id === orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
}

const updateOrder = async (req, res) => {
    try {
        const orderId = parseInt(req.params.order_id);
        const order = orders.find(order => order.id === orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const { status } = req.body;

        if (!status) {
            return res.status(404).json({ error: 'Status is missing' });
        }

        const validation = validateString(status)

        if (!validation.status) {
            return res.status(404).json({ error: validation.error });
        }

        order.status = status.trim();
        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
}

module.exports = {
    createOrder,
    getOrder,
    updateOrder
}