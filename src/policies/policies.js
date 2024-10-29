// const role = JSON.parse(localStorage.getItem('role'));
// console.log(role[0]);
const role = JSON.parse(localStorage.getItem('role'));
export default {
    can(resource, action) {
        // console.log("Role:", role);
        // console.log("Resource:", resource);
        // console.log("Action:", action);
        // console.log("Roles Data:", role);
        // console.log("Resource Data:", role?.[resource]);
        // console.log(role[resource]?.includes(action));
        
        return role[0]['permisions'] && role[0]['permisions'][resource]?.includes(action);
      },

}