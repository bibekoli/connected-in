import * as reduxTypes from "@/redux/constants";

const initialState = {
  userRegistered: null,
  dailyActiveUser: null,
  dailyMessagesSent: null,
  usersByAge: null,
  userActiveEachHour: null,
  totalByGender: null,
  userByMessagesSent: null,
};

export const chartDataReducer = (state = initialState, action: ReduxActions) => {
  switch (action.type) {
    case reduxTypes.UPDATE_CHART_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}