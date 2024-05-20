import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

/*const loadUser = () => {
  const user = localStorage.getItem("user");
  return user
    ? JSON.parse(user)
    : {
        id: "",
        username: "",
        email: "",
        password: "",
        description: "",
      };
};

export const userAtom = atom(loadUser());

export const setUserAtom = atom(
  (get) => get(userAtom),
  (get, set, newValue) => {
    set(userAtom, { ...get(userAtom), ...newValue });
    localStorage.setItem(
      "user",
      JSON.stringify({ ...get(userAtom), ...newValue }),
    );
  },
);

export const clearUserAtom = atom(
  (get) => get(userAtom),
  (get, set) => {
    const emptyUser = {
      id: "",
      username: "",
      email: "",
      password: "",
      description: "",
    };
    set(userAtom, emptyUser);
    localStorage.setItem("user", JSON.stringify(emptyUser));
  },
);*/

const emptyUser = {
  id: "",
  username: "",
  email: "",
  password: "",
  description: "",
};

const loadUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : emptyUser;
};

export const userAtom = atomWithStorage("user", loadUser());

export const clearUserAtom = () => {
  userAtom.onMount((set) => {
    set(emptyUser);
  });
};

export const setUserAtom = atom(
  (get) => get(userAtom),
  (get, set, newValue) => {
    set(userAtom, { ...get(userAtom), ...newValue });
    localStorage.setItem(
      "user",
      JSON.stringify({ ...get(userAtom), ...newValue }),
    );
  },
);
