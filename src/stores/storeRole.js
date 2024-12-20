import { defineStore } from "pinia";

export const useRoleStore = defineStore('storeRole', {
    state: () => {
        return{
            modules: ['user', 'admin', 'role', 'permisions'],
            roles: [
                {
                    id: 1,
                    en_name: 'admin',
                    ar_name: 'مدير',
                    permisions: {
                        user: ['add','edit','delete','access'],
                        admin: ['add','edit','delete','access'],
                        role: ['add','edit','delete','access'],
                        permisions: ['add','edit','delete','access']
                    }
                },
                {
                    id: 2,
                    en_name: 'tester',
                    ar_name: 'مختبر',
                    permisions: {
                        user: ['edit','delete'],
                        admin: ['access'],
                        role: ['add','edit','access'],
                        permisions: ['add','access']
                    }
                },
                {
                    id: 3,
                    en_name: 'vesitor',
                    ar_name: 'زائر',
                    permisions: {
                        user: ['access'],
                        admin: ['access'],
                        role: ['access'],
                        permisions: ['access']
                    }
                },
            ]
        }
    },
    actions: {
        addRole(role){
            role = {
                id: Date.now(),
                en_name: role.en_name,
                ar_name: role.ar_name,
                permisions: {
                    user: role.permisions.user,
                    admin: role.permisions.admin,
                    role: role.permisions.role,
                    permisions: role.permisions.permisions
                }
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
  
        },
        getRoleData(name) {
            const role = this.roles.filter(r => r.en_name === name)
            return role
        }
    },
})