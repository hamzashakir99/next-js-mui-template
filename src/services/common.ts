import axios from 'axios';
import { IGetPhoneCode, ICommonAPIs, IGetLanguage, IGetCountries, IGetCities } from '@/types/apis/common.api';

export const publicInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`
});


export const commonAPIs = (domain: string): ICommonAPIs => {
  const getPhoneCode = async (): Promise<IGetPhoneCode> => {
    try {
      const response = await publicInstance.get(
        `/company/common/phones?domain=${domain}`
      );
      if (response.status === 200 && response.data.is_success) {
        return {
          action: 'phone',
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: response.data.data
          }
        };
      } else {
        return {
          action: 'phone',
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: null
          }
        };
      }
    } catch (error) {
      return {
        action: 'phone',
        status: 404,
        data: {
          message: 'error getting phone codes',
          is_success: false,
          data: null
        }
      };
    }
  };
  const getLanguages = async (): Promise<IGetLanguage> => {
    try {
      const response = await publicInstance.get(
        `/company/common/languages?domain=${domain}`
      );
      if (response.status === 200 && response.data.is_success) {
        return {
          action: 'language',
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: response.data.data
          }
        };
      } else {
        return {
          action: 'language',
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: null
          }
        };
      }
    } catch (error) {
      return {
        action: 'language',
        status: 404,
        data: {
          message: 'error getting phone codes',
          is_success: false,
          data: null
        }
      };
    }
  };
  const getCountries = async (): Promise<IGetCountries> => {
    try {
      const response = await publicInstance.get(
        `/company/common/countries?domain=${domain}`
      );
      if (response.status === 200 && response.data.is_success) {
        return {
          action: 'countries',
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: response.data.data
          }
        };
      } else {
        return {
          action: 'countries',
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: null
          }
        };
      }
    } catch (error) {
      return {
        action: 'countries',
        status: 404,
        data: {
          message: 'error getting phone codes',
          is_success: false,
          data: null
        }
      };
    }
  };
  const getCities = async (): Promise<IGetCities> => {
    try {
      const response = await publicInstance.get(
        `/company/common/countries/cities?domain=${domain}`
      );
      if (response.status === 200 && response.data.is_success) {
        return {
          action: 'cities',
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: response.data.data
          }
        };
      } else {
        return {
          action: 'cities',
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: null
          }
        };
      }
    } catch (error) {
      return {
        action: 'cities',
        status: 404,
        data: {
          message: 'error getting phone codes',
          is_success: false,
          data: null
        }
      };
    }
  };
  return {
    getPhoneCode,
    getLanguages,
    getCountries,
    getCities,
  };
};