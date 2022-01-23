import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { FirebaseContext } from "../../context/FirebaseContext";

const AdminInformation = ({ navigation }) => {
  const [approvedReq, setApprovedRequests] = useState();
  const [deniedReq, setDeniedRequests] = useState();
  const [waitingReq, setWaitingReq] = useState();
  const [city, setCity] = useState("default");
  const firebaseContext = useContext(FirebaseContext);

  const uid = firebaseContext.getCurrentUser().uid;

  useEffect(() => {
    const getCity = firebase
      .firestore()
      .collection("admins")
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setCity(doc.data().city);
        }
      });

    return () => getCity();
  });

  useEffect(() => {
    setTimeout(async () => {
      waitingRequests();
      approvedRequests();
      deniedRequests();
      showUsers();
    }, 500);
  }, [approvedReq, deniedReq, waitingReq]);

  const waitingRequests = () => {
    firebase
      .firestore()
      .collection("requests")
      .where("status", "==", "ממתין לאישור.")
      .where("city", "==", city)
      .onSnapshot((querySnapshot) => {
        setWaitingReq(querySnapshot.size);
      });
  };

  const approvedRequests = () => {
    firebase
      .firestore()
      .collection("requests")
      .where("status", "==", "מאושר ✅")
      .where("city", "==", city)
      .onSnapshot((querySnapshot) => {
        setApprovedRequests(querySnapshot.size);
      });
  };

  const deniedRequests = () => {
    firebase
      .firestore()
      .collection("requests")
      .where("status", "==", "לא מאושר ❌")
      .where("city", "==", city)
      .onSnapshot((querySnapshot) => {
        setDeniedRequests(querySnapshot.size);
      });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <TouchableOpacity>
          <Text style={styles.text}>
            סה"כ בקשות התנדבות הממתינות לאישור: {waitingReq}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.text}>
          סה"כ בקשות התנדבות שאושרו: {approvedReq}
        </Text>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.text}>סה"כ בקשות התנדבות שנדחו: {deniedReq}</Text>
      </View>
    </View>
  );
};

export default AdminInformation;

const styles = StyleSheet.create({
  text: {
    alignContent: "center",
    height: 50,
    textAlign: "center",
    color: "#33A8FF",
    fontSize: 15,
    fontWeight: "bold",
  },
  card: {
    height: 125,
    marginVertical: 15,
    flexDirection: "column",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
  },

  cardInfo: {
    flex: 1,
    padding: 35,
    margin: 5,
    textAlign: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: "#fff",
  },
});
