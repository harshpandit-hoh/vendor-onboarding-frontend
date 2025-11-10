interface IState {
  currentStage: string;
  stages: {
    COMPANY_NAME: {
      status: "pending" | "resolved";
      data: null | {
        name: string;
      };
      attempts: number;
    };
    COMPANY_NAME_CONFIRMATION: {
      status: "pending" | "resolved";
      data: null;
      attempts: number;
    };
    ADDRESS_COUNTRY: {
      status: "pending" | "resolved";
      data: null | {
        country: string;
      };
      attempts: number;
    };
    ADDRESS_STATE: {
      status: "pending" | "resolved";
      data: null | {
        state: string;
      };
      attempts: number;
    };
    ADDRESS_CITY: {
      status: "pending" | "resolved";
      data: null | {
        city: string;
      };
      attempts: number;
    };
    ADDRESS_STREET: {
      status: "pending" | "resolved";
      data: null | {
        street: string;
      };
      attempts: number;
    };
    ADDRESS_BUILDING: {
      status: "pending" | "resolved";
      data: null | {
        building: string;
      };
      attempts: number;
    };
    ADDRESS_POSTAL_CODE: {
      status: "pending" | "resolved";
      data: null | {
        postal_code: string;
      };
      attempts: number;
    };
    MOBILE_NUMBER: {
      status: "pending" | "resolved";
      data: null | {
        mobile: string;
      };
      attempts: number;
    };
    OTP_VERIFICATION: {
      status: "pending" | "resolved";
      data: null | {
        otp: string;
      };
      attempts: number;
    };
    PAN_DETAILS: {
      status: "pending" | "resolved";
      data: null | {
        pan: string;
      };
      attempts: number;
    };
    GST_DETAILS: {
      status: "pending" | "resolved";
      data: null | {
        gstin: string;
      };
      attempts: number;
    };
    MSME_DETAILS: {
      status: "pending" | "resolved";
      data: null | string;
      attempts: number;
    };
    BANK_DETAILS: {
      status: "pending" | "resolved";
      data: null | string;
      attempts: number;
    };
    COMPLETED: {
      status: "pending" | "resolved";
      data: null | string;
      attempts: number;
    };
  };
}

export type { IState };
