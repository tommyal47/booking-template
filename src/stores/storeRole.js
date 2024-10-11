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
        editRole (role) {
            const index = this.roles.findIndex((r) => r.id === role.id)
            this.roles[index].en_name = role.en_name
            this.roles[index].ar_name = role.ar_name
        },
        deleteRole (id) {
            this.roles = this.roles.filter(role => role.id!== id)
  
        }
    },
    getters: {
        allRoles(state) {
            let all = state.roles.forEach((r) => r.en_name)
            return all
        }
    }
})