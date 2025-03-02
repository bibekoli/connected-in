type ReduxActions = {
  type: string;
  payload?: any;
}

type ReduxState = {
  currentUser: User;
  customers: User[];
}