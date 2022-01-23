import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as firebase from "firebase";
import { FirebaseContext } from "../../context/FirebaseContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";

const AllMessages = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [city, setCity] = useState("");
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const uid = firebaseContext.getCurrentUser().uid;

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
  }, [city]);

  useEffect(() => {
    const getMessages = firebase
      .firestore()
      .collection("AdminMessages")
      .where("city", "==", city)
      .onSnapshot(
        (snapshot) => {
          setMessages(
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

    return () => getMessages();
  }, [messages]);

  const Options = (titleTextMessage, textMessage) => {
    Alert.alert("עריכת הודעה", "בחר את האופציה הרלוונטית", [
      {
        text: "עריכת הודעה",
        onPress: () => {
          navigation.navigate("editMessages", {
            titleTextMessage: titleTextMessage,
            textMessage: textMessage,
          });
        },
      },
      {
        text: "מחיקת הודעה",
        onPress: () => {
          deleteFields(titleTextMessage, textMessage);
        },
      },
      {
        text: "חזור",
        onPress: () => {},
      },
    ]);
  };

  const deleteFields = async (titleTextMessage, textMessage) => {
    await firebase
      .firestore()
      .collection("AdminMessages")
      .where("titleTextMessage", "==", titleTextMessage)
      .where("textMessage", "==", textMessage)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
          alert("ההודעה נמחקה בהצלחה!");
        });
      });
  };

  return (
    <View>
      {messages.map(({ id, dataVal }) => (
        <TouchableOpacity
          onPress={() => {
            Options(dataVal.titleTextMessage, dataVal.textMessage);
          }}
          key={id}
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            padding: 20,
            marginHorizontal: 20,
            borderRadius: 20,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Image
            source={require("../../../assets/HomeMessage.jpg")}
            style={{ width: 40, height: 40 }}
          />
          <View>
            <Text
              style={{
                color: "#345c74",
                fontWeight: "bold",
                fontSize: 13,
                paddingHorizontal: 20,
                width: 170,
                textAlign: "right",
              }}
            >
              {dataVal.titleTextMessage}
            </Text>
            <Text
              style={{
                color: "#f5d",
                fontWeight: "bold",
                fontSize: 12,
                paddingHorizontal: 20,
                textAlign: "right",
              }}
            >
              {dataVal.textMessage}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AllMessages;

const styles = StyleSheet.create({});
