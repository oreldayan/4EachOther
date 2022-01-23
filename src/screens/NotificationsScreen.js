import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";

import * as firebase from "firebase";
import CardMessage from "../components/CardMessage";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const NotificationsScreen = ({ title, status, navigation }) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;

    const ref = firebase
      .firestore()
      .collection("requests")
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

    return () => ref();
  }, []);

  const alertDelete = (title, uid) => {
    Alert.alert("מחיקת התנדבות", "האם ברצונך למחוק את ההתנדבות?", [
      {
        text: "לא",
        onPress: () => {
          navigation.navigate("messages");
        },
      },
      {
        text: "כן",
        onPress: () => {
          deleteFields(title, uid);
        },
      },
    ]);
  };

  const deleteFields = (title, uid) => {
    firebase
      .firestore()
      .collection("requests")
      .where("uid", "==", uid)
      .where("title", "==", title)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
          alert("ההתנדבות נמחקה בהצלחה!");
        });
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: "60%",
          height: "30%",
          marginLeft: 80,
        }}
        source={require("../../assets/notifications.png")}
      />
      <View>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {" "}
          באיזור זה תוכלו לצפות בסטטוס הרישום להתנדבויות
        </Text>
      </View>
      <ScrollView>
        {data.map(({ id, dataVal }) => (
          <TouchableOpacity
            key={id}
            onPress={() => {
              alertDelete(dataVal.title, dataVal.uid);
            }}
          >
            <CardMessage title={dataVal.title} status={dataVal.status} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
