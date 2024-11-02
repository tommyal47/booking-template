<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-row align:center justify="center" dense>
                <v-col cols="12" md="6">
                    <v-card class="mx-auto" width="400" prepend-icon="" :title="$t('Permision')"
                        :subtitle="$t('ID') + ': ' + props.permision.id">
                        <v-card-item>
                            {{ $t('En_Name') }}: {{ permision.en_name }}
                        </v-card-item>
                        <v-card-item>
                            {{ $t('Ar_Name') }}: {{ permision.ar_name }}
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
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
    permision: {
        type: Object,
        Required: true,
    }
})

const dialog = ref(true);
defineEmits(['handleCloseDialog'])
</script>