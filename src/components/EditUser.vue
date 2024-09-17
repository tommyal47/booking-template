<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialog" persistent>
            <v-card class="mx-auto" width="400" prepend-icon="" title="Edit User Data">
                <v-sheet class="mx-auto" width="300">
                    <v-form fast-fail @submit.prevent>
                        <v-text-field v-model="user.fullName" clearable label="Full name" variant="solo"
                            rules="[nameValidation]"></v-text-field>

                        <v-text-field v-model="user.email" clearable label="Email Address" type="email"
                            placeholder="johndoe@gmail.com" variant="solo" rules="[emailRules]"></v-text-field>

                        <v-text-field v-model="user.phoneNumber" clearable label="Phone Number" type="number"
                            variant="solo" rules="[phoneRules]"></v-text-field>

                        <v-btn class="mt-2" type="submit" @click="$emit('handleEditDialog')" block>Submit</v-btn>
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

import { ref, defineEmits, defineProps } from 'vue';

const dialog = ref(true);

const emit = defineEmits(['handleEditDialog'])

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

console.log(props.user);



</script>