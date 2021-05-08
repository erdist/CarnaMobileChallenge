import { createContext, useContext } from "react";
import AuthStore from "./authStore";
import ContentStore from "./contentStore";
import UserStore from "./userStore";

interface Store {
  userStore: UserStore;
  contentStore: ContentStore;
  authStore: AuthStore;
}

export const store: Store = {
  userStore: new UserStore(),
  contentStore: new ContentStore(),
  authStore: new AuthStore,
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
