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
    static async update(course) {
        const courses = await Course.getAll()                   // Get all courses

        const idx = courses.findIndex(c => c.id === course.id)  // Get index of the course
        courses[idx] = course                                   // Update the course
        const data = JSON.stringify(courses)                    // Data to JSON

        return await fs.writeFile(                              // Rewrite the course file
            Course.coursesDataFile,
            data,
            (err) => {
                if (err) { throw err }
                console.log(`${course.title} course was updated in the system!`);
            })
    }

    static coursesDataFile = path.join(__dirname, '..', 'data', 'courses.json')


    // Refact
    async save() {

        try {
            const allCourses = await Course.getAll()     // Get all courses
            allCourses.push(this.toJSON())               // Update list with the new course

            const data = JSON.stringify(allCourses)      // Data to JSON

            return await fs.writeFile(Course.coursesDataFile, data, // Rewrite the course file
                (err) => {
                    if (err) { throw err }
                    console.log('New courses is added :)');
                })


        } catch (error) {
            console.log(error);
        }
    }

    // Refact
    static async getAll() {

        return new Promise((res, rej) => {

            fs.readFile(
                Course.coursesDataFile,
                'utf-8',
                (err, content) => {
                    if (err) { rej(err) }
                    else {
                        res(JSON.parse(content))
                    }


                }
            )
        })

    }

    static async getById(id) {
        const courses = await Course.getAll()
        return courses.find(c => c.id === id)
    }
}

module.exports = Course