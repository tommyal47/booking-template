<!-- eslint-disable vue/valid-v-slot -->
<!-- <template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" persistent>
      <v-card class="mx-auto" width="500" prepend-icon="" title="Add Admin">
        <v-sheet class="mx-auto" width="500">
          <v-stepper :items="items">
            <template v-slot:item.1>
              <v-card>
                <v-text-field clearable label="full name" variant="solo"></v-text-field>
                <v-text-field clearable label="email" variant="solo"></v-text-field>
                <v-text-field clearable label="phone" variant="solo"></v-text-field>
              </v-card>
            </template>

            <template v-slot:item.2>
              <v-card>
                <v-text-field clearable label="role" variant="solo"></v-text-field>
              </v-card>
            </template>

            <template v-slot:item.3>
              <v-card @click="$emit('handleCloseDialog')">
                <v-text-field clearable label="password" variant="solo"></v-text-field>
                <v-text-field clearable label="confirm password" variant="solo"></v-text-field>
              </v-card>
              <v-stepper-actions ></v-stepper-actions>
            </template>
          </v-stepper>
        </v-sheet>
      </v-card>
    </v-dialog>
  </div>
</template> -->

<!-- <script setup>
import { ref, defineEmits } from 'vue';

const dialog = ref(true);
defineEmits('[handleCloseDialog]')

const items = ref(['Admin info', 'Role', 'Password'])
</script> -->


<template>
  <v-dialog v-model="dialog" persistent>
    <v-card class="mx-auto" width="500" prepend-icon="" title="Add Admin">
      <v-sheet class="mx-auto" width="500">
        <v-stepper v-model="step">
          <!-- <template v-slot:default="{ prev, next }"> -->
          <v-stepper-header>
            <v-stepper-item title="admin info" value="1">
            </v-stepper-item>
            <v-stepper-item title="role info" value="2">
            </v-stepper-item>
            <v-stepper-item title="password info" value="3">
            </v-stepper-item>
          </v-stepper-header>
          <v-stepper-window>
            <v-stepper-window-item step="1" value="1">
              <v-text-field clearable v-model="admin.fullName" :label="$t('Name')" variant="solo"
                :rules="[nameRules]"></v-text-field>
              <v-text-field clearable v-model="admin.email" :label="$t('Email')" variant="solo"
                :rules="[emailRules]"></v-text-field>
              <v-text-field clearable type="number" v-model="admin.phoneNumber" :label="$t('Phone')" variant="solo"
                :rules="[phoneRules]"></v-text-field>
            </v-stepper-window-item>
            <v-stepper-window-item step="2" value="2">
              <v-text-field clearable v-model="admin.role" :label="$t('Role')" variant="solo"
                :rules="[roleRules]"></v-text-field>
            </v-stepper-window-item>
            <v-stepper-window-item step="3" value="3">
              <v-text-field clearable v-model="admin.password" type="password" :label="$t('Password')" variant="solo"
                :rules="[passwordRules]"></v-text-field>
              <v-text-field clearable v-model="confirmPassword" type="password" :label="$t('ConfirmPassword')"
                variant="solo" :rules="[confirmPasswordRules]"></v-text-field>
            </v-stepper-window-item>
          </v-stepper-window>
          <v-stepper-actions :disabled="disabled" :next-text="N" @click:next="next"
            @click:prev="prev"></v-stepper-actions>
          <!-- </template> -->
        </v-stepper>
      </v-sheet>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, defineEmits, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAdminStore } from '@/stores/storeAdmin';
import Swal from 'sweetalert2';
const storeAdmin = useAdminStore()

const { t } = useI18n();
const emit = defineEmits(['handleCloseDialog']);
const step = ref(0)
const N = ref("next")
const admin = ref({})
const confirmPassword = ref()
const disabled = computed(() => step.value === 0 ? 'prev' : false)
const nameRules = computed(() => {
  if (admin.value.fullName?.length >= 3) return true

  return t('errors.fullname')
})
const phoneRules = computed(() => {
  if (admin.value.phoneNumber?.length === 11) return true

  return t('errors.phonenumber')
});
const emailRules = computed(() => {
  if (admin.value.email) return true

  return t('errors.email')
})
const roleRules = computed(() => {
  if (admin.value.role) return true

  return t('errors.role')
})

const passwordRules = computed(() => {
  if (admin.value.password) {
    if (admin.value.password?.length >= 8) return true
    return t('errors.passwordlength')
  }
  return t('errors.password')
})
// const confirmPasswordRules = computed(() => {
//   if (!admin.value.confirmPassword) {
//     return t('errors.password')
//   } 
//   if (admin.value.confirmPassword?.length >= 8) {
//         return true
//       }
//       return t('errors.passwordconfirm')


// })
const confirmPasswordRules = watch(admin.value.confirmPassword,() => {
  if (!admin.value.confirmPassword) {
    // If confirmPassword is empty, return an error message
    console.log('Password:', admin.value.password);
    console.log('Confirm Password:', admin.value.confirmPassword);
    return t('errors.password');
  }
  if (admin.value.confirmPassword.length < 8) {
    // If confirmPassword is less than 8 characters, return an error message
    return t('errors.passwordLength'); // Assuming you have an error for this
  }
  if (admin.value.confirmPassword !== admin.value.password) {
    // If confirmPassword doesn't match password, return an error message
    return t('errors.passwordconfirm');
  }
  // If everything is valid, return true
  return true;
});


const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
const next = () => {
  if (step.value === 0) {
    if (admin.value.fullName?.length >= 3 && admin.value.email && admin.value.phoneNumber?.length === 11) {
      step.value++;
      return true;
    }
    if (admin.value.fullName?.length < 3 || !admin.value.email || admin.value.phoneNumber?.length !== 11) {
      Toast.fire({
        icon: "error",
        title: "fill the required fields"
      });
    }
  }
  if (step.value === 1) {
    if (admin.value.role) {
      step.value++;
      return true;
    } else {
      Toast.fire({
        icon: "error",
        title: "fill the required fields"
      });
    }
  }

  if (step.value === 2) {
    N.value = "Submit"
    if (admin.value.password) {
      if (admin.value.password === confirmPassword.value) {
        storeAdmin.addAdmin(admin.value)
        Toast.fire({
          icon: "success",
          title: "admin added successfully"
        });
        emit('handleCloseDialog')
      } else {
        Toast.fire({
          icon: "error",
          title: "password not match"
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "fill the required fields"
      });
    }
  }

}
const prev = () => {
  if (step.value >= 1) {
    N.value = "next"
    step.value--;
  }
};

const dialog = ref(true);
</script>