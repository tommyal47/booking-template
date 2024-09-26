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
    actions: {
        addRole(role){
            role = {
                id: Date.now(),
                en_name: role.en_name,
                ar_name: role.ar_name
            }
            if (role){
                this.roles.push(role)
            }
        },
        deleteRole (id) {
            this.roles = this.roles.filter(role => role.id!== id)
  
        }
    },
})