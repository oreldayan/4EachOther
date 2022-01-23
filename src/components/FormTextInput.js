import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput } from "react-native-paper";
import DismissKeyboard from "./DismissKeyboard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import * as firebase from "firebase";

const FormTextInput = ({ route, navigation }) => {
  const [phone, setPhone] = useState();
  const [fullName, setFullName] = useState();
  const [user] = useContext(UserContext);
  const [city, setCity] = useState("");


  const { title } = route.params;
  const uid = user.uid;

  useEffect(() => {
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


  const sendData = async () => {
    const uid = user.uid;
    await firebase
      .firestore()
      .collection("requests")
      .add({
        title: title,
        fullName: fullName,
        phoneNumber: phone,
        status: "ממתין לאישור.",
        uid: uid,
        city: city,
      })
      .then(() => {
        console.log("Data sent.");
        navigation.navigate("viewContents");
      });

    alert("איזה כיף! תודה שבחרת להתנדב ב" + title);

    setFullName("");
    setPhone("");
  };

  const onSubmit = (fullName, phone) => {
    if (typeof phone == "undefined") {
      alert("שגיאה! מספר טלפון הוא שדה חובה");
      return;
    } else if (typeof fullName == "undefined" || fullName.length == 0) {
      alert("שגיאה! שם מלא הוא שדה חובה");
      return;
    } else if (phone.length < 10) {
      alert("מספר טלפון באורך לא תקין");
      return;
    } else {
      sendData();
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Image
          source={require("../../assets/happy.png")}
          style={{ width: "100%", height: "28%" }}
        />
        <View>
          <Text style={styles.titleText}>איזה כיף שבחרת להתנדב!</Text>
          <Text style={styles.subTitleText}>
            כל מה שנותר זה רק להזין פרטים:
          </Text>
        </View>

        <View style={styles.textInputView}>
          <Text style={styles.textInput}>שם מלא: </Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            onChangeText={(fullName) => {
              setFullName(fullName);
            }}
            value={fullName}
          />
        </View>

        <View style={styles.textInputView}>
          <Text style={styles.textInput}>טלפון: </Text>
          <TextInput
            style={styles.input}
            autoCompleteType="tel"
            autoCorrect={false}
            autoFocus={true}
            maxLength={10}
            keyboardType="phone-pad"
            onChangeText={(phone) => {
              setPhone(phone);
            }}
            value={phone}
          />
        </View>

        <TouchableOpacity
          disabled={!fullName && !phone}
          onPress={() => onSubmit(fullName, phone)}
          style={styles.sendButton}
        >
          <Text style={styles.sendText}>שלח</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
};

export default FormTextInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  textInput: {
    textAlign: "right",
    margin: 3,
  },
  input: {
    borderBottomColor: "#8e93a1",
    borderBottomWidth: 0.5,
    height: 28,
    backgroundColor: "#fff",
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
