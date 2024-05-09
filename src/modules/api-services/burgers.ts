import API from '../core/api-methods';

async function getAll(perPage: number, page: number) {
    return API.get('burgers', { per_page: perPage.toString(), page: page.toString() }) as Promise<PaginatedApiResult>;
}

async function getAllAdmin(perPage: number, page: number) {
    return API.get('admin/burgers', { per_page: perPage.toString(), page: page.toString() }) as Promise<PaginatedApiResult>;
}

export { getAll, getAllAdmin };
