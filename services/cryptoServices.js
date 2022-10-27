const Crypto = require('../models/Crypto')


exports.create = (CryptoData) => Crypto.create(CryptoData)
exports.getAll = () => Crypto.find()
exports.getOne = (CryptoID) => Crypto.findById(CryptoID)
// exports.getOneDetailed = (CryptoID) => Crypto.findById(CryptoID)
exports.delete = (CryptoID) => Crypto.deleteOne({ _id: CryptoID })
exports.update = (CryptoID, CryptoData) => Crypto.updateOne({ _id: CryptoID }, { $set: CryptoData }, { runValidators: true })
// exports.updateOne = (CryptoID, seatsNew) => Crypto.updateOne({ _id: CryptoID }, { $set: { "seats" : seatsNew } }, { runValidators: true })
// exports.addBuddies = (CryptoID, userId) => Crypto.updateOne({ _id: CryptoID }, { $push: { "Buddies" : userId } }, { runValidators: true })
// exports.addCrypto = (CryptoID, userId) => Crypto.updateOne({_id: CryptoID}, {$push: {Buddies: userId}})

// exports.getCryptoByID = (userId) => Crypto.find({CryptosHistory: userId})
exports.updateRooms = (CryptoID, CryptoData) => Crypto.updateOne({ _id: CryptoID }, { $set: CryptoData }, { runValidators: true })


exports.addCrypto = (CryptoID, userId) => Crypto.updateOne({_id: CryptoID}, {$push: {buyCrypto: userId}})
