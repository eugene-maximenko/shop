const uuid = require('uuid').v4
const fs = require('fs')
const path = require('path')

class Course {
    constructor({ title, price, img }) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid()
    }

    // Refact
    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    // Refact
    async save() {
        const courses = await Course.getAll()
        courses.push(this.toJSON())

        return new Promise((res, rej) => {

            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) { rej(err) }
                    else { res() }
                }
            )
        })

    }

    // Refact
    static getAll() {

        return new Promise((res, rej) => {

            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8', (err, content) => {
                    if (err) { rej(err) }
                    else {
                        res(JSON.parse(content))
                    }


                }
            )

        })

    }
}

module.exports = Course