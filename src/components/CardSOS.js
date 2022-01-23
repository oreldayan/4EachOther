import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { UserContext } from "../context/UserContext";

const CardSOS = ({ title, description, image }) => {
  const [city, setCity] = useState("");
  const [auth, setAuth] = useState(false);
  const [user] = useContext(UserContext);
  const uid = user.uid;

  useEffect(() => {
    /** Get the city of the current user from firestore */
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setCity(doc.data().city);
        }
      });
  }, []);

  const updateFunc = async (title) => {
    /** Update the details in firestore collection */
    await firebase
      .firestore()
      .collection("requests_realtime")
      .add({
        title: title,
        username: user.username,
        email: user.email,
        status: "ממתין לאישור.",
        uid: uid,
        city: city,
      })
      .then(() => {
        console.log("Data sent.");
      });

    alert("נשלחה בקשה למנהל ההתנדבות");
  };

  useEffect(() => {
    /** Check if the user already sign to vol. */
    const userId = firebase.auth().currentUser.uid;
    const ref = firebase
      .firestore()
      .collection("requests_realtime")
      .where("title", "==", title)
      .where("uid", "==", userId)
      .onSnapshot((snapshot) => {
        snapshot.forEach((querySelect) => {
          test(querySelect.data().title, querySelect.data().uid);
        });
      });

    return () => ref();
  }, []);

  const test = (titleParam) => {
    /** Function to check if the user is sign to vol */
    if (titleParam == title) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardImgWrapper}>
        {auth == false ? (
          <TouchableOpacity onPress={() => updateFunc(title)} disabled={auth}>
            <Image
              source={{ uri: image }}
              resizeMode="cover"
              style={styles.cardImg}
            />
            <Text>לחץ כאן</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => updateFunc(title)} disabled={auth}>
            <Image
              source={{ uri: image }}
              resizeMode="cover"
              style={styles.cardImg}
            />
            <Text style={{ left: 19, top: -23, color: "#FFF", fontSize: 12 }}>
              לחצו כדי להתנדב
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDetails}>{description}</Text>
      </View>
    </View>
  );
};

export default CardSOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: 100,
    width: 100,
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    position: "relative",
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
    color: "#33A8FF",
  },
  cardDetails: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    textAlign: "right",
  },
});
