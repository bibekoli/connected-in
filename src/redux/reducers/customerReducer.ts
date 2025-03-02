import * as reduxTypes from "@/redux/constants";

export const customerReducer = (state = [] as User[], action: ReduxActions) => {
  switch (action.type) {
    case reduxTypes.UPDATE_CUSTOMER:
      return action.payload;
    case reduxTypes.UPDATE_MESSAGE:
      const { sender, customer_id, message } = action.payload;
      const updatedCustomers = state.map((customer) => {
        if (customer.user_id === customer_id) {
          return {
            ...customer,
            messages: [
              ...customer.messages,
              {
                message,
                sender,
                date: new Date().toISOString(),
              },
            ],
          };
        }
        return customer;
      });
      return updatedCustomers;
    default:
      return state;
  }
}