import { ref } from 'vue'

export function useLoggedIn() {
    let logged = ref(false)

    return {
        logged,
        toggleLogin() {
            logged.value =!logged.value
        }
    }
}