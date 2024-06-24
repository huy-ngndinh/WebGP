import React, { Dispatch, SetStateAction, useContext } from "react";
import { user_context } from "./user_context";
import { User } from "./user_context";

export default function Circuit() {
  const { user_info, set_user_info }: { user_info: User; set_user_info: Dispatch<SetStateAction<User>> } = useContext(user_context);

  return (
    <div id="Loading" className="fixed size-full flex flex-col gap-20 justify-center items-center bg-white/80 bg-[url('./assets/images/background.jpg')] bg-center bg-[length:60%_60%] bg-repeat bg-blend-lighten">
      <div id="Spinning" className="w-1/12 aspect-square rounded-xl animate-spin bg-gray-200"></div>
      <div id="Notification" className="font-description text-3xl tracking-wider">
        In development ... We'll be back soon!
      </div>
    </div>
  );
}
