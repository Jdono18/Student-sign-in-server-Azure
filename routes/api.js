const express= require('express')  // imports express
const database = require('../models/index')  // will import the index.js file from this directory path
const Student = database.Student // connect to student database, the student model

const router = express.Router()  // creates express router

router.get('/students', function(req, res, next){  // get route to findAll students
    Student.findAll( { order: ['name'] } ).then(students => {  // student model gets all student objects from database, orders array data alphabetically by name
        return res.json(students)  // returns response as json
    })
})

router.post('/students', function(req, res, next){  // post request route to add data to database
    const newStudent = req.body  // newStudent variable that holds the data from the body of the request
    console.log(newStudent)
    Student.create(newStudent).then( result => {  // StudentModel create newStudent into database
        return res.status(201).send('New student created!') // success
    }).catch( err => {  // error handling
        if (err instanceof database.Sequelize.ValidationError) { // prints err message type (validation error, etc..) why can't database add the data
            const messages = err.errors.map( e => e.message )  // initializes messages variable that stores errors is an array, for each error in array  print error message
            return res.status(400).json(messages) // return error messages
        } else {
            next(err)   // some other error?
        }

        //return res.status(400).send('Invalid data')  // 400 = bad request - client is sending a request the server cannot fulfill
    })
})

router.patch('/students/:id', function(req, res, next){  // colon (:) = a placeholder in url
    // matches requests to /students/1, /students/2, //students/100
    // req.params stores the id value.  Stores any placeholders in the URL
    const studentID = req.params.id
    const updatedStudent = req.body // updated data about this student
    console.log(updatedStudent)
    Student.update( updatedStudent, { where: { id: studentID } }).then( ( result ) => {  // Student model updated with updatedStudent variable in body of request.  Where defines id location in database.  Returns result object

        const rowsModified = result[0]  // initializes rowsModified variable that is results array.  First item in array is the number of rows that were changed
        if (rowsModified === 1) {   // if 1 row was changed we found the student and they were updated
            return res.send('OK') // status is 200 by default
        }
        else{  // studentID that doesn't exist
            return res.status(404).send('Student not found')
        }
    }).catch( err => { // database error - can't connect, or database reports error
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message )
            return res.status(400).json(messages)
        } else {
            next(err)   // some other error?
        }
    })
})

router.delete('/students/:id', function(req, res, next){
    const studentID = req.params.id  // delete request to /api/students/4 will delete student with ID 4
    Student.destroy({ where: { id: studentID } }).then( (rowsDeleted) => {
        if (rowsDeleted === 1) {
            return res.send('Student deleted')
        } else {  // 0 rows deleted - the student with this id is not in the database
            return res.status(404).send('Student not found')
        }
    }) .catch( err => {
        return next(err)
    })
})

module.exports = router  // don't forget the s, also must be last line in file