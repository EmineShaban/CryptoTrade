const mongoose = require('mongoose')
const validator = require('validator')
const URL_PATTERN = /^https?:\/\/.+$/i
const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    },
    description: {
        type: String,
        required: true,
        // minlength: [3, 'City must be at leats 3 characters long!']
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
