import * as reduxType from "@/redux/constants";

export const updateMessage = (user: NewMessage) => ({
  type: reduxType.UPDATE_MESSAGE,
  payload: user,
});

export const updateCustomer = (customer: User[]) => ({
  type: reduxType.UPDATE_CUSTOMER,
  payload: customer,
});

type NewMessage = {
  sender: string;
  customer_id: number;
  message: string
}