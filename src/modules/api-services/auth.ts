import API from '../core/api-methods';

async function login(email: string, password: string) {
    return API.post('login', { email, password }) as Promise<ProfileApiResult>;
}

async function register(name: string, email: string, password: string, passwordConfirmation: string) {
    return API.post('register', { name, email, password, password_confirmation: passwordConfirmation });
}

async function profile() {
    return API.get('profile') as Promise<ProfileApiResult>;
}

async function logout() {
    return API.post('logout');
}

export { login, register, profile, logout };
