<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent width="auto">
            <v-card max-width="400" prepend-icon="mdi-update"
                text="Your application will relaunch automatically after the update is complete."
                title="Update in progress">
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Ok" @click="$emit('handleCloseDialog')"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';


const dialog = ref(true);
const emit = defineEmits(['handleCloseDialog'])
</script>