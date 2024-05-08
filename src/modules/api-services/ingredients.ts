import API from '../core/api-methods';

async function getAll(perPage: number, page: number) {
    return API.get('ingredients', { per_page: perPage.toString(), page: page.toString() }) as Promise<PaginatedApiResult>;
}

export { getAll };
