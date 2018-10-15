import { InjectionToken } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

export interface ISelectModel {
    id: string;
    name: string;
    category?: string;
}

export class SelectModelManager {
    private _values: ISelectModel[] = [];
    private _selectedId: string | null;

    constructor() {
        this.setSelectedId(null);
    }

    get selectedValue(): ISelectModel | null {
        return this.hasSelectedItem ? this.findValue(this.getSelectedId()!) : null;
    }

    getValues(): ISelectModel[] {
        return this._values;
    }

    setValues(values: ISelectModel[]) {
        this._values = values;
    }

    clearValues() {
        this.setValues([]);
    }

    getSelectedId(): string | null {
        return this._selectedId;
    }

    setSelectedId(id: string | null): boolean {
        if (!id || this.findValue(id)) {
            this._selectedId = id;
            return true;
        }
        return false;
    }

    get hasSelectedItem(): boolean {
        return this.getSelectedId() !== null;
    }

    findValue(id: string): ISelectModel | null {
        return this.getValues().find(s => s.id === id) || null;
    }
}


export function reorderForCategories(array: ISelectModel[]): ISelectModel[] {
    const categoriesArray = _(array).map(x => x.category).uniq().compact().value();
    const categories = new Set<string>(categoriesArray);

    const categoriesMap = new Map<string, ISelectModel[]>();
    const categoriesFathers = new Map<string, ISelectModel>();
    const emptyGroup: ISelectModel[] = [];

    _.forEach(array, m => {
        if (categories.has(m.id))
            categoriesFathers.set(m.id, m);
        else if (!m.category)
            emptyGroup.push(m);
        else {
            if (!categoriesMap.has(m.category))
                categoriesMap.set(m.category, []);

            categoriesMap.get(m.category)!.push(m);
        }
    });

    const ret = [...emptyGroup];

    categories.forEach(category => {
        ret.push(categoriesFathers.get(category)!);
        ret.push(...categoriesMap.get(category)!);
    });

    return ret;
}
