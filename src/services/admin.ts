import axios from 'axios';

import {
  IAdminProfile,
  IAdminSendCode,
  IAdminVerifyCode,
  IUserResetPassword,
  AdminAPIs
} from '@/src/types/apis/admin.api';
import { serverInstance } from '@/lib/index';

export const publicInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`
});

export const adminAPIs = (token: string | null): AdminAPIs => {
  const headers = { Authorization: `Bearer ${token ?? 's'}` };
  const getProfile = async (): Promise<IAdminProfile> => {
    try {
      const response = await serverInstance.get('/api/profile', {
        headers
      });
      if (response.status === 200 && response.data.is_success) {
        return {
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: {
              name: response.data.data.name,
              user_name: response.data.data.user_name,
              profile_image: response.data.data.profile_image,
              bio: response.data.data.bio
            }
          }
        };
      } else {
        return {
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
        status: 404,
        data: {
          message: 'error getting profile',
          is_success: false,
          data: null
        }
      };
    }
  };
  const sendCode = async (data: object): Promise<IAdminSendCode> => {
    try {
      const response = await publicInstance.post(
        '/organization/users/auth/send-code',
        data
      );
      if (response.status === 200 && response.data.is_success) {
        return {
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: {
              expired: response.data.data.expired
            }
          }
        };
      } else {
        return {
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: {
              expired: null
            }
          }
        };
      }
    } catch (error) {
      return {
        status: 404,
        data: {
          message: 'error on send code',
          is_success: false,
          data: {
            expired: null
          }
        }
      };
    }
  };
  const verifyCode = async (data: {
    domain: string;
    
  }): Promise<IAdminVerifyCode> => {
    try {
      const response = await publicInstance.post(
        `/admin/company/auth/verify-opt?domain=${data.domain}`,
        data
      );
      if (response.status === 200 && response.data.is_success) {
        return {
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: null
          }
        };
      } else {
        return {
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
        status: 404,
        data: {
          message: 'error on check code',
          is_success: false,
          data: null
        }
      };
    }
  };
  const resetPassword = async (data: object): Promise<IUserResetPassword> => {
    try {
      const response = await publicInstance.post(
        'organization/users/auth/verify-opt',
        data
      );
      if (response.status === 200 && response.data.is_success) {
        return {
          status: response.status,
          data: {
            message: response.data.message,
            is_success: response.data.is_success,
            data: null
          }
        };
      } else {
        return {
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
        status: 404,
        data: {
          message: 'error on check code',
          is_success: false,
          data: null
        }
      };
    }
  };

  return {
    getProfile,
    sendCode,
    verifyCode,
    resetPassword
  };
};
