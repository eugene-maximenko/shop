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
}

module.exports = Cart