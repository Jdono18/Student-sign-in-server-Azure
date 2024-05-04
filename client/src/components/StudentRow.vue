<script setup>

import { ref } from 'vue'  // imports reactivity api from vue

const props = defineProps({ // initializes variable props that defines component props as an object named student
  student: Object
})

const emit = defineEmits([ 'arrived-or-left', 'delete-student'])  // initializes variable emit that defines event emits as 'arrived-or-left' and 'delete-student' in component

const isStudentPresent = ref(props.student.present)

const notifyArrivedOrLeft = () => {  // notifyArrivedOrLeft function that tells parent that student arrived or left - emit event, and listed values
  emit('arrived-or-left', props.student, isStudentPresent.value)
}

const confirmThenDeleteStudent = () => {    // confirmThenDeleteStudent function that tells parent that student is deleted - emit event and listed value
  emit('delete-student', props.student)
}

</script>

<template>

  <tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }">  <!-- vue for loop student in sortedStudents prints student name and starID refs.  Also add v-bind class = present or absent.-->
    <td>{{ student.name  }}</td>
    <td>{{ student.starID }}</td>
    <td>
      <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">  <!-- adds checkbox for if student is present in class or not -->
      <span v-if="student.present" class="mx-3">Here!</span>
      <span v-else class="mx-3"> Not present</span>
    </td>

    <td>
      <button v-on:click="confirmThenDeleteStudent" class="btn btn-danger">  <!-- adds trash can symbol and delete button to table -->
        <i class="bi bi-trash-fill"></i> Delete </button>

    </td>
  </tr>

</template>

<style scoped>  /* adds CSS styles listed */

.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}

</style>