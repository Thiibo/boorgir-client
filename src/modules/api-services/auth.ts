import { ref } from 'vue';
import API from '../core/api-methods';

const profileData = ref<ProfileApiResult | null>(null);

async function login(email: string, password: string) {
    const profile = await API.post('login', { email, password }) as ProfileApiResult;
    profileData.value = profile;
    return profile;
}

async function register(name: string, email: string, password: string, passwordConfirmation: string) {
    return API.post('register', { name, email, password, password_confirmation: passwordConfirmation });
}

async function profile() {
    if (profileData.value) {
        return profileData.value;
    } else {
        const profile = await API.get('profile') as ProfileApiResult;
        profileData.value = profile;
        return profile;
    }
}

async function logout() {
    const res = await API.post('logout');
    profileData.value = null;
    return res;
}

export { login, register, profile, logout };
