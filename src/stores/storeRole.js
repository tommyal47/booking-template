import { defineStore } from "pinia";

export const useRoleStore = defineStore('storeRole', {
    state: () => {
        return{
            roles: [
                {
                    id: 1,
                    en_name: 'admin',
                    ar_name: 'مدير'
                }
            ]
        }
    },
})