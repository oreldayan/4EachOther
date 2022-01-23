import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FirebaseContext } from "../../context/FirebaseContext";
import * as firebase from "firebase";

const AddNewMessage = () => {
  const [titleTextMessage, settitleTextMessage] = useState();
  const [textMessage, settextMessage] = useState();
  const [city, setCity] = useState();
  const [userName, setuserName] = useState();
  const firebaseContext = useContext(FirebaseContext);
  const uid = firebaseContext.getCurrentUser().uid;

  useEffect(() => {
    const getCity = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setCity(doc.data().city);
          setuserName(doc.data().username);
        }
      });

    return () => getCity();
  }, []);

  const sendData = async () => {
    await firebase.firestore().collection("AdminMessages").add({
      titleTextMessage: titleTextMessage,
      textMessage: textMessage,
      uid: uid,
      city: city,
      username: userName,
    });

    alert("ההודעה נוספה בהצלחה");

    settitleTextMessage("");
    settextMessage("");
  };

  const onSubmit = (titleTextMessage, textMessage) => {
    if (typeof titleTextMessage == "undefined") {
      alert("שגיאה! נושא ההודעה הוא שדה חובה");
      return;
    } else if (typeof textMessage == "undefined") {
      alert("שגיאה! גוף ההודעה הוא שדה חובה");
      return;
    } else {
      sendData();
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <View style={styles.container}>
          <Image
            source={require("../../../assets/newMessage.png")}
            style={{ width: 380, height: 250 }}
          />
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.textInput}>נושא ההודעה: </Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            onChangeText={(titleTextMessage) => {
              settitleTextMessage(titleTextMessage);
            }}
            value={titleTextMessage}
          />
        </View>
        <View style={styles.textInputView}>
          <Text style={styles.textInput}> גוף ההודעה: </Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            onChangeText={(textMessage) => {
              settextMessage(textMessage);
            }}
            value={textMessage}
          />
        </View>
        <TouchableOpacity
          onPress={() => onSubmit(titleTextMessage, textMessage)}
          style={styles.sendButton}
        >
          <Text style={styles.sendText}>שלח</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddNewMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  titleText: {
    textAlign: "center",
    margin: 5,
    fontSize: 29,
    fontWeight: "bold",
    color: "#33A8FF",
  },
  subTitleText: {
    textAlign: "center",
    margin: 0,
    fontSize: 16,
    fontWeight: "bold",
    color: "#33A8FF",
  },
  textInputView: {
    margin: 20,
    backgroundColor: "#ffffff",
  },
  textInput: {
    textAlign: "right",
    margin: 3,
  },
  input: {
    borderBottomColor: "#8e93a1",
    borderBottomWidth: 0.5,
    height: 28,
    backgroundColor: "#ffffff",
    margin: 0,
  },
  sendButton: {
    textAlign: "center",
    borderRadius: 29,
    marginLeft: 83,
    marginRight: 83,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "#33A8FF",
  },
  sendText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
