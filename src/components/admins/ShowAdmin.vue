<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-row align:center justify="center" dense>
                <v-col cols="12" md="6">
                    <v-card class="mx-auto" width="400" prepend-icon="" :title="$t('AdminInfo')"
                        :subtitle="$t('ID') + ': ' + props.admin.id">
                        <v-card-item>
                            {{$t('Name')}}: {{ admin.fullName }}
                        </v-card-item>
                        <v-card-item>
                            {{$t('Email')}}: {{ admin.email }}
                        </v-card-item>
                        <v-card-item>
                            {{$t('Phone')}}: {{ admin.phoneNumber }}
                        </v-card-item>
                        <v-card-item>
                            {{$t('Role')}}: {{ admin.role }}
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
    admin: {
        type: Object,
        Required: true,
    }
})

const dialog = ref(true);
defineEmits(['handleCloseDialog'])
</script>