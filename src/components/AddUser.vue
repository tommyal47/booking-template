<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field clearable v-model="fullName" label="Full name" variant="solo" :rules="fullNameRules"></v-text-field>
      <v-text-field clearable v-model="emailAddress" label="Email Address" type="email" placeholder="johndoe@gmail.com"
        variant="solo" :rules="emailRules"></v-text-field>
      <v-text-field clearable v-model="phoneNumber" label="Phone Number" type="phone" variant="solo" :rules="phoneRules"></v-text-field>
      <!-- <v-text-field v-model="fullName" :rules="fullNameRules" label="Full name"></v-text-field> -->

      <!-- <v-text-field v-model="lastName" :rules="lastNameRules" label="Last name"></v-text-field> -->

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>


<script setup>
import { ref } from 'vue';

const fullName = ref('')
const fullNameRules = ref([
  value => {
    if (value?.length >= 3) return true

    return 'Full name must be at least 3 characters.'
  }
]);

const emailAddress = ref('')
const emailRules = ref([
  value => {
    if (value) return true

    return 'Email is required'
  }
])
const phoneNumber = ref('')
const phoneRules = ref([
  value => {
    if (value?.length === 11) return true

    return 'Phone number must be 11 degits'
  }
]);

</script>


<!-- <script>
export default {
  data: () => ({
    firstName: '',
    firstNameRules: [
      value => {
        if (value?.length >= 3) return true

        return 'First name must be at least 3 characters.'
      },
    ],
    lastName: '123',
    lastNameRules: [
      value => {
        if (/[^0-9]/.test(value)) return true

        return 'Last name can not contain digits.'
      },
    ],
  }),
}
</script> -->