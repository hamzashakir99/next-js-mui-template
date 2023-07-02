export interface IComponentsSlice {
  drawer: {
    phoneListDrawer: boolean;
  };
  alert: {
    display: boolean;
    message: string | void;
    type: string | void;
  };
  backdrop: {
    value: boolean;
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
  action: 'login' | 'register' | 'forgot_password';
  role: 'admin' | "agent" | "contact";
  login: {
    phone: string;
    password: string;
    step: number;
    show_password: boolean;
    loading: boolean;
    domain: string;
    user_name: string;
  };
  register: {
    phone: string;
    name: string;
    password: string;
    step: number;
    show_password: boolean;
    enable_password_button: boolean;
    enable_edit_button: boolean;
    code: string;
    loading: boolean;
    expire_date: string;
    country_code: string;
  };
  forgot_password: {
    phone: string;
    step: number;
    code: string;
    password: string;
    show_password: boolean;
    expire_date: string;
    loading: boolean;
    country_code: string;
    remaining_time: string;
    enable_edit_button: boolean;
  };
}

export interface ICommonSlice {
  phone: {
    data: any[];
    full_data: any[];
    is_loaded: boolean;
    search_text: string;
    current_code: string;
    current_flag: string;
  };
  language: {
    data: any[];
    full_data: any[];
    is_loaded: boolean;
    search_text: string;
    current_code: string;
    current_flag: string;
  };
  countries: {
    data: any[];
    full_data: any[];
    is_loaded: boolean;
    search_text: string;
    current_code: string;
    current_flag: string;
  };
  cities: {
    data: any[];
    full_data: any[];
    is_loaded: boolean;
    search_text: string;
    current_code: string;
    current_flag: string;
  };
  domain: {
    name: string;
    configured: boolean;
  };
}

export interface ICompanySlice {
  action: 'create_company';
  company: {
    isSelectable: boolean;
  };
  create_company: {
    company_domain: '';
    company_name: '';
    step: number;
    loading: boolean;
  };
}
export interface IContactWidgetSlice {
  contact_widget: {
    is_show: boolean;
  };
}

export interface IThemeSlice {
  mode: 'light' | 'dark';
}
