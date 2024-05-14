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

    public async getItems(perPage: number, page: number, query: string): Promise<GetItemsApiRequestData> {
        const body = this.createGetItemsBody(perPage, page, query);
        const requestData = await API.get(this.endpoint, body) as PaginatedApiResult;

        return {
            lastPage: requestData.last_page,
            data: this.transformGetItemsRequestData(requestData.data)
        };
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
                item[translatedColumnName] = item[columnName];
                if (translatedColumnName !== columnName) delete item[columnName];
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

    private translateColumnName(columnName: string): string {
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
