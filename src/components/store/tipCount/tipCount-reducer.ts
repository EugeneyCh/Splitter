// const initialState = {
//      bill: 0,
//     tips: 0,
//     peoples: 0,
//     tipAmount: 0,
//     total: 0,
// }

// export const tipCount = (state = initialState, action) => {
//     switch (action.type) {
//         case addBill: {
//             return [ ...state, state.bill: action.value ]
//     }
//         case addTip:{
//             return [...state, state.tips:action.value]
//         }
//         case addPeoples:{
//             retutn [ ...state, state.peoples:action.value]
//         }
//         default:{
//             return state
//         }
// }
// }

// reducer.ts
import {
  AppAction,
  AppState,
  SET_BILL_AMOUNT,
  SET_TIP_PERCENTAGE,
  SET_NUMBER_OF_PEOPLE,
} from './tipCount-actions';

export const initialState: AppState = {
  billAmount: 0,
  tipPercentage: 0,
  numberOfPeople: 0,
};

export const tipCount = (state = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case SET_BILL_AMOUNT:
      return { ...state, billAmount: action.payload };
    case SET_TIP_PERCENTAGE:
      return { ...state, tipPercentage: action.payload };
    case SET_NUMBER_OF_PEOPLE:
      return { ...state, numberOfPeople: action.payload };
    default:
      return state;
  }
};
