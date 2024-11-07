var db = require('../config/connection');
var collections = require('../config/collection');
const promise = require('promise');
const bcrypt = require('bcrypt');

module.exports = {

    doSignup:(userData) => {
        return new promise(async(resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userData).then((data) => {
                resolve(data)
            })
        })
    },

    doLogin:(userData) => {
        return new promise(async(resolve, reject) => {

            let response = {}
            let user = await db.get().collection(collections.USER_COLLECTION).findOne({email:userData.email});

            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        response.user = user;
                        response.status = true;
                        resolve(response)
                    }else{
                        resolve({status: false})                        
                    }
                })
            }else{
                resolve({status: false})                        
            }
        })
    }
}