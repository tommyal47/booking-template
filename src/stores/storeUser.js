import { defineStore } from 'pinia'

export const useUserStore = defineStore('storeUser', {
  state: () => {
    return {
      users: [
        {
          id: 1,
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
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
    },
    editUSer (user) {
      const index = this.users.findIndex((u) => u.id === user.id)
      this.users[index].fullName = user.fullName
      this.users[index].email = user.email
      this.users[index].phoneNumber = user.phoneNumber
    },

    deleteUser(id) {
      this.users = this.users.filter(user => user.id !== id)
    }
  },
  
})
