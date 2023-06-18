export interface IComponentsSlice {
  sheet: {
    appSetting: boolean;
  };
  drawer: {
    deleteDepartmentDrawer: boolean;
  };
}

export interface IDepartmentSlice {
  data: {
    list: any[];
    page: number;
    limit: number;
    has_more: boolean;
    search_text: string;
  };
  add: {
    name: string;
  };
  edit: {
    name: string;
  };
}
export interface IAuthSlice {
  action: 'login' | 'register' | 'forget_password';
  login: {
      phone: string,
      password: string,
      step: number,
      show_password: boolean,
  },
  register: {
      phone: string,
      name: string,
      password: string,
      step: number,
      show_password: boolean,
      enable_password_button: boolean,
      code :string,
  },
  forget_password: {
      step: number,
      code: string,
      password: string,
      show_password: boolean,
  }
}

export interface IThemeSlice {
  mode: 'light' | 'dark'
}