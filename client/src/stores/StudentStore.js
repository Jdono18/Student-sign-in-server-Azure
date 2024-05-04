import { defineStore } from 'pinia'  // import and setup pinia store
import { ref, computed } from 'vue' // add ref and computed functions in reactivity api from vue
import { mande } from 'mande'  // imports mande library

const studentAPI = mande('api/students')  // initializes studentAPI variable that can make api calls using mande and the proper route.  Get requests, Post request, Patch request, Delete requests

export const useStudentStore = defineStore('students', () => {  // function to setup pinia store

    const sortedStudents = ref([])  // initializes sortedStudents variable set as an empty array and reactive data type

    const mostRecentStudent = ref({}) // initializes mostRecentStudent variable set as an empty object and reactive data type

    const addNewStudentErrors = ref([])  // initializes addNewStudentErrors variable set as an empty array and reactive data type

    function getAllStudents() {  // defines getAllStudents function
        studentAPI.get().then( students => {  // make an API request to get all students from studentList and save in store
            sortedStudents.value = students
        }).catch( err => {  // error handling
            console.log(err)
        })
    }

    function addNewStudent(student) {   // make an api request to add new student
        studentAPI.post(student).then( () => {   // post request with new student object, no data returned so empty parentheses
            getAllStudents()  // call getAllStudents, 2nd api request to get new student list from server
        }).catch( err => { // error handling
            addNewStudentErrors.value = err.body  // adds errors value to reactive data variable
        })
    }

    function deleteStudent(student) {  // defines deleteStudent function that takes student argument
        // make api request
        const deleteStudentAPI = mande(`/api/students/${student.id}`)
        deleteStudentAPI.delete().then( () => {
            getAllStudents()
        }).catch( err => {  // error handling
            console.log(err)
        })
    }

    function arrivedOrLeft(student) {  // defines arrivedOrLeft function that takes student argument
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {  // when patch request is complete
            getAllStudents()  // call getAllStudents() function
        }).catch( err => {  // error handling
            console.log(err)
        })

     }

    const studentCount = computed( () => {  // initializes the variable studentCount that holds a computed function which returns the length of studentList (# of students)
        return sortedStudents.value.length
    })


    return{   // returns the reactive data, functions, and computed properties listed below
        // reactive data
        sortedStudents,
        mostRecentStudent,
        addNewStudentErrors,

        // functions
        getAllStudents,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,

        // computed properties
        studentCount,

    }



})