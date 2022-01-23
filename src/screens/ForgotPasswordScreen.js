import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DismissKeyboard from "../components/DismissKeyboard";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState();

  const forgotPassword = async (email) => {
    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log(email);
        alert("קישור להזנת סיסמא חדשה נשלחה למייל בהצלחה!");
      })
      .then(() => navigation.navigate("SignIn"));
    setEmail("");
  };

  const onSubmit = (email) => {
    if (typeof email == "undefined") {
      alert("מייל הוא שדה חובה!");
      return;
    } else {
      forgotPassword(email);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          style={{
            height: 220,
            width: 300,
            margin: 100,
            alignSelf: "center",
          }}
          source={require("../../assets/forgotpass.png")}
        />

        <Text style={styles.titleText}>נא להזין את המייל איתו נרשמתם.</Text>

        <View style={styles.textInputView}>
          <TextInput
            style={styles.input}
            placeholder="מייל"
            autoCompleteType="email"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="email-address"
            onChangeText={(email) => {
              setEmail(email);
            }}
            value={email}
          />
        </View>

        <TouchableOpacity onPress={() => onSubmit(email)}>
          <Text style={styles.sendButton}>שלח</Text>
        </TouchableOpacity>

        <View style={styles.headerGraphic}>
          <View style={styles.rightCircle} />
          <View style={styles.leftCircle} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerGraphic: {
    position: "absolute",
    width: "100%",
    top: -50,
    zIndex: -100,
  },
  rightCircle: {
    backgroundColor: "#23a6d5",
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: 200,
    right: -100,
    top: -200,
  },
  leftCircle: {
    backgroundColor: "#8022d9",
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 150,
    left: -50,
    top: -100,
  },
  textInputView: {
    margin: 20,
  },

  titleText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#33A8FF",
    padding: 0,
  },

  input: {
    borderBottomColor: "#8e93a1",
    borderBottomWidth: 0.5,
    height: 28,
    backgroundColor: "#fff",
    margin: 0,
    textAlign: "center",
  },
  sendButton: {
    textAlign: "center",
    margin: 9,
    paddingTop: 22,
    fontSize: 29,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#33A8FF",
    justifyContent: "center",
  },
});
