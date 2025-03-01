import * as reduxType from "@/redux/constants";

export const updateCurrentUser = (user: User) => ({
  type: reduxType.UPDATE_CURRENT_USER,
  payload: user,
});