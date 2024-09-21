<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-card class="mx-auto" width="400" prepend-icon="" title="Edit User Data">
                <v-sheet class="mx-auto" width="300">
                    <v-form fast-fail @submit.prevent="updateUser">
                        <v-text-field v-model="userData.fullName" clearable :label="$t('Name')" variant="solo"
                            :rules="[nameValidation]"></v-text-field>

                        <v-text-field v-model="userData.email" clearable :label="$t('Email')" type="email"
                            placeholder="johndoe@gmail.com" variant="solo" :rules="[emailRules]"></v-text-field>

                        <v-text-field v-model="userData.phoneNumber" clearable :label="$t('Phone')" type="number"
                            variant="solo" :rules="[phoneRules]"></v-text-field>

                        <v-btn class="mt-2" type="submit" block>{{$t('Submit')}}</v-btn>
                        <v-btn class="mt-2" @click="$emit('handleEditDialog')" block>{{ $t('Cancel') }}</v-btn>
                    </v-form>
                </v-sheet>
                <!-- <template v-slot:actions>
                    <v-btn class="ms-auto" text="Ok" @click="$emit('handleEditDialog')"></v-btn>
                </template> -->
            </v-card>
        </v-dialog>
    </div>
</template>


<script setup>

import { ref, defineEmits, defineProps, computed } from 'vue';
import { useUserStore } from '@/stores/storeUser';

const userStore = useUserStore();

const dialog = ref(true);

const emit = defineEmits(['handleEditDialog'])

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})
const userData = JSON.parse(JSON.stringify(props.user));
// console.log('user', props.user);


const emailRules = computed(() => {
    if (props.user.email) return true

    return 'Email is required'
}
)
const nameValidation = computed(() => {
    if (props.user.fullName?.length >= 3) return true

    return 'Full name must be at least 3 characters.'
})


const phoneRules = computed(() => {
    if (props.user.phoneNumber?.length === 11) return true

    return 'Phone number must be 11 degits'
}
);
const updateUser = () => {
    userStore.editUSer(userData);
    emit('handleEditDialog')



}

// console.log(props.user);



</script>