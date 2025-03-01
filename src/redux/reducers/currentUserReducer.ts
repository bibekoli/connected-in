import * as reduxTypes from "@/redux/constants";

export const currentUserReducer = (state = {}, action: ReduxActions) => {
  switch (action.type) {
    case reduxTypes.UPDATE_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}