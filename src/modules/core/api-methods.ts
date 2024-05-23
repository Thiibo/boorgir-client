import { currentLocale } from "./localization";
import { ValidationError } from "./validation-error";

const API_URL = "https://api.test/api";

type RequestBody = AnyKeyValueObject | File;
type CacheOption = 'default' | 'no-cache';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function request(endpoint: string, cacheOption?: CacheOption, queryParams: StringKeyValueObject = {}, httpMethod: HttpMethod = 'GET', body?: RequestBody) {
    const searchParams = createSearchParams({...queryParams, lang: currentLocale.value});
    const fetchUrl = `${API_URL}/${endpoint}?${searchParams}`;
    const fetchOptions = createFetchOptions(httpMethod, body, cacheOption);

    return fetch(fetchUrl, fetchOptions).then(handleRequestSuccess).catch(handleRequestFetchError);
}

async function handleRequestSuccess(res: Response) {
    const contentType = res.headers.get('Content-Type');

    if (contentType?.startsWith('image/')) {
        return res.blob();

    } else if (contentType === 'application/json') {
        const json = await res.json() as AnyKeyValueObject;
        if ('errors' in json) throw new ValidationError(json.errors);
        return json;

    } else {
        return res.text();

    }
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

function createFetchOptions(httpMethod: HttpMethod, body?: RequestBody, cacheOption: CacheOption = 'default'): Object {
    let fetchBody: BodyInit;
    const fetchHeaders: StringKeyValueObject = { 'Accept': 'application/json' };

    if (body instanceof File) {
        fetchBody = new FormData();
        fetchBody.append('file', body);
    } else {
        fetchBody = JSON.stringify(body);
        fetchHeaders['Content-Type'] = 'application/json; charset=utf-8';
    }

    return {
        method: httpMethod,
        credentials: "include",
        headers: fetchHeaders,
        cache: cacheOption,
        body: fetchBody
    };
}

async function get(endpoint: string, queryParams: StringKeyValueObject = {}, cacheOption?: CacheOption) {
    return request(endpoint, cacheOption, queryParams);
}

async function post(endpoint: string, body?: RequestBody, cacheOption?: CacheOption) {
    return request(endpoint, cacheOption, {}, 'POST', body);
}

async function put(endpoint: string, body: RequestBody, cacheOption?: CacheOption) {
    return request(endpoint, cacheOption, {}, 'PUT', body);
}

async function del(endpoint: string, cacheOption?: CacheOption) {
    return request(endpoint, cacheOption, {}, 'DELETE');
}

export default { get, post, put, del };
