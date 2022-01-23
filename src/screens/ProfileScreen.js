import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";
import { View, StyleSheet, Text, Image } from "react-native";
import * as firebase from "firebase";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

export default ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const firebase1 = useContext(FirebaseContext);
  const [data, setData] = useState([]);
  const [vol, setVol] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;

    const ref = () => {
      firebase
        .firestore()
        .collection("users")
        .where("uid", "==", uid)
        .onSnapshot(
          (snapshot) => {
            setData(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                dataVal: doc.data(),
              }))
            );
          },
          (err) => {
            setErr(err);
          }
        );
    };

    const voln = async () => {
      firebase
        .firestore()
        .collection("requests")
        .where("uid", "==", uid)
        .where("status", "==", "מאושר ✅")
        .onSnapshot((querySnapshot) => {
          setVol(querySnapshot.size);
          console.log(querySnapshot.size);
          console.log(uid);
        });
    };

    ref();
    voln();
  }, []);

  const logOut = async () => {
    const loggedOut = await firebase1.logOut();

    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={{
            height: 200,
            width: 300,
            margin: 0,
            alignSelf: "center",
          }}
          source={require("../../assets/profile.png")}
        />
        {data.map(({ id, dataVal }) => (
          <View style={styles.userInfoSection} key={id}>
            <View style={styles.row}>
              <Text style={{ color: "#777777", marginRight: 10 }}>
                שם משתמש: {dataVal.username}
              </Text>
              <Ionicons name="md-person" size={20} />
            </View>

            <View style={styles.row}>
              <Text style={{ color: "#777777", marginRight: 10 }}>
                כתובת מייל: {dataVal.email}
              </Text>
              <Ionicons name="ios-mail" size={20} />
            </View>

            <View style={styles.row}>
              <Text style={{ color: "#777777", marginRight: 10 }}>
                מספר טלפון: {dataVal.phoneNumber}
              </Text>
              <Ionicons name="ios-call" size={20} />
            </View>

            <View style={styles.row}>
              <Text
                style={{
                  color: "#777777",
                  marginRight: 10,
                }}
              >
                עיר: {dataVal.city}
              </Text>
              <FontAwesome5 name="city" size={20} />
            </View>

            <View style={styles.row}>
              <Text style={{ color: "#777777", marginRight: 10 }}>
                התנדבויות בהן אני מתנדב: {vol}
              </Text>
              <Feather name="award" size={20} />
            </View>
          </View>
        ))}

        {data.map(({ id, countVal }) => (
          <View style={styles.infoBoxWrapper} key={id}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                },
              ]}
            ></View>
          </View>
        ))}

        <View style={styles.userInfoSection2}>
          <View style={styles.row2}>
            <TouchableOpacity
              onPress={() => navigation.navigate("editProfile")}
            >
              <Text style={styles.menuItemText}>עריכת פרופיל</Text>
            </TouchableOpacity>
            <AntDesign name="edit" size={20} />
          </View>

          <View style={styles.row2}>
            <TouchableOpacity>
              <Text style={styles.menuItemText}>אודות</Text>
            </TouchableOpacity>
            <Ionicons name="ios-information-circle" size={20} />
          </View>

          <View style={styles.row2}>
            <TouchableOpacity onPress={logOut}>
              <Text style={styles.menuItemText}>התנתקות</Text>
            </TouchableOpacity>
            <Ionicons name="ios-log-out" size={20} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logout: {
    marginBottom: 32,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    alignContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  userInfoSection2: {
    paddingHorizontal: 30,
    marginBottom: 30,
    marginTop: 10,
    alignContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },

  row: {
    flexDirection: "row",
    marginBottom: 13,
  },
  row2: {
    flexDirection: "row",
    marginBottom: 39,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
    marginRight: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    flexDirection: "row",
    height: 20,
  },
  infoBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
