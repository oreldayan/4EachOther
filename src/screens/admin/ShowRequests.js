import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, Text, View, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import AdminCardMessages from "./AdminCardMessages";
import { FirebaseContext } from "../../context/FirebaseContext";

const ShowRequests = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);
  const [err, setErr] = useState();
  const firebase1 = useContext(FirebaseContext);

  const uid = firebase1.getCurrentUser().uid;

  const getCity = async (uid) => {
    await firebase
      .firestore()
      .collection("admins")
      .doc(uid)
      .get()
      .then((cityVal) => {
        let city = cityVal.data().city;
        setCity(city);
      });
  };

  useEffect(() => {
    getCity(uid);

    const ref = firebase
      .firestore()
      .collection("requests")
      .where("status", "==", "ממתין לאישור.")
      .where("city", "==", city)
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

    //CleanUp function
    return () => ref();
  }, [city]);

  //the alert message when admin click on the card
  const requestsMessage = (title, uid) => {
    Alert.alert(
      "בקשות הממתינות לאישור",
      "האם ברצונך לאשר למשתמש זה את ההתנדבות?",
      [
        {
          text: "לא",
          onPress: () => {
            denyRequest(title, uid);
          },
        },
        {
          text: "כן",
          onPress: () => {
            allowRequest(title, uid);
          },
        },
        {
          text: "ביטול",
          onPress: () => {
            navigation.navigate("showRequests");
          },
        },
      ]
    );
  };

  //allow requests
  const allowRequest = (title, uid) => {
    firebase
      .firestore()
      .collection("requests")
      .where("uid", "==", uid)
      .where("title", "==", title)
      .get()
      .then((querySelect) => {
        querySelect.forEach((doc) => {
          doc.ref.update({
            status: "מאושר ✅",
          });
          alert("בוצע בהצלחה, סטטוס 'מאושר' עודכן למשתמש");
        });
      });
  };

  //deny requests
  const denyRequest = (title, uid) => {
    firebase
      .firestore()
      .collection("requests")
      .where("uid", "==", uid)
      .where("title", "==", title)
      .get()
      .then((querySelect) => {
        querySelect.forEach((doc) => {
          doc.ref.update({
            status: "לא מאושר ❌",
          });
          alert("בוצע בהצלחה, סטטוס 'לא מאושר' עודכן למשתמש");
        });
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 200,
          width: 200,
          alignSelf: "center",
        }}
        source={require("../../../assets/notifications.png")}
      />

      <View>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {" "}
          באיזור זה תוכלו לאשר או לדחות בקשות התנדבויות. לחצו על הבקשה המתאימה
        </Text>
      </View>
      <ScrollView>
        {data.map(({ id, dataVal }) => (
          <TouchableOpacity
            key={id}
            onPress={() => {
              requestsMessage(dataVal.title, dataVal.uid);
            }}
          >
            <AdminCardMessages
              title={dataVal.title}
              fullName={dataVal.fullName}
              status={dataVal.status}
              phoneNumber={dataVal.phoneNumber}
              city={dataVal.city}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShowRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
