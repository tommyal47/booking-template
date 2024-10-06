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
              <v-text-field clearable label="full name" variant="solo"></v-text-field>
              <v-text-field clearable label="email" variant="solo"></v-text-field>
              <v-text-field clearable label="phone" variant="solo"></v-text-field>
            </v-stepper-window-item>
            <v-stepper-window-item step="2" value="2">
              <v-text-field clearable label="role" variant="solo"></v-text-field>
            </v-stepper-window-item>
            <v-stepper-window-item step="3" value="3">
              <v-text-field clearable label="password" variant="solo"></v-text-field>
              <v-text-field clearable label="confirm password" variant="solo"></v-text-field>
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
import { ref, computed } from 'vue';

const step = ref(0)
const N = ref("next")
const disabled = computed(() => step.value === 0 ? 'prev' : false)

const next = () => {
  if (step.value < 3) {
    console.log("bafore", step.value);
    step.value++;
    if (step.value === 2) {
      N.value = "Submit"
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