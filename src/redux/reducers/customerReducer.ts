import * as reduxTypes from "@/redux/constants";

export const customerReducer = (state = [] as User[], action: ReduxActions) => {
  switch (action.type) {
    case reduxTypes.UPDATE_CUSTOMER:
      return action.payload;
      case reduxTypes.UPDATE_MESSAGE:
        const { sender, customer_id, message } = action.payload;
        const customerToUpdate = state.find((customer) => customer.user_id === customer_id);
        if (!customerToUpdate) {
          return state;
        }
        const updatedCustomer = {
          ...customerToUpdate,
          messages: [
            ...customerToUpdate.messages,
            {
              message,
              sender,
              date: new Date().toISOString(),
            },
          ],
        };
        const otherCustomers = state.filter((customer) => customer.user_id !== customer_id);
        const updatedCustomers = [updatedCustomer, ...otherCustomers];
        return updatedCustomers;
    default:
      return state;
  }
}