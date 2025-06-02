const { Router } = require('express')
const Cart = require('../models/cart')
const Course = require('../models/course')
const router = new Router()

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id)

    await Cart.add(course)

    res.redirect('/cart')
})

router.get('/', async (req, res) => {
    const cart = await Cart.fetch()
    res.render('cart', {
        title: 'Cart',
        courses: cart.courses,
        price: cart.price,
        isCart: true,
    })
})

router.delete('/remove/:id', async (req, res) => {
    const cart = await Cart.remove(req.params.id)

    res.json(cart)
})

module.exports = router