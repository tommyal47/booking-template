<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-row align:center justify="center" dense>
                <v-col cols="12" md="6">
                    <v-card class="mx-auto" width="400" prepend-icon="" title="User data"
                        :subtitle="$t('ID') + ': ' + role.id">
                        <v-card-item>
                            {{ $t('En_Name') }}: {{ role.en_name }}
                        </v-card-item>
                        <v-card-item>
                            {{ $t('Ar_Name') }}: {{ role.ar_name }}
                        </v-card-item>
                        <template v-slot:actions>
                            <v-btn class="ms-auto" :text="$t('Close')" @click="$emit('handleCloseDialog')"></v-btn>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const dialog = ref(true)

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    role: {
        type: Object,
        required: true
    }
})

defineEmits(['handleCloseDialog'])
</script>