const cryptoServices = require('../services/cryptoServices')


exports.preloadTrip = async (req, res, next) => {
    const crypto = await cryptoServices.getOne(req.params.cryptoID).lean()

    req.crypto = crypto

    next()
}

exports.isTripAuthor = async (req, res, next) => {
    const crypto = await cryptoServices.getOne(req.params.cryptoID).lean()
    if (crypto?.owner != req.user._id) {
        return next({ message: 'You are not authorized', status: 401 })
    }
    next()
}