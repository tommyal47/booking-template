<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-row align="center" justify="center" dense>
                <v-col cols="12" md="6">
                    <v-card class="mx-auto" width="400" prepend-icon="" title="User data"
                        :subtitle="'ID: ' + props.user.id">
                        <v-card-item>
                            Name: {{ props.user.fullName }}
                        </v-card-item>
                        <v-card-item>
                            Email: {{ props.user.email }}
                        </v-card-item>
                        <v-card-item>
                            Phone Number: {{ props.user.phoneNumber }}
                        </v-card-item>
                        <template v-slot:actions>
                            <v-btn class="ms-auto" text="Ok" @click="$emit('handleCloseDialog')"></v-btn>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        Required: true,
    }
})
console.log(props.user);

const dialog = ref(true);
const emit = defineEmits(['handleCloseDialog'])
</script>