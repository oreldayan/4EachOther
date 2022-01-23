import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Feather from "react-native-vector-icons/Feather";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import Ofakim from ".././cities/Ofakim";
import BeerSheva from ".././cities/BeerSheva";
import EmergencyOfakim from "../screens/categories/OfakimCity/EmergencyOfakim";
import EmergencyBeerSheva from "../screens/categories/BeerShevaCity/EmergencyBeerSheva";
import RoutineOfakim from "../screens/categories/OfakimCity/RoutineOfakim";
import CardView from "../components/CardView";
import ReligionOfakim from "../screens/categories/OfakimCity/ReligionOfakim";
import TeensOfakim from "../screens/categories/OfakimCity/TeensOfakim";
import OldsOfakim from "../screens/categories/OfakimCity/OldsOfakim";
import FormTextInput from "../components/FormTextInput";
import EditProfileScreen from "../screens/EditProfileScreen";
import FreeItems from "../screens/categories/OfakimCity/ItemsForDelivery/FreeItems";
import Covid19Ofakim from "../screens/categories/OfakimCity/Covid19Ofakim";
import ShoesOfakim from "../screens/categories/OfakimCity/ItemsForDelivery/ShoesOfakim";
import CardViewShoesOfakim from "../components/CardViewShoesOfakims";
import Realtime from "../screens/categories/OfakimCity/Realtime";
import FormUploadItems from "../screens/categories/OfakimCity/ItemsForDelivery/FormUploadItems";
import MyItems from "../screens/MyItems";
import LocationFunc from "../screens/LocationFunc";
import EditItems from "../components/EditItems";
import Permission from "../screens/Permission";
import Covid19BeerSheva from "../screens/categories/BeerShevaCity/Covid19BeerSheva";
import TeensBeerSheva from "../screens/categories/BeerShevaCity/TeensBeerSheva";
import OldsBeerSheva from "../screens/categories/BeerShevaCity/OldsBeerSheva";
import GmachBeerSheva from "../screens/categories/BeerShevaCity/GmachBeerSheva";

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const MyItemsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreens = () => (
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
      name="Notifications"
      component={NotificationsStackScreen}
      options={{
        tabBarLabel: () => (
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "gray" }}>
            סטטוס בקשות
          </Text>
        ),
        tabBarIcon: ({ color }) => (
          <Feather name="message-square" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="myItems"
      component={MyItemsStackScreen}
      options={{
        tabBarLabel: () => (
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "gray" }}>
            הפריטים שהעלת
          </Text>
        ),
        tabBarIcon: ({ color }) => (
          <Feather name="upload" color={color} size={26} />
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

export default MainTabScreens;

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: "#0099ff",
        shadowColor: "#0099ff",
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
      component={HomeScreen}
      options={() => ({
        headerBackTitleVisible: false,
        title: "עמוד הבית",
      })}
    />

    <HomeStack.Screen
      name="Ofakim_HomeStack"
      component={Ofakim}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות בעיר אופקים",
      })}
    />

    <HomeStack.Screen
      name="BeerSheva_HomeStack"
      component={BeerSheva}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות בעיר באר שבע",
      })}
    />

    <HomeStack.Screen
      name="EmergencyOfakim"
      component={EmergencyOfakim}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות בשעת חירום באופקים",
      })}
    />

    <HomeStack.Screen
      name="routineOfakim"
      component={RoutineOfakim}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות בשגרה באופקים",
      })}
    />

    <HomeStack.Screen
      name="religionOfakim"
      component={ReligionOfakim}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות לפי מגדר באופקים",
      })}
    />

    <HomeStack.Screen
      name="teensOfakim"
      component={TeensOfakim}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות לבני נוער באופקים",
      })}
    />

    <HomeStack.Screen
      name="oldsOfakim"
      component={OldsOfakim}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות עם קשישים באופקים",
      })}
    />

    <HomeStack.Screen
      name="covid19ofakim"
      component={Covid19Ofakim}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות בקורונה באופקים",
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
      name="freeItems"
      component={FreeItems}
      options={({ route }) => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: route.params.nameOfCity,
      })}
    />

    <HomeStack.Screen
      name="shoesofakim"
      component={ShoesOfakim}
      options={({ route }) => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: route.params.name,
      })}
    />

    <HomeStack.Screen
      name="viewContentsShoesOfakim"
      component={CardViewShoesOfakim}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "נעליים למסירה באופקים",
      })}
    />

    <HomeStack.Screen
      name="realtime"
      component={Realtime}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות מעכשיו לעכשיו",
      })}
    />

    <HomeStack.Screen
      name="formUploadItems"
      component={FormUploadItems}
      options={() => ({
        headerShown: true,
        title: "העלאת פריטים למסירה",
      })}
    />

    <HomeStack.Screen
      name="editItems"
      component={EditItems}
      options={() => ({
        headerShown: true,
        title: "עריכת פריט למסירה",
      })}
    />

    <HomeStack.Screen
      name="location"
      component={LocationFunc}
      options={() => ({
        headerShown: true,
        title: "Locations",
      })}
    />

    <HomeStack.Screen
      name="permission"
      component={Permission}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "מבוגרים בודדים",
      })}
    />

    <HomeStack.Screen
      name="EmergencyBeerSheva"
      component={EmergencyBeerSheva}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות בחירום בעיר באר שבע",
      })}
    />

    <HomeStack.Screen
      name="Covid19BeerSheva"
      component={Covid19BeerSheva}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות בקורונה בעיר באר שבע",
      })}
    />

    <HomeStack.Screen
      name="TeensBeerSheva"
      component={TeensBeerSheva}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות לנוער בעיר באר שבע",
      })}
    />

    <HomeStack.Screen
      name="OldsBeerSheva"
      component={OldsBeerSheva}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות עם קשישים בבאר שבע",
      })}
    />

    <HomeStack.Screen
      name="GmachBeerSheva"
      component={GmachBeerSheva}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "התנדבויות בגמחים בבאר שבע",
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

const NotificationsStackScreen = () => (
  <NotificationsStack.Navigator
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
    <NotificationsStack.Screen
      name="messages"
      component={NotificationsScreen}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "סטטוס רישום להתנדבויות",
      })}
    />
  </NotificationsStack.Navigator>
);

const MyItemsStackScreen = () => (
  <MyItemsStack.Navigator
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
    <MyItemsStack.Screen
      name="messages"
      component={MyItems}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        title: "הפריטים שהעלתם",
      })}
    />
  </MyItemsStack.Navigator>
);
