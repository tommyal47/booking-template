<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-card class="mx-auto" width="400" prepend-icon="" title="Edit Role">
                <v-sheet class="mx-auto" width="300">
                    <v-form fast-fail @submit.prevent="updateRole">
                        <v-text-field v-model="role.en_name" clearable :rules="[EnRules]" :label="$t('En_Name')"
                            variant="solo"></v-text-field>

                        <v-text-field v-model="role.ar_name" clearable :rules="[ArRules]" :label="$t('Ar_Name')"
                            variant="solo"></v-text-field>

                        <v-btn class="mt-2" type="submit" block>{{ $t('Submit') }}</v-btn>
                        <v-btn class="mt-2" @click="$emit('handleEditDialog')" block>{{ $t('Cancel') }}</v-btn>
                    </v-form>
                </v-sheet>
            </v-card>
        </v-dialog>
    </div>
</template>


<script setup>

import { ref, defineEmits, computed } from 'vue';
import { useRoleStore } from '@/stores/storeRole';
import { useI18n } from 'vue-i18n';

const storeRole = useRoleStore()
const { t } = useI18n();
const emit = defineEmits(['handleEditDialog'])
const props = defineProps({
    role: {
        type: Object,
        required: true
    }
})
// const roleData = JSON.parse(JSON.stringify(props.role));
const dialog = ref(true);

const updateRole = () => {
    if (props.role.en_name && props.role.ar_name) {
        storeRole.editRole(props.role)
        emit('handleEditDialog')
    }
}

const englishRegex = /^[A-Za-z\s]*$/;
const EnRules = computed(() => {
    if (props.role.en_name) {
        if (englishRegex.test(props.role.en_name)) {
            return true
        }
        return t('errors.En_letters')
    }

    return t('errors.En_name')
})
const arabicRegex = /^[\u0600-\u06FF\s]*$/;
const ArRules = computed(() => {
    if (props.role.ar_name) {
        if (arabicRegex.test(props.role.ar_name)) {
            // console.log(arabicRegex.test(props.role.ar_name));

            return true
        }
        // console.log(arabicRegex.test(props.role.ar_name));
        return t('errors.Ar_letters')
    }

    return t('errors.Ar_name')
})



</script>