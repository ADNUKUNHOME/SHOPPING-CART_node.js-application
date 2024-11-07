const { resolve } = require('express-hbs/lib/resolver');
var db = require('../config/connection');
var collections = require('../config/collection');
const promise = require('promise');
const { response } = require('../app');
const { ObjectId } = require('mongodb')

module.exports = {
    addProduct:(product, callback) => {

        db.get().collection('products').insertOne(product).then((data) => {
            callback(data.insertedId.toString())
        })
    },

    getAllProducts:() => {
        return new promise(async(resolve, reject) => {
            let products = await db.get().collection(collections.PRODUCTS_COLLECTOIN).find().toArray();
            resolve(products);
        });
    },

    deleteProduct:(proId) => {
        return new promise((resolve, reject) => {
                const objectId = new ObjectId(proId);
                db.get().collection(collections.PRODUCTS_COLLECTOIN).deleteOne({ _id: objectId }).then((response) => {
                console.log(response)
                    resolve(response);
            })
        })
    }
}