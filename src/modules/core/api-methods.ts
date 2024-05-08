import { getLocale } from "./localization";

const API_URL = "http://localhost:8000/api";

async function request(endpoint: string, queryParams: StringKeyValueObject = {}, method: string = 'GET', body?: Object): Promise<string> {
    const searchParams = createSearchParams({...queryParams, lang: getLocale()});

    const result = await fetch(`${API_URL}/${endpoint}?${searchParams}`, {
        method: method,
        credentials: "include",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    });
    
    return await result.json();
}

function createSearchParams(queryParams: StringKeyValueObject): URLSearchParams {
    const searchParams = new URLSearchParams();
    for (let [key, value] of Object.entries(queryParams)) {
        searchParams.append(key, value);
    }

    return searchParams;
}

async function get(endpoint: string, queryParams: StringKeyValueObject = {}) {
    return request(endpoint, queryParams)
}

async function post(endpoint: string, body: Object) {
    return request(endpoint, {}, 'POST', body);
}

async function put(endpoint: string, body: Object) {
    return request(endpoint, {}, 'PUT', body);
}

async function del(endpoint: string) {
    return request(endpoint, {}, 'DELETE');
}

export default { get, post, put, del };
