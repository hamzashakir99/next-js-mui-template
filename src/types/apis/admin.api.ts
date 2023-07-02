export interface IAdminProfile {
  status: number;
  data: {
    message: string | any[];
    is_success: boolean;
    data: {
      name: string | null;
      user_name: string | null;
      profile_image: string | null;
      bio: string | null;
    } | null;
  };
}

export interface IAdminSendCode {
  status: number;
  data: {
    message: string | any[];
    is_success: boolean;
    data: {
      expired: string | null;
    };
  };
}

export interface IAdminVerifyCode {
  status: number;
  data: {
    message: string | any[];
    is_success: boolean;
    data: null;
  };
}

export interface IUserResetPassword {
  status: number;
  data: {
    is_success: boolean;
    message: any[] | string;
    data: null;
  };
}

export interface AdminAPIs {
  getProfile: () => Promise<IAdminProfile>;
  sendCode: (data: {
    type: string;
    action: string;
    identity: string;
  }) => Promise<IAdminSendCode>;
  verifyCode: (data: {
    type: string;
    action: string;
    identity: string;
    code: string;
    password: string;
    domain: string;
  }) => Promise<IAdminVerifyCode>;
  resetPassword: (data: {
    type: string;
    identity: string;
    action: string;
    code: string;
    password: string;
  }) => Promise<IUserResetPassword>;
}
