const https = require("https");
let productCollection = [];

const getCollection = () => {
    https.get('https://homework.solutional.ee/api/products/', res => {
        let data = [];

        res.on('data', chunk => {
            data.push(chunk);
        });

        res.on('end', () => {
            const products = JSON.parse(Buffer.concat(data).toString());

            for (product of products) {
                productCollection.push(product);
            }
        });
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
}

getCollection();

const getProducts = (req, res) => {
    if (!productCollection.length) {
        getCollection();
    }

    const data = {
        products: productCollection
    };

    res.json(data);
};

const getProductCollection = () => {
    if (!productCollection.length) {
        getCollection();
    }

    return productCollection;
}

module.exports = {
    getProducts,
    getProductCollection
};