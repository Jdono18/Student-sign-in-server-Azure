<script setup>

  import { onMounted } from 'vue'  // onMounted is a function called automatically when page loads
  import NewStudentForm from "./components/NewStudentForm.vue";  // imports NewStudentForm component from file path
  import StudentTable from "./components/StudentTable.vue";  // imports StudentTable component from file path
  import StudentMessage from "./components/StudentMessage.vue";   // imports StudentMessage component from file path

  import { useStudentStore } from './stores/StudentStore.js' // imports pinia studentStore

  const studentStore = useStudentStore()  // initializes new variable studentStore that calls useStudentStore pinia store and stores values

  onMounted( () => {  // getAllStudents function called when app is launched
    //whatever is in here will run when the component is first displayed
    studentStore.getAllStudents()  // asks studentStore to call getAllStudents function
  })

</script>

<template>

  <h2> Student Sign In </h2>
  <!-- HTML here -->
  <StudentMessage></StudentMessage>   <!-- passes StudentMessage Component -->
  <NewStudentForm></NewStudentForm>   <!-- passes NewStudentForm Component -->
  <StudentTable></StudentTable>       <!-- passes StudentTable Component -->



</template>

<style scoped>

h2{
  margin: 20px;
  font-weight: bold;
  text-align: center;
}

</style>