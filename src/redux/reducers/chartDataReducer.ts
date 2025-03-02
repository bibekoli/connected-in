import * as reduxTypes from "@/redux/constants";

const initialState = {
  userRegistered: null,
  dailyActiveUser: null,
  dailyMessagesSent: null,
  usersByAge: null,
  userActiveEachHour: null,
  totalByGender: null,
  userbymessagesSent: null,
};

export const chartDataReducer = (state = initialState, action: ReduxActions) => {
  switch (action.type) {
    case reduxTypes.UPDATE_CHART_DATA:
      return {
        ...state,
        userRegistered: action.payload.userRegistered,
        dailyActiveUser: action.payload.dailyActiveUser,
        dailyMessagesSent: action.payload.dailyMessagesSent,
        usersByAge: action.payload.usersByAge,
        userActiveEachHour: action.payload.userActiveEachHour,
        totalByGender: action.payload.totalByGender,
        userbymessagesSent: action.payload.userbymessagesSent,
      };
    default:
      return state;
  }
}