const { Router } = require('express')

const router = new Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    })
})

module.exports = router