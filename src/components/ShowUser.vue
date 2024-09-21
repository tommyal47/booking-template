<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-row align:center justify="center" dense>
                <v-col cols="12" md="6">
                    <v-card class="mx-auto" width="400" prepend-icon="" title="User data"
                        :subtitle="$t('ID') + ': ' + props.user.id">
                        <v-card-item>
                            {{$t('Name')}}: {{ user.fullName }}
                        </v-card-item>
                        <v-card-item>
                            {{$t('Email')}}: {{ user.email }}
                        </v-card-item>
                        <v-card-item>
                            {{$t('Phone')}}: {{ user.phoneNumber }}
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
    user: {
        type: Object,
        Required: true,
    }
})
// console.log(props.user);

const dialog = ref(true);
defineEmits(['handleCloseDialog'])
</script>