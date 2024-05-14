import { currentLocale } from "./localization";
import { ValidationError } from "./validation-error";

const API_URL = "http://localhost:8000/api";

function request(endpoint: string, queryParams: StringKeyValueObject = {}, method: string = 'GET', body?: Object): Promise<Object> {
    const searchParams = createSearchParams({...queryParams, lang: currentLocale.value});
    const fetchUrl = `${API_URL}/${endpoint}?${searchParams}`;
    const fetchOptions = createFetchOptions(method, body);

    return fetch(fetchUrl, fetchOptions).then(handleRequestSuccess).catch(handleRequestFetchError);
}

async function handleRequestSuccess(res: Response) {
    const data = await res.text();
    if (data === '') return;

    const json = JSON.parse(data);
    if ('errors' in json) throw new ValidationError(json.errors);

    return json;
}

function handleRequestFetchError(err: Error) {
    // Ignore validation errors
    if (err instanceof ValidationError) throw err;

    // todo: show message on screen
    console.error("An API error occured");
}

function createSearchParams(queryParams: StringKeyValueObject): URLSearchParams {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
        searchParams.append(key, value);
    }

    return searchParams;
}

function createFetchOptions(httpMethod: string, body?: Object): Object {
    return {
        method: httpMethod,
        credentials: "include",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    };
}

async function get(endpoint: string, queryParams: StringKeyValueObject = {}) {
    return request(endpoint, queryParams)
}

async function post(endpoint: string, body?: Object) {
    return request(endpoint, {}, 'POST', body);
}

async function put(endpoint: string, body: Object) {
    return request(endpoint, {}, 'PUT', body);
}

async function del(endpoint: string) {
    return request(endpoint, {}, 'DELETE');
}

export default { get, post, put, del };
