import { defineStore } from "pinia";

export const usePermisionStore = defineStore('storePermisions',{
    state: () => {
        return {
            permissions: [
                {
                    id: 1,
                    en_name: 'view admin',
                    ar_name: 'عرض الادمن'
                },
                {
                    id: 2,
                    en_name: 'edit admin',
                    ar_name: 'تعديل الادمن'
                },
                {
                    id: 3,
                    en_name: 'delete admin',
                    ar_name: 'حذف الادمن'
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