import API from '../core/api-methods';
import { AVAILABLE_LOCALES, translate, type Locale } from '../core/localization';

type GetItemsApiRequestData = {
    lastPage: number,
    data: StringKeyValueObject[]
}

type GetItemsDataExtraColumnGenerators = {[untranslatedColumnName: string]: (rowId: number) => any}

type ItemType = 'ingredients' | 'burgers';
class ItemService {
    private itemType: ItemType;
    private isAdmin: boolean;
    private extraColumnGenerators: GetItemsDataExtraColumnGenerators;
    private get endpoint(): string {
        return (this.isAdmin ? 'admin/' : '') + this.itemType;
    }

    constructor(itemType: ItemType, isAdmin: boolean, extraColumnGenerators: GetItemsDataExtraColumnGenerators = {}) {
        this.itemType = itemType;
        this.isAdmin = isAdmin;
        this.extraColumnGenerators = extraColumnGenerators;
    }

    public getItemType(): ItemType {
        return this.itemType;
    }

    public getActionName(): string {
        return translate(`${this.isAdmin ? 'backoffice' : 'front'}.itemselection.action.item`);
    }

    public async getItems(perPage: number, page: number, query: string): Promise<GetItemsApiRequestData> {
        const body = this.createGetItemsBody(perPage, page, query);
        const requestData = await API.get(this.endpoint, body) as PaginatedApiResult;

        return {
            lastPage: requestData.last_page,
            data: this.transformGetItemsRequestData(requestData.data)
        };
    }

    public async getItem(id: number) {
        return API.get(`${this.endpoint}/${id}`) as Promise<StringKeyValueObject>;
    }

    public getBlankItem() {
        const translations = Object.keys(AVAILABLE_LOCALES).map(locale => ({ name: '', description: '', lang: locale }));
        const item: {[key: string]: any} = {
            vegetarian: false,
            price: 0,
            translations: translations
        }

        if (this.itemType === 'burgers') {
            delete item['vegetarian'];
        }

        return item;
    }

    public updateItem(id: number, data: Object) {
        return API.put(`${this.endpoint}/${id}`, data);
    }

    public createItem(data: Object) {
        return API.post(this.endpoint, data);
    }

    public deleteItem(id: number) {
        return API.del(`${this.endpoint}/${id}`);
    }

    public getThumbnail(id: number) {
        return API.get(`${this.itemType}/${id}/thumbnail`) as Promise<Blob>;
    }

    public uploadThumbnail(id: number, file: File) {
        return API.post(`${this.endpoint}/${id}/thumbnail`, file);
    }

    // === Helper methods ===
    private createGetItemsBody(perPage: number, page: number, query: string): StringKeyValueObject {
        const body: StringKeyValueObject = {
            per_page: perPage.toString(),
            page: page.toString()
        };
        if (query.length > 0) body["query"] = query;

        return body;
    }

    private transformGetItemsRequestData(data: StringKeyValueObject[]): StringKeyValueObject[] {
        data.forEach((item) => this.transformAllColumns(item));
        this.addExtraColumns(data);
        return data;
    }

    private transformAllColumns(item: {[key: string]: any}): void {
        const columnNames = Object.keys(item);
        for (const columnName of columnNames) {
            if (columnName === 'translations') {
                this.transformTranslationsColumn(item);
            } else {
                const translatedColumnName = this.translateColumnName(columnName);
                const columnValue = item[columnName];
                delete item[columnName];
                item[translatedColumnName] = columnValue;
            }
        }
    }

    private transformTranslationsColumn(item: {[key: string]: any}): void {
        const translations = item['translations'] as Record<string, any>[];
        translations.forEach(translationData => {
            const localeName = AVAILABLE_LOCALES[translationData.lang as Locale].name

            for (const [columnName, localeColumnData] of Object.entries(translationData)) {
                if (columnName === 'lang') break;
                const translatedLocaleColumnName = this.translateColumnName(columnName);
                item[`${translatedLocaleColumnName} (${localeName})`] = localeColumnData;
            }
        });
        
        delete item['translations'];
    }

    public translateColumnName(columnName: string): string {
        return translate(`general.itemselection.column.${this.itemType}.${columnName}`);
    }

    private addExtraColumns(data: StringKeyValueObject[]): void {
        for (let [untranslatedColumnName, generator] of Object.entries(this.extraColumnGenerators)) {
            data.forEach(item => {
                const columnName = translate(untranslatedColumnName);
                item[columnName] = generator(parseInt(item.ID));
            });
        }
    }
    // ======================
}

export { ItemService, type ItemType };
