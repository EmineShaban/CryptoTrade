const router = require('express').Router()
const { isAuth, isGueat } = require('../middlewares/authMiddleware')
const { getErrorMessage } = require('../utils/errorHelper')
const cryptoServices = require('../services/cryptoServices')
const userService = require('../services/userService')
const { preloadTrip, isTripAuthor } = require('../middlewares/tripMiddleware')



router.get('/catalog', async(req, res) => {
        const cryptoOffer = await cryptoServices.getAll().lean()

    res.render('crypto/catalog', {cryptoOffer})
})


router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create')
})


router.post('/create', isAuth, async (req, res) => {
    // console.log(req.body)
    // if(req.body.crypto.length <4 ){
    //     return res.render('auth/register', { error: "crypto name must be at leats 4 characters long!" })
    // }
    // if(req.body.city.length <3 ){
    //     return res.render('auth/register', { error: "crypto name must be at leats 3 characters long!" })
    // }
    try {
        const crypto = await cryptoServices.create({ ...req.body, owner: req.user })
        // await userService.addTrip(req.user._id, crypto._id)
        // console.log(req.body)
        res.redirect('/crypto/catalog')
    } catch (error) {
        // const crypto = await cryptoServices.create({ ...req.body, owner: req.user })
// let cryptol = req.body
        return res.render('crypto/create', { error: getErrorMessage(error), crypto:req.body })
    }
})

router.get(
    '/:cryptoID/details',
    async (req, res) => {
        try {
            const crypto = await cryptoServices.getOne(req.params.cryptoID).lean()
            const user = await userService.getOne(req.user?._id).lean()
            const isAuthor = crypto.owner == req.user?._id
            const isAlreadyJoin = crypto.buyCrypto?.find(element => element == req.user?._id) == req.user?._id
            res.render('crypto/details', { ...crypto, isAuthor, isAlreadyJoin })
        } catch (error) {
            return res.render(`crypto/details`, { error: getErrorMessage(error) })
        }
    })


router.get(
    '/:cryptoID/delete',
    isAuth,
    // isTripAuthor,
    async (req, res) => {
        await cryptoServices.delete(req.params.cryptoID)
        res.redirect('/crypto/catalog')
    })

router.get(
    '/:cryptoID/edit',
    isAuth,
    // isTripAuthor,
    async (req, res) => {
        try {
            const crypto = await cryptoServices.getOne(req.params.cryptoID).lean()
            res.render('crypto/edit', { ...crypto })
        } catch (error) {
            return res.render(`crypto/details`, { error: getErrorMessage(error) })
        }
    })


router.post(
    '/:cryptoID/edit',
    isAuth,
    // isTripAuthor,
    async (req, res) => {
        try {
            await cryptoServices.update(req.params.cryptoID, req.body)
            res.redirect(`/crypto/${req.params.cryptoID}/details`)
        } catch (error) {
            res.render('crypto/edit', { ...req.body, error: getErrorMessage(error) })
        }
    })

router.get(
    '/:cryptoID/join',
    isAuth,
    preloadTrip,
    async (req, res) => {
        try {
            await cryptoServices.addCrypto(req.crypto._id, req.user._id)
            // req.crypto.freeRooms -= 1
            // await cryptoServices.updateRooms(req.params.cryptoID, req.crypto)
            res.redirect(`/crypto/${req.params.cryptoID}/details`)
        } catch (error) {
            res.render(`crypto/${req.params.cryptoID}/details`, { ...req.body, error: getErrorMessage(error) })
        }
    })


router.get('*', (req, res) => {
    res.render('404')
})

module.exports = router