type ReduxActions = {
  type: string;
  payload?: any;
}

type ReduxState = {
  currentUser: User;
  customers: User[];
  chartData: ChartDataState;
}

type ChartDataState = {
  userRegistered: any;
  dailyActiveUser: any;
  dailyMessagesSent: any;
  usersByAge: any;
  userActiveEachHour: any;
  totalByGender: any;
  userbymessagesSent: any;
}