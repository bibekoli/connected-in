interface User {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  avatar: string;
  address: string;
  created_at: string;
  last_online: string;
  messages: Message[];
}

interface Message {
  message: string;
  date: string;
  sender: string;
}