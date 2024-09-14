import { defineStore } from 'pinia'

export const useUserStore = defineStore('storeUser', {
  state: () => {
    return {
      users: [],
    }
  },
  actions: {
    addUser (user){
      user = {
        id: Date.now(),
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
      if (user) {
        this.users.push(user)
        console.log(user);
        
      }
    }
  }
  
})
