interface User {
  name: string;
  email: string;
}

interface UserState {
  data: {
    name: string;
    email: string;
  };
}

export type { User, UserState };
