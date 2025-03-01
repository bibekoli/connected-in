type LoginFormValues = {
  phone: string;
  password: string;
};

type RegisterFormValues = LoginFormValues & {
  name: string;
};