<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" persistent>
      <v-card class="mx-auto" width="500" prepend-icon="" title="Add Admin">
        <v-sheet class="mx-auto" width="500">
          <v-stepper :items="['Step 1', 'Step 2', 'Step 3']">
            <template v-slot:item.1>
              <v-card title="Step One" flat>...</v-card>
            </template>

            <template v-slot:item.2>
              <v-card title="Step Two" flat>...</v-card>
            </template>

            <template v-slot:item.3>
              <v-card title="Step Three" flat>...</v-card>
            </template>
          </v-stepper>
        </v-sheet>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dialog = ref(true);
</script>
