<template>
  <v-sheet class="mx-auto" width="300">
    <v-btn class="back-btn" icon="mdi-arrow-left-thick" @click="router.push('/users')"></v-btn>
    <v-form fast-fail @submit.prevent="addUser">
      <v-text-field clearable v-model="user.fullName" :label="$t('Name')" variant="solo"
        :rules="[nameValidation]"></v-text-field>

      <v-text-field clearable v-model="user.emailAddress" :label="$t('Email')" type="email"
        placeholder="johndoe@gmail.com" variant="solo" :rules="[emailRules]"></v-text-field>

      <v-text-field clearable v-model="user.phoneNumber" :label="$t('Phone')" type="number" variant="solo"
        :rules="[phoneRules]"></v-text-field>

      <v-btn class="mt-2" type="submit" block>{{$t('Submit')}}</v-btn>
      <!-- <v-btn class="mt-2" block>back</v-btn> -->
    </v-form>
  </v-sheet>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/storeUser';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const router = useRouter()

const storeUser = useUserStore()

const user = ref({})

const emailRules = computed(() => {
  if (user.value.emailAddress) return true

  return t('errors.email')
}
)
const nameValidation = computed(() => {
  if (user.value.fullName?.length >= 3) return true

  return t('errors.fullname')
})


const phoneRules = computed(() => {
  if (user.value.phoneNumber?.length === 11) return true

  return t('errors.phonenumber')
}
);

const addUser = () => {
  if (user.value.fullName && user.value.emailAddress && user.value.phoneNumber) {
    storeUser.addUser(user.value)
    console.log(storeUser.users);
    router.push(`/users`)
  }
}

</script>

<style>
.back-btn {
  margin-right: 16px;
}

.back-btn {
  position: absolute;
  margin: -58px;
  margin-left: -75px;
  color: lightslategrey;
  background-color: floralwhite;
}
</style>