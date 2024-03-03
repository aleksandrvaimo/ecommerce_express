const { validateString } = require('../services/validation');
const { getProductById } = require('../services/product');
let orderProducts = [];

// Get Order Products based on Order ID
const getOrderProducts = async (req, res) => {
    try {
        const orderId = parseInt(req.params.order_id);
        const order = orderProducts.filter(order => order.orderId === orderId);

        if (!order.length) {
            return res.status(201).json([]);
        }

        res.json(order[0].products);
    } catch (error) {
        console.error('Error fetching order products:', error);
        res.status(500).json({ error: 'Failed to fetch order products' });
    }
};

// Add product(s) to order eg: req.body - ['123', '456', '999']
const addOrderProducts = async (req, res) => {
    try {
        const orderId = parseInt(req.params.order_id);
        const products = req.body;
        let order = orderProducts.filter(order => order.orderId === orderId);

        if (!products || !products.length) {
            return res.status(404).json({ message: 'Products are missing' });
        }

        for (let cnt = 0; cnt <= products.length - 1; cnt++) {
            const addProduct = parseInt(products[cnt]);
            const product = getProductById(addProduct);

            if (!product) {
                return res.status(404).json({ message: 'Product not exists' });
            }

            if (!order.length) {
                orderProducts.push({'orderId': orderId, 'products': [{...product, qty: 1}]});
                order = orderProducts;
                continue;
            }

            let updateItem = 0;

            if (order[0].products.length) {
                // Check if product exists in order product collection
                updateItem = order[0].products.filter(item => addProduct === item.id).length
            }

            if (updateItem === 0) {
                // Add product in case not exists in order product collection
                order[0].products.push({...product, qty: 1});
            } else {
                // Update product qty
                orderProducts.map(orderItem => orderItem.orderId === orderId
                    ? orderItem.products.map(productItem => {
                        if (addProduct === productItem.id) {
                            productItem = {...productItem, qty: productItem.qty++}
                        }
                        return productItem;
                    })
                    : orderItem
                )
            }
        }

        return res.status(201).json({ message: 'Products added to the order' });

    } catch (error) {
        console.error('Error adding order products:', error);
        res.status(500).json({ error: 'Failed to add order products' });
    }
};

// Add or Update item based on provided qty
// This method can be used with input qty field
// <span>Qty: <input onChange={addUpdateQtyHandler} defaultValue="1" type="number" /></span>
// {!replace && <span><Button title="Add To Order" clickHandler={AddUpdateProduct(item, orderId, setUpdate)} /></span>}
const addUpdateOrderProducts = async (req, res) => {
    try {
        const orderId = parseInt(req.params.order_id);
        const products = req.body;
        const order = orderProducts.filter(order => order.orderId === orderId);
        const product = getProductById(parseInt(products[0].id));

        if (!product) {
            return res.status(404).json({ message: 'Product not exists' });
        }

        if (!order.length) {
            orderProducts.push({'orderId': orderId, 'products': [{...product, qty: parseInt(products[0].qty)}]})

            return res.status(201).json({ message: 'Products added to the order' });
        }

        let updateItem = 0;

        if (order[0].products.length) {
            // Check if item exists in order items attribute
            updateItem = order[0].products.filter(item => products[0].id == item.id).length
        }

        if (updateItem == 0) {
            order[0].products.push({...product, qty: parseInt(products[0].qty)});

            return res.status(201).json({ message: 'Products added to the order' });
        } else {
            // Update order products
            orderProducts.map(orderItem => orderItem.orderId == orderId
                ? orderItem.products.map(productItem => {
                    // For some reason {...item, qty: item.qty + 'provided qty'} didn't work
                    if (products[0].id == productItem.id) {
                        productItem.qty = productItem.qty + parseInt(products[0].qty) ?? 1;
                    }
                    return productItem;
                })
                : orderItem
            )

            return res.status(201).json({ message: 'Products was updated' });
        }
    } catch (error) {
        console.error('Error adding order products:', error);
        res.status(500).json({ error: 'Failed to add order products' });
    }
};

// Update order qty
// Update Qty eg. - req.body = {"quantity": 1}
// Replace product eg. - req.body = {replaced_with: {"product_id": 123, "quantity": 6}}}
const updateOrderProduct = async (req, res) => {
    try {
        const orderId = parseInt(req.params.order_id);
        const productId = parseInt(req.params.product_id);
        const order = orderProducts.filter(order => order.orderId === orderId);

        if (!order.length) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const { replaced_with, quantity } = req.body;

        if (quantity) {
            let collection = order[0].products.filter(item => productId === item.id);
            collection.map(item => {
                if (item.id === productId) {
                    item.qty = parseInt(quantity) ?? 1;
                }
                return item;
            })

            return res.json({ message: 'Product quantity updated' });
        }

        if (replaced_with && 'product_id' in replaced_with && 'quantity' in replaced_with) {
            const product = getProductById(parseInt(replaced_with.product_id));

            if (!product) {
                return res.status(404).json({ message: 'Product not exists' });
            }

            const collection = order[0].products.filter(item => productId !== item.id)
            order[0].products = collection;
            order[0].products.push({
                'id': product.id,
                'qty': parseInt(replaced_with.quantity),
                'name': product.name,
                'price': product.price
            })

            return res.json({ message: 'Product updated' });
        }

        return res.status(404).json({ message: 'Something went wrong. Please check submitted data' });


    } catch (error) {
        console.error('Error updating order product:', error);
        res.status(500).json({ error: 'Failed to update order product' });
    }
};

module.exports = {
    getOrderProducts,
    addOrderProducts,
    updateOrderProduct
};