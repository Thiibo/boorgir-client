import API from '../core/api-methods';

type ItemType = 'ingredients' | 'burgers';
class ItemService {
    private itemType: ItemType;
    private isAdmin: boolean;
    private get endpoint(): string {
        return (this.isAdmin ? 'admin/' : '') + this.itemType;
    }

    constructor(itemType: ItemType, isAdmin: boolean = false) {
        this.itemType = itemType;
        this.isAdmin = isAdmin;
    }

    public getItems(perPage: number, page: number) {
        const body = {
            per_page: perPage.toString(),
            page: page.toString()
        };

        return API.get(this.endpoint, body) as Promise<PaginatedApiResult>;
    }

    public getItemType(): ItemType {
        return this.itemType;
    }
}

export { ItemService, type ItemType };
