interface User {
  name: string;
  email: string;
  id: string;
}

interface UserState {
  data: {
    name: string;
    email: string;
    id: string;
  };
}

export type { User, UserState };
