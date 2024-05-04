<script setup>

  import { ref, watch } from 'vue'  // imports ref api from vue

  import { useStudentStore } from "../stores/StudentStore.js";
  import {storeToRefs} from "pinia";  // imports useStudentStore a pinia store that contains reactive data, functions, and computed properties from StudentStore.js

  const studentStore = useStudentStore()  // initializes studentStore variable which calls useStudentStore function - the defined pinia store in StudentStore.js

  const newStudentName = ref('')  // initializes newStudentName variable - holds reactive data
  const newStarID = ref('')   // initializes newStarId variable - holds reactive data

  const formErrors = ref([])  // initializes formErrors variable - holds reactive data

  const { addNewStudentErrors } = storeToRefs(studentStore)  // initializes addNewStudentErrors variable that allows tracking of errors from addNewStudentErrors array in StudentStore.js to be stored in pinia store

  watch ( addNewStudentErrors, () => {  // every time addNewStudentErrors changes the errors are displayed in browser
    if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0) {  // if more than 0 errors
      alert(addNewStudentErrors.value.join('\n'))   // alert generated in browser if errors present - each error printed to new line of addNewStudentErrors array
    }
  })

  function addStudent() {   // defines addStudent function

    formErrors.value = [] // reset form errors

    if (newStudentName.value.length == 0) {    // error message for empty newStudentName value
      formErrors.value.push('Student name must be entered')
    }
    if (newStarID.value.length == 0) {  // error message for empty newStarID value
      formErrors.value.push('StarID must be entered')
    }

    if (formErrors.value.length == 0) {  // if no errors adds student object

      let student = {
        name: newStudentName.value,
        starID: newStarID.value,
        present: false
      }

      studentStore.addNewStudent(student)  // adds new student object to pinia studentStore

      newStudentName.value = ''  // resets newStudentName field to empty
      newStarID.value = ''  // resets newStarID field to empty
    }
  }

</script>

<template>

  <div id="new-student-form-errors" class="m-2">  <!-- shows errors from new student form in bootstrap alert danger class -->
    <div v-if="formErrors.length > 0" class="alert alert-danger">
      <li v-for="error in formErrors">
        {{error}}
      </li>
    </div>
  </div>

  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">  <!-- v-model newStudentName to name input.  Reactive data type; two-way binding.  Also trims empty user character input -->
      <label for="name">Name</label>
      <input v-model.trim="newStudentName" id="name" class="form-control">
    </div>

    <div class="form-group mb-3">  <!-- v-model newStarID to starID input.  Reactive data type; two-way binding.  Also trims empty user character input -->
      <label for="starID">Star ID</label>
      <input v-model.trim="newStarID" id="starID" class="form-control">
    </div>

    <button v-on:click="addStudent" class="btn btn-primary">Add</button>  <!-- v-on click event handler runs addStudent function on button click -->

  </div>

</template>

<style scoped>

/* CSS here */

</style>