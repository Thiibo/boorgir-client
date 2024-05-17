import { computed, ref } from 'vue';
import API from '../core/api-methods';

const profileData = ref<ProfileApiResult | null>(null);
const isLoggedIn = computed(() => profileData.value !== null);

async function refreshProfile() {
    const profile = await API.get('profile') as ProfileApiResult;

    if (profile.email) {
        profileData.value = profile;
        return profile;
    }
}
await refreshProfile();

async function login(email: string, password: string) {
    const profile = await API.post('login', { email, password }) as ProfileApiResult;
    if (profile.email) profileData.value = profile;
    return profile;
}

async function register(name: string, email: string, password: string, passwordConfirmation: string) {
    return API.post('register', { name, email, password, password_confirmation: passwordConfirmation });
}

async function logout() {
    const res = await API.post('logout');
    profileData.value = null;
    return res;
}

export { profileData, isLoggedIn, login, register, logout };
