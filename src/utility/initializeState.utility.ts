import type { IState } from "../interface";

const initialState = (): IState => {
  return {
    currentStage: "COMPANY_NAME",
    stages: {
      COMPANY_NAME: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      COMPANY_NAME_CONFIRMATION: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      GST_EXISTS: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      MSME_EXISTS: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      ESIC_PPFA_EXISTS: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      ADDRESS_COUNTRY: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      ADDRESS_STATE: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      ADDRESS_CITY: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      ADDRESS_STREET: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      ADDRESS_BUILDING: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      ADDRESS_POSTAL_CODE: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      MOBILE_NUMBER: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      OTP_VERIFICATION: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      PAN_DETAILS: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      GST_DETAILS: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      MSME_DETAILS: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      BANK_DETAILS: {
        status: "pending",
        data: null,
        attempts: 0,
      },
      COMPLETED: {
        status: "pending",
        data: null,
        attempts: 0,
      },
    },
  };
};

export { initialState };
