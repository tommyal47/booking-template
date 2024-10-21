import { defineStore } from "pinia";

export const usePermisionStore = defineStore('storePermisions',{
    state: () => {
        return {
            permisions: [
                {
                    id: 1,
                    en_name: 'view',
                    ar_name: 'عرض'
                },
                {
                    id: 2,
                    en_name: 'edit',
                    ar_name: 'تعديل'
                },
                {
                    id: 3,
                    en_name: 'delete',
                    ar_name: 'حذف'
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
                this.permisions.push(permision)
            }

        },
        editPermision(permision){
            const index = this.permisions.findIndex((p) => p.id === permision.id)
            this.permisions[index].en_name = permision.en_name
            this.permisions[index].ar_name = permision.ar_name

        },
        deletePermission(id){
            this.permisions = this.permisions.filter(permision => permision.id !== id)
        }
    }
})