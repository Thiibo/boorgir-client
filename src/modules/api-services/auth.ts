import API from '../core/api-methods';

async function login(email: string, password: string) {
    return API.post('login', { email, password }) as Promise<ProfileApiResult>;
}

async function register(name: string, email: string, password: string, passwordConfirmation: string) {
    return API.post('register', { name, email, password, password_confirmation: passwordConfirmation });
}

export { login, register };
