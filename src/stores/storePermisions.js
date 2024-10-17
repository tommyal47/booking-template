import { defineStore } from "pinia";

export const usePermisionStore = defineStore('storePermisions',{
    state: () => {
        return {
            permissions: [
                {
                    id: 1,
                    en_name: 'view_admin_panel',
                    ar_name: 'Can view admin panel'
                },
                {
                    id: 2,
                    en_name: 'edit_users',
                    ar_name: 'Can edit users'
                }
            ]
        }
    }
})