// import React, { useEffect } from "react";
// import * as Permissions from "expo-permissions";
// import * as Notifications from "expo-notifications";
// import { View, Text } from "react-native-animatable";

// const ExpoNotifications = () => {
//   let registerForPushNotifications = async () => {
//     const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalstatus = status;
//     let token = await Notifications.getExpoPushTokenAsync();
//     console.log("token: ", token);

//     if (status !== "granted") {
//       const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//       finalstatus = status;
//     }

//     if (finalstatus !== "granted") {
//       return;
//     }
//   };

//   useEffect(() => {
//     registerForPushNotifications();
//   }, []);

//   return (
//     <View>
//       <Text>Notifications</Text>
//     </View>
//   );
// };

// export default ExpoNotifications;
