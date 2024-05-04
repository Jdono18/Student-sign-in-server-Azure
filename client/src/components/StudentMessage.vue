<script setup>

import { useStudentStore } from "../stores/StudentStore.js";   // imports useStudentStore a pinia store that contains reactive data, functions, and computed properties from StudentStore.js
import {storeToRefs } from "pinia";  // add reference to pinia store

const studentStore = useStudentStore()  // initializes variable studentStore that calls useStudentStore function

const { mostRecentStudent } = storeToRefs(studentStore)  // initializes { mostRecentStudent } ref from pinia store declared in StudentStore.js

</script>

<template>

  <div id="welcome-or-goodbye-message" class="m-2">  <!-- message alert when student is present or leaves -->

    <div v-if="mostRecentStudent.name">
      <div v-if="mostRecentStudent.present" class="alert alert-success">  <!-- when mostRecentStudent status changes to present the bootstrap alert prints -->
        Welcome! {{ mostRecentStudent.name }}  <!-- displays welcome mostRecentStudent message -->
      </div>
      <div v-else class="alert alert-info">
        Goodbye {{mostRecentStudent.name}}, see you later.  <!-- displays goodbye mostRecentStudent message -->
      </div>
    </div>
  </div>


</template>

<style scoped>

/* CSS here */

</style>