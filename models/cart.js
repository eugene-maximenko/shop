const path = require('path')
const fs = require('fs')

const p = path.join(__dirname, '..', 'data', 'cart.json')

class Cart {
    static async add(course) {
        const cart = await Cart.fetch()

        const idx = cart.courses.findIndex(c => c.id === course.id)
        const candidate = cart.courses[idx]

        if (candidate) {
            candidate.count++
        } else {
            course.count = 1
            cart.courses.push(course)
        }

        cart.price += +course.price

        await fs.promises.writeFile(p, JSON.stringify(cart))
    }

    static async fetch() {

        const content = await fs.promises.readFile(p, 'utf-8')

        return JSON.parse(content)
    }

    static async remove(id) {
        const cart = await Cart.fetch()

        const idx = cart.courses.findIndex(c => c.id === id)
        const course = cart.courses[idx]

        if (course.count === 1) {
            cart.courses = cart.courses.filter(c => c.id !== id)
        } else {
            course.count--
        }

        cart.price -= +course.price

        await fs.promises.writeFile(p, JSON.stringify(cart))
        return await Cart.fetch()
    }
}

module.exports = Cart