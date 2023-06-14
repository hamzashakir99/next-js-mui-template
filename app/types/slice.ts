export interface IComponentsSlice {
    sheet: {
        appSetting: boolean;
    },
    drawer: {
        deleteDepartmentDrawer: boolean;
    }
}

export interface IDepartmentSlice {
    data: {
        list: any[];
        page: number;
        limit: number;
        has_more: boolean;
        search_text: string
    },
    add: {
        name: string;
    },
    edit: {
        name: string;
    }
}