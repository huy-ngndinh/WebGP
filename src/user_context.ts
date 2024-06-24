import { createContext, Dispatch, SetStateAction } from "react";

export interface User {
  circuit_index: number;
}

export const user_context = createContext<{ user_info: User; set_user_info: Dispatch<SetStateAction<User>> }>({
  user_info: {
    circuit_index: -1,
  },
  set_user_info: (User) => User,
});
