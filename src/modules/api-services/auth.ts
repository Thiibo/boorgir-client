import API from '../core/api-methods';

async function login(email: string, password: string) {
    return API.post('login', { email, password });
}

export { login };
