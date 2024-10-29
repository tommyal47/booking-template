// const role = JSON.parse(localStorage.getItem('role'));
// console.log(role[0]);

export default {
    can(role, resource, action) {
        return role[0] && role[0][resource]?.includes(action);
      },

}