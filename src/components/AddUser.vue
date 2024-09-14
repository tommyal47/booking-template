<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field clearable v-model="user.fullName" label="Full name" variant="solo"
        :rules="[nameValidation]"></v-text-field>

      <v-text-field clearable v-model="user.emailAddress" label="Email Address" type="email"
        placeholder="johndoe@gmail.com" variant="solo" :rules="[emailRules]"></v-text-field>

      <v-text-field clearable v-model="user.phoneNumber" label="Phone Number" type="phone" variant="solo"
        :rules="[phoneRules]"></v-text-field>

      <v-btn class="mt-2" type="submit" @click="addUser" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/storeUser';

const storeUser = useUserStore()

const user = ref({})

const emailRules = computed(() => {
    if (user.value.emailAddress) return true

    return 'Email is required'
  }
)
const nameValidation = computed(() => {
  if (user.value.fullName?.length >= 3) return true

  return 'Full name must be at least 3 characters.'
})


const phoneRules = computed(() => {
    if (user.value.phoneNumber?.length === 11) return true

    return 'Phone number must be 11 degits'
  }
);

const addUser = () => {
  if (user.value.fullName && user.value.emailAddress && user.value.phoneNumber) {
    storeUser.addUser(user.value)
    console.log(storeUser.users);
  }
}

</script>
