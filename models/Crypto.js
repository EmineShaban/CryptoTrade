const mongoose = require('mongoose')
const validator = require('validator')
const URL_PATTERN = /^https?:\/\/.+$/i
const cryptoSchema = new mongoose.Schema({
//     You should make the following validations while creating or editing a crypto offer:
// The Name should be at least two characters
// The Price should be a positive number
// The Crypto Image should start with http:// or https://.
// The Description should be a minimum of 10 characters long.
// The Payment Method must be one of the options
    name: {
        type: String,
        required: true,
        minlength: [2, 'City must be at leats 2 characters long!']

    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: "Image URL is not valid!"
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'City must be at leats 10 characters long!']
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal']
    },

    buyCrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }

})

const Crypto = mongoose.model('Crypto', cryptoSchema)
module.exports = Crypto
