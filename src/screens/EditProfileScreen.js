import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TextInput } from "react-native";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import DismissKeyboard from "../components/DismissKeyboard";

export default EditProfileScreen = ({ navigation }) => {
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();

  //TODO: cleanup
  const updateData = async () => {
    const uid = firebase.auth().currentUser.uid;

    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        username: username,
        phoneNumber: phone,
      })
      .then(() => {
        setPhone("");
        setUsername("");
        alert("הפרטים עודכנו בהצלחה!");
        navigation.navigate("profile");
      })
      .catch((error) => {
        alert("שגיאה בעדכון נתונים.", error);
      });
  };

  const onSubmit = (username, phone) => {
    if (typeof phone == "undefined" || phone.length == 0) {
      alert("שגיאה! מספר טלפון הוא שדה חובה");
      return;
    } else if (typeof username == "undefined" || username.length == 0) {
      alert("שגיאה! שם מלא הוא שדה חובה");
      return;
    } else if (phone.length < 10) {
      alert("מספר טלפון באורך לא תקין");
      return;
    } else {
      updateData();
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Image
          source={require("../../assets/edit.png")}
          style={{ width: "100%", height: "45%" }}
        />
        <View style={styles.textInputView}>
          <Text style={styles.textInput}>שם משתמש: </Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            onChangeText={(username) => {
              setUsername(username);
            }}
            value={username}
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

        <TouchableOpacity onPress={() => onSubmit(username, phone)}>
          <Text style={styles.sendButton}>עדכן</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
};

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
    margin: 10,
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
    marginLeft: 55,
    marginRight: 55,
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#33A8FF",
    justifyContent: "center",
  },
});
