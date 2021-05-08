import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./screens/RootStackScreen";
import DrawerScreen from "./screens/DrawerScreen";
import { store, StoreContext, useStore } from "./stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { authStore, userStore, contentStore } = useStore();
  const { isLoggedIn, authenticate, adminId } = authStore;
  const { setAdminIdForUser } = userStore;
  const { setAdminIdForContent } = contentStore;
  useEffect(() => {
    authenticate();
    setAdminIdForContent(adminId);
    setAdminIdForUser(adminId);
  }, []);
  return (
    <StoreContext.Provider value={store}>
      <NavigationContainer>
        {isLoggedIn && <DrawerScreen />}
      </NavigationContainer>
      <NavigationContainer>
        {!isLoggedIn && <RootStackScreen />}
      </NavigationContainer>
    </StoreContext.Provider>
  );
}

export default observer(App);
