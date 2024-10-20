<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-card class="mx-auto" width="400" prepend-icon="" title="Edit Role">
                <v-sheet class="mx-auto" width="300">
                    <v-form fast-fail @submit.prevent="updatePermision">
                        <v-text-field v-model="permision.en_name" clearable :rules="[EnRules]" :label="$t('En_Name')"
                            variant="solo"></v-text-field>

                        <v-text-field v-model="permision.ar_name" clearable :rules="[ArRules]" :label="$t('Ar_Name')"
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
import { usePermisionStore } from '@/stores/storePermisions';
import { useI18n } from 'vue-i18n';
import Swal from 'sweetalert2';

const storePermision = usePermisionStore()
const { t } = useI18n();
const emit = defineEmits(['handleEditDialog'])
const props = defineProps({
    permision: {
        type: Object,
        required: true
    }
})
// const roleData = JSON.parse(JSON.stringify(props.role));
const dialog = ref(true);

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});


const updatePermision = () => {
    if (props.permision.en_name && props.permision.ar_name) {
        storePermision.editPermision(props.permision)
        emit('handleEditDialog')
        Toast.fire({
            icon: 'success',
            title: t('SucessEditPermision')
        })
    }
}

const englishRegex = /^[A-Za-z\s]*$/;
const EnRules = computed(() => {
    if (props.permision.en_name) {
        if (englishRegex.test(props.permision.en_name)) {
            return true
        }
        return t('errors.En_letters')
    }

    return t('errors.En_name')
})
const arabicRegex = /^[\u0600-\u06FF\s]*$/;
const ArRules = computed(() => {
    if (props.permision.ar_name) {
        if (arabicRegex.test(props.permision.ar_name)) {
            // console.log(arabicRegex.test(props.role.ar_name));

            return true
        }
        // console.log(arabicRegex.test(props.role.ar_name));
        return t('errors.Ar_letters')
    }

    return t('errors.Ar_name')
})



</script>