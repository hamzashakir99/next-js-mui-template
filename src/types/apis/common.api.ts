interface IPhoneObject {
  _id: string;
  name: string;
  short_name: string;
  phone_code: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ILanguageObject {
  _id: string;
  code: string;
  name: string;
  nativeName: string,
  createdAt: string;
  updatedAt: string;
}

interface ICountriesObject {
  _id: string;
  name: string;
  short_name: string;
}

interface ICitiesObject {
  _id: string;
  cities: string[];
}


export interface IGetPhoneCode {
  action: 'phone';
  status: number;
  data: {
    message: string | any[];
    is_success: boolean;
    data: IPhoneObject[]| null;
  };
}

export interface IGetLanguage {
  action: 'language';
  status: number;
  data: {
    message: string | any[];
    is_success: boolean;
    data: ILanguageObject[]| null;
  };
}


export interface IGetCountries {
  action: 'countries';
  status: number;
  data: {
    message: string | any[];
    is_success: boolean;
    data: ICountriesObject[]| null;
  };
}

export interface IGetCities {
  action: 'cities';
  status: number;
  data: {
    message: string | any[];
    is_success: boolean;
    data: ICitiesObject[]| null;
  };
}



export interface ICommonAPIs {
  getPhoneCode: () => Promise<IGetPhoneCode>;
  getLanguages: () => Promise<IGetLanguage>;
  getCountries: () => Promise<IGetCountries>;
  getCities: () => Promise<IGetCities>;
}
