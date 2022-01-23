import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ProfileScreen from "../screens/ProfileScreen";
import CardView from "../components/CardView";
import FormTextInput from "../components/FormTextInput";
import EditProfileScreen from "../screens/EditProfileScreen";
import AdminHomeScreen from "../screens/admin/AdminHomeScreen";
import AddNewVolunteers from "../screens/admin/AddNewVolunteers";
import ShowRequests from "../screens/admin/ShowRequests";
import AdminInformation from "../screens/admin/AdminInformation";
import RemoveVol from "../screens/admin/RemoveVol";
import AdminRemoveVol from "../components/AdminRemoveVol";
import AddNewMessage from "../screens/admin/AddNewMessage";
import AllMessages from "../screens/admin/AllMessages";
import EditMessages from "../screens/admin/EditMessages";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStacksScreens = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: () => (
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "gray" }}>
            עמוד הבית
          </Text>
        ),
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileScreen"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: () => (
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "gray" }}>
            פרופיל אישי
          </Text>
        ),
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainStacksScreens;

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#33A8FF",
        shadowColor: "#fff",
        elevation: 0,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="HomePage"
      component={AdminHomeScreen}
      options={() => ({
        headerBackTitleVisible: false,
        title: "עמוד הבית",
      })}
    />

    <HomeStack.Screen
      name="addNewVol"
      component={AddNewVolunteers}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "הוספת התנדבות חדשה",
      })}
    />

    <HomeStack.Screen
      name="showRequests"
      component={ShowRequests}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "בקשות הממתינות להתנדבות",
      })}
    />

    <HomeStack.Screen
      name="admininformation"
      component={AdminInformation}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "מידע נוסף",
      })}
    />

    <HomeStack.Screen
      name="removeVol"
      component={RemoveVol}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "מחיקת התנדבות",
      })}
    />

    <HomeStack.Screen
      name="viewContents"
      component={CardView}
      options={({ route }) => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: route.params.title,
      })}
    />

    <HomeStack.Screen
      name="formTextInput"
      component={FormTextInput}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "הזנת פרטים להתנדבות",
      })}
    />

    <HomeStack.Screen
      name="adminRemoveVol"
      component={AdminRemoveVol}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "מחיקת התנדבויות",
      })}
    />

    <HomeStack.Screen
      name="AddNewMessage"
      component={AddNewMessage}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "הוספת הודעה חדשה",
      })}
    />

    <HomeStack.Screen
      name="allMessages"
      component={AllMessages}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "עריכת הודעות",
      })}
    />

    <HomeStack.Screen
      name="editMessages"
      component={EditMessages}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "עריכת הודעות",
      })}
    />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#33A8FF",
        shadowColor: "#fff",
        elevation: 0,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="profile"
      component={ProfileScreen}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "פרופיל אישי",
      })}
    />

    <ProfileStack.Screen
      name="editProfile"
      component={EditProfileScreen}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "עריכת פרופיל",
      })}
    />
  </ProfileStack.Navigator>
);
