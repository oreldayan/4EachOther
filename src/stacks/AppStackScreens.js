import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackScreens from "./AuthStackScreens";
import MainStackScreens from "./MainStackScreens";
import TabStackScreens from "./TabStackScreens";
import { UserContext } from "../context/UserContext";
import LoadingScreen from "../screens/LoadingScreen";

export default AppStackScreens = () => {
  const AppStack = createStackNavigator();
  const [user] = useContext(UserContext);

  return (
    <AppStack.Navigator headerMode="none">
      {user.isLoggedIn === null ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : user.isLoggedIn && !user.isAdmin ? (
        <AppStack.Screen name="Main" component={TabStackScreens} />
      ) : user.isLoggedIn && user.isAdmin ? (
        <AppStack.Screen name="UserAdmin" component={MainStackScreens} />
      ) : (
        <AppStack.Screen name="Auth" component={AuthStackScreens} />
      )}
    </AppStack.Navigator>
  );
};
