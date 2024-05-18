import API from '../core/api-methods';
import { AVAILABLE_LOCALES, translate, type Locale, currentLocale } from '../core/localization';

type ItemBaseData = {
    id: number,
    price: number,
    translations?: {
        name: string,
        description: string,
        lang: Locale
    }[],
    name?: string,
    description?: string
}
type IngredientData = ItemBaseData & { vegetarian: boolean }
type BurgerData = ItemBaseData & { ingredients: IngredientData[] }
type ItemData = IngredientData | BurgerData

type GetItemsApiRequestData = {
    lastPage: number,
    data: ItemData[]
}

type GetItemsDataExtraColumnGenerators = {[untranslatedColumnName: string]: (item: ItemData) => any}

type ItemActionNameGenerator = (item: ItemData) => string
type ItemType = 'ingredients' | 'burgers'
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

    public async getItems(perPage: number, page: number, query: string): Promise<GetItemsApiRequestData> {
        const body = this.createGetItemsBody(perPage, page, query);
        const requestData = await API.get(this.endpoint, body) as PaginatedApiResult<ItemData>;

        return {
            lastPage: requestData.last_page,
            data: requestData.data
        };
    }

    public getExtraTableColumns(item: ItemData): AnyKeyValueObject {
        let res = this.createGeneratorColumns(item);
        if (this.isAdmin) Object.assign(res, this.createTranslationColumns(item));
        return res;
    }

    public async getItem(id: number) {
        return API.get(`${this.endpoint}/${id}`) as Promise<ItemData>;
    }

    public getBlankItem(): ItemData {
        const translations = Object.keys(AVAILABLE_LOCALES).map(locale => ({ name: '', description: '', lang: locale as Locale }));
        const itemBase: ItemBaseData = {
            id: -1,
            price: 0,
            translations: translations
        }

        let item: ItemData;
        if (this.itemType === 'ingredients') {
            item = {...itemBase, vegetarian: false };
        } else {
            item = { ...itemBase, ingredients: [] };
        }

        return item;
    }

    public updateItem(id: number, data: ItemData) {
        return API.put(`${this.endpoint}/${id}`, data);
    }

    public createItem(data: ItemData) {
        return API.post(this.endpoint, data);
    }

    public deleteItem(id: number) {
        return API.del(`${this.endpoint}/${id}`);
    }

    public getThumbnail(id: number) {
        return API.get(`${this.itemType}/${id}/thumbnail`, {}, 'no-cache') as Promise<Blob>;
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

    public translateColumnName(columnName: string): string {
        return translate(`general.itemselection.column.${this.itemType}.${columnName}`);
    }

    private createTranslationColumns(item: ItemData): AnyKeyValueObject {
        const extraColumns: AnyKeyValueObject = {};
        const translations = item['translations'] as Record<string, any>[];
        translations.forEach(translationData => {
            const localeName = AVAILABLE_LOCALES[translationData.lang as Locale].name

            for (const [columnName, localeColumnData] of Object.entries(translationData)) {
                if (columnName === 'lang') break;
                const translatedLocaleColumnName = this.translateColumnName(columnName);
                extraColumns[`${translatedLocaleColumnName} (${localeName})`] = localeColumnData;
            }
        });
        return extraColumns;
    }

    private createGeneratorColumns(item: ItemData): AnyKeyValueObject {
        const extraColumns: AnyKeyValueObject = {};
        for (let [untranslatedColumnName, generator] of Object.entries(this.extraColumnGenerators)) {
            const columnName = translate(untranslatedColumnName);
            extraColumns[columnName] = generator(item);
        }
        return extraColumns;
    }
    // ======================
}

function getItemTranslatedProperties(item: ItemData, lang: Locale = currentLocale.value) {
    return item.translations?.find(translation => translation.lang === lang);
}

export { ItemService, type ItemActionNameGenerator, type ItemType, type IngredientData, type BurgerData, type ItemData, getItemTranslatedProperties };
