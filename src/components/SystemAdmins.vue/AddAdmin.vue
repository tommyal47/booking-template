<!-- eslint-disable vue/valid-v-slot -->
<template>
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
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const dialog = ref(true);
defineEmits('[handleCloseDialog]')

const items = ref(['Admin info', 'Role', 'Password'])
</script>
