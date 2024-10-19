<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-card class="mx-auto" width="400" prepend-icon="" :title="$t('AddPermision')">
                <v-sheet class="mx-auto" width="300">
                    <v-form fast-fail @submit.prevent="addPermision">
                        <v-text-field v-model="permision.en_name" clearable :rules="[EnRules]" :label="$t('En_Name')"
                            variant="solo"></v-text-field>

                        <v-text-field v-model="permision.ar_name" clearable :rules="[ArRules]" :label="$t('Ar_Name')"
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
import { usePermisionStore } from '@/stores/storePermisions';
import { useI18n } from 'vue-i18n';

const storePermision = usePermisionStore()
const permision = ref({})
const { t } = useI18n();



const dialog = ref(true);

const addPermision = () => {
    if (permision.value.en_name && permision.value.ar_name) {
        storePermision.addPermision(permision.value)
        emit('handleAddDialog')
    }
}

const emit = defineEmits(['handleAddDialog'])
const englishRegex = /^[A-Za-z\s]*$/;
const EnRules = computed(() => {
    if (permision.value.en_name) {
        if (englishRegex.test(permision.value.en_name)){
            return true
        }
        return t('errors.En_letters')
    }

    return t('errors.En_name')
})
const arabicRegex = /^[\u0600-\u06FF\s]*$/;
const ArRules = computed(() => {
    if (permision.value.ar_name) {
        if (arabicRegex.test(permision.value.ar_name)) {

            return true
        }
        return t('errors.Ar_letters')
    }

    return t('errors.Ar_name')
})



</script>