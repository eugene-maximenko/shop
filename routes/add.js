const { Router } = require('express')
const Course = require('../models/course')
const router = new Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const course = new Course(req.body)

    await course.save()

    res.redirect('/courses')
})

module.exports = router