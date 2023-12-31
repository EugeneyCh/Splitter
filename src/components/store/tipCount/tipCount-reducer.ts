import {
  AppAction,
  AppState,
  SET_BILL_AMOUNT,
  SET_TIP_PERCENTAGE,
  SET_TIP_PERCENTAGE_CUSTOM,
  SET_NUMBER_OF_PEOPLE,
  SET_PERSONAL_AMOUNT,
  SET_PERSONAL_TIP,
  RESET_ALL,
  SET_TOTAL_TIPS,
  SET_TOTAL_BILL,
} from './tipCount-actions';

export const initialState: AppState = {
  billAmount: '0',
  tipPercentage: 0,
  tipPercentageCustom: null,
  numberOfPeople: 0,
  amountTip: 0,
  amountTotal: 0,
  totalTips: 0,
  totalBill: 0,

};

export const tipCount = (state = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case SET_BILL_AMOUNT:
      return { ...state, billAmount: action.payload };
    case SET_TIP_PERCENTAGE:
      return { ...state, tipPercentage: action.payload, tipPercentageCustom: null };
    case SET_TIP_PERCENTAGE_CUSTOM:
      return { ...state, tipPercentageCustom: action.payload, tipPercentage: 0 };
    case SET_NUMBER_OF_PEOPLE:
      return { ...state, numberOfPeople: action.payload };
    case SET_PERSONAL_AMOUNT:
      return { ...state, amountTotal: action.payload };
    case SET_PERSONAL_TIP:
      return { ...state, amountTip: action.payload };
    case SET_TOTAL_TIPS:
      return { ...state, totalTips: action.payload };
    case SET_TOTAL_BILL:
      return { ...state, totalBill: action.payload };
    case RESET_ALL:
      return initialState
    default:
      return state;
  }
};
