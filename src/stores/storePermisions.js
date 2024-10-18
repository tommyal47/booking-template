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
    },
    actions: {
        addPermision(permision){
            permision = {
                id: Date.now(),
                en_name: permision.en_name,
                ar_name: permision.ar_name
            }
            if (permision) {
                this.permissions.push(permision)
            }

        }
    }
})