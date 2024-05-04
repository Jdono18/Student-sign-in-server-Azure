<script setup>

import { useStudentStore } from "../stores/StudentStore.js"   // imports useStudentStore a pinia store that contains reactive data, functions, and computed properties from StudentStore.js

import { storeToRefs } from "pinia"   // add reference to pinia store

import { computed } from 'vue'  // imports computed properties from vue

import StudentRow from './StudentRow.vue'  // imports StudentRow component

const studentStore = useStudentStore()  // initializes variable studentStore that calls useStudentStore function

const { sortedStudents, studentCount } = storeToRefs(studentStore)  // initializes { sortedStudents } and { studentCount} computed refs from pinia store declared in StudentStore.js

const deleteStudent = (student) => {  // defines deleteStudent function that takes a student argument
  studentStore.deleteStudent(student)  // uses listed studentStore function to delete student from studentStore in pinia
}

const arrivedOrLeft = (student, isStudentPresent) => {  // defines arrivedOrLeft function that takes student and isStudentPresent arguments
  student.present = isStudentPresent  // sets isStudentPresent value to student.present
  studentStore.arrivedOrLeft(student)  // uses studentStore function to add student to mostRecentStudent.value
}

const pluralStudentMessage = computed( () => {  // defines a pluralStudentMessage function that is a computed property printing messages listed below in if - else statement
  if(studentCount.value === 1 ){
    return 'There is 1 student in class'
  } else {
    return `There are ${studentCount.value} students in class`
  }
})

</script>

<template>
  <div id="student-list-table" class="card m-2 p-2">  <!-- div that creates a table holding the student name, star id, and if they are present -->
    <h4 class="card-title">Student List</h4>
    <h5 class="card-subtitle text-muted"> {{ pluralStudentMessage }}</h5>  <!-- keeps total # of students in class using computed ref property -->
    <div id="student-table">
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
        </tr>
        </thead>

        <tbody>

        <!-- Passes StudentRow vue component using a v-for loop, binding student to student class.  V-on click event handling that links emits in StudentRow component to arrivedOrLeft and deleteStudent functions  -->
          <StudentRow
              v-for="student in sortedStudents"
              v-bind:student="student"
              v-on:arrived-or-left="arrivedOrLeft"
              v-on:delete-student="deleteStudent"
          ></StudentRow>
        <!--
        Each row will have a checkbox, bound to the app's data
        When the checkbox is checked/unchecked,
        the student will be signed in/out -->

        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped> /* add CSS styles below */

#student-table {
  max-height: 400px;
  overflow: scroll;
}

th, tr {
  width: 25%;
}




</style>