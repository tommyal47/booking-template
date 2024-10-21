<template>
    <v-dialog v-model="dialog" persistent>
        <v-card class="mx-auto" width="500" prepend-icon="" title="Add Role">
            <v-sheet class="mx-auto" width="500">
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-item title="Role Info" value="1">
                        </v-stepper-item>
                        <v-stepper-item title="Permisions Info" value="2">
                        </v-stepper-item>
                    </v-stepper-header>
                    <v-stepper-window>
                        <v-stepper-window-item step="1" value="1">
                            <v-text-field v-model="role.en_name" clearable :rules="[EnRules]" :label="$t('En_Name')"
                                variant="solo"></v-text-field>
                            <v-text-field v-model="role.ar_name" clearable :rules="[ArRules]" :label="$t('Ar_Name')"
                                variant="solo"></v-text-field>
                        </v-stepper-window-item>
                        <v-stepper-window-item step="2" value="2">

                        </v-stepper-window-item>
                    </v-stepper-window>
                    <v-stepper-actions :disabled="disabled" :prev-text="$t('Prev')" :next-text="N" @click:next="next"
                        @click:prev="prev"></v-stepper-actions>
                </v-stepper>
            </v-sheet>
        </v-card>
    </v-dialog>
</template>








<!-- <template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-card class="mx-auto" width="400" prepend-icon="" :title="$t('AddRole')">
                <v-sheet class="mx-auto" width="300">
                    <v-form fast-fail @submit.prevent="addRole">
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
</template> -->


<script setup>

import { ref, defineEmits, computed } from 'vue';
import { useRoleStore } from '@/stores/storeRole';
import { useI18n } from 'vue-i18n';

const storeRole = useRoleStore()
const role = ref({})
const { t } = useI18n();
import Swal from 'sweetalert2';

const step = ref(0)
let N = t('Next')

const dialog = ref(true);

const addRole = () => {
    if (role.value.en_name && role.value.ar_name) {
        storeRole.addRole(role.value)
        emit('handleAddDialog')
    }
}

const emit = defineEmits(['handleAddDialog'])
const englishRegex = /^[A-Za-z\s]*$/;
const EnRules = computed(() => {
    if (role.value.en_name) {
        if (englishRegex.test(role.value.en_name)) {
            return true
        }
        return t('errors.En_letters')
    }

    return t('errors.En_name')
})
const arabicRegex = /^[\u0600-\u06FF\s]*$/;
const ArRules = computed(() => {
    if (role.value.ar_name) {
        if (arabicRegex.test(role.value.ar_name)) {

            return true
        }
        return t('errors.Ar_letters')
    }

    return t('errors.Ar_name')
})
///////////////////////////////////////////////////

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


const next = () => {
    if (step.value === 0) {
        if (role.value.ar_name && role.value.ar_name) {
            step.value++;
            N = t('Submit')
            return true;


        }
        if (!role.value.ar_name || !role.value.ar_name) {
            Toast.fire({
                icon: "error",
                title: t('errors.requiredfields')
            });
        }
    }
    if (step.value === 1) {
        if (role.value.permisions) {
            addRole()
            Toast.fire({
          icon: "success",
          title: t('SucessAddAdmin')
        });
        } else {
            Toast.fire({
                icon: "error",
                title: t('errors.requiredfields')
            });
        }
    }

}
const prev = () => {
    if (step.value >= 1) {
        N = t('Next')
        step.value--;
    }
};


///////////////////////////////////////////////////


</script>