<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-card class="mx-auto" width="400" prepend-icon="" title="Add Role">
                <v-sheet class="mx-auto" width="300">
                    <v-form fast-fail @submit.prevent>
                        <v-text-field v-model="role.en_name" clearable :rules="[EnRules]" :label="$t('En_Name')"
                            variant="solo"></v-text-field>

                        <v-text-field v-model="role.ar_name" clearable :rules="[ArRules]" :label="$t('Ar_Name')"
                            variant="solo"></v-text-field>

                        <v-btn class="mt-2" type="submit" block>{{ $t('Submit') }}</v-btn>
                        <v-btn class="mt-2" @click="$emit('handleAddDialog')" block>{{ $t('Cancel') }}</v-btn>
                    </v-form>
                </v-sheet>
            </v-card>
        </v-dialog>
    </div>
</template>


<script setup>

import { ref, defineEmits, computed } from 'vue';

import { useI18n } from 'vue-i18n';

const role = ref({})
const { t } = useI18n();



const dialog = ref(true);

// eslint-disable-next-line no-unused-vars
const emit = defineEmits(['handleAddDialog'])

const EnRules = computed(() => {
    if (role.value.en_name) return true

    return t('errors.En_name')
})
const ArRules = computed(() => {
    if (role.value.ar_name) return true

    return t('errors.Ar_name')
})



</script>