import { defineStore } from 'pinia'

export const useUserStore = defineStore('storeUser', {
  state: () => {
    return {
      users: [
        {
          id: 1,
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: '123-456-7890',
        }
      ],
    }
  },
  actions: {
    addUser (user){
      user = {
        id: Date.now(),
        fullName: user.fullName,
        email: user.emailAddress,
        phoneNumber: user.phoneNumber,
      }
      if (user) {
        this.users.push(user)
        console.log(user);
        
      }
    }
  },
  
})
