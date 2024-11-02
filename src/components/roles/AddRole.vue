<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/valid-v-for -->
<template>
    <v-dialog v-model="dialog" persistent>
        <v-card class="mx-auto" width="500" prepend-icon="" :title="$t('AddRole')">
            <v-sheet class="mx-auto" width="500">
                <v-stepper v-model="step">
                    <v-stepper-header>
                        <v-stepper-item :title="$t('RoleInfo')" value="1">
                        </v-stepper-item>
                        <v-stepper-item :title="$t('PermisionsInfo')" value="2">
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
                            <v-container fluid>
                                <v-row v-for="(m, index) in storeRole.modules">
                                    <div>{{ m }}</div>
                                    <v-col cols="12" md="3" sm="4" v-for="permision in storePermision.permisions">
                                        <v-checkbox color="info" :label="permision.en_name" :value="permision.en_name"
                                            :checked="role.permisions[m]?.includes(permision.en_name)"
                                            @change="(e) => changePermision(m, permision.en_name, e)" hide-details>
                                        </v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-stepper-window-item>
                    </v-stepper-window>
                    <v-stepper-actions :disabled="disabled" :prev-text="$t('Prev')" :next-text="N" @click:next="next"
                        @click:prev="prev"></v-stepper-actions>
                </v-stepper>
            </v-sheet>
        </v-card>
    </v-dialog>
</template>
<script setup>

import { ref, defineEmits, computed } from 'vue';
import { useRoleStore } from '@/stores/storeRole';
import { usePermisionStore } from '@/stores/storePermisions';
import { useI18n } from 'vue-i18n';
const storeRole = useRoleStore()
const storePermision = usePermisionStore()

const role = ref({
    permisions: {
    }
})
const disabled = computed(() => step.value === 0 ? 'prev' : false)
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

const changePermision = (key, permisions, event) => {
    if (permisions) {
        if (!Array.isArray(role.value.permisions[key])) {
            role.value.permisions[key] = []; // Initialize it as an empty array if it doesn't exist
        }
        if (event) {
            // Add the permission if it's checked
            if (!role.value.permisions[key].includes(permisions)) {
                role.value.permisions[key].push(permisions);
            }
            else {
                // Remove the permission if it's unchecked
                const permIndex = role.value.permisions[key].indexOf(permisions);
                if (permIndex > -1) {
                    role.value.permisions[key].splice(permIndex, 1);
                }
            }
        }

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
        if (Object.keys(role.value.permisions).length > 0) {
            addRole()
            Toast.fire({
                icon: "success",
                title: t('SucessAddAdmin')
            });
        } else {
            Toast.fire({
                icon: "error",
                title: t('errors.rolepermisions')
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