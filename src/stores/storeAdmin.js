import { defineStore } from "pinia";

export const useAdminStore = defineStore('storeAdmin',{
    state: () => {
        return {
            admins: [
                {
                    id: 1,
                    fullName: 'admin',
                    email: 'admin@admin.com',
                    phoneNumber: '12345214785',
                    role: 'super admin'
                }
            ],
        }
    }
})