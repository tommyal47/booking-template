import { defineStore } from "pinia";
// import { useRoleStore } from "./storeRole";
export const useAdminStore = defineStore('storeAdmin',{
    state: () => {
        return {
            admins: [
                {
                    id: 1,
                    fullName: 'admin',
                    email: 'admin@admin.com',
                    phoneNumber: '12345214785',
                    role: 'admin',
                    password: '12345'
                },
                {
                    id: 1,
                    fullName: 'tester',
                    email: 'tester@admin.com',
                    phoneNumber: '12345214785',
                    role: 'tester',
                    password: '123456'
                }
            ],
        }
    },
    actions: {
        addAdmin(admin) {
            admin = {
                id: Date.now(),
                fullName: admin.fullName,
                email: admin.email,
                phoneNumber: admin.phoneNumber,
                role: admin.role
            }
            if (admin){
                this.admins.push(admin)
            }
        },
        editAdmin(admin) {
            const index = this.admins.findIndex((a) => a.id === admin.id)
            this.admins[index].fullName = admin.fullName
            this.admins[index].email = admin.email
            this.admins[index].phoneNumber = admin.phoneNumber
            this.admins[index].role = admin.role
        },
        deleteAdmin(id) {
            this.admins = this.admins.filter(admin => admin.id !== id);
        },
        getAdminData (adminName){
            const adminData = this.admins.filter(admin => admin.fullName === adminName)
            return adminData
        }
    }
})