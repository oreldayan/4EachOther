import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import DismissKeyboard from "../../components/DismissKeyboard";
import * as firebase from "firebase";

const EditMessages = ({ navigation, route }) => {
  const [newtitle, setNewTitle] = useState("");
  const [newTextMessages, setNewTextMessages] = useState("");
  const [oldtitle, setOldTitle] = useState("");
  const [oldTextMessages, setOldTextMessages] = useState("");

  const { titleTextMessage, textMessage } = route.params;

  useEffect(() => {
    const getOldDetails = firebase
      .firestore()
      .collection("AdminMessages")
      .where("titleTextMessage", "==", titleTextMessage)
      .where("textMessage", "==", textMessage)
      .onSnapshot((snapshot) => {
        let oldtitleTextMessage;
        let oldTextMessages;

        snapshot.forEach((doc) => {
          oldtitleTextMessage = doc.data().titleTextMessage;
          oldTextMessages = doc.data().textMessage;
        });

        console.log(oldtitleTextMessage);

        setOldTitle(oldtitleTextMessage);
        setOldTextMessages(oldTextMessages);
      });

    return () => getOldDetails();
  }, []);

  const onSubmit = async (
    oldtitle,
    oldTextMessages,
    newtitle,
    newTextMessages
  ) => {
    if (newtitle == "" && newTextMessages == "") {
      navigation.goBack();
    } else if (newtitle != "" && newTextMessages == "") {
      await firebase
        .firestore()
        .collection("AdminMessages")
        .where("titleTextMessage", "==", oldtitle)
        .where("textMessage", "==", oldTextMessages)
        .get()
        .then((query) => {
          const updating = query.docs[0];
          updating.ref.update({
            titleTextMessage: newtitle,
          });
          alert("הכותרת עודכנה בהצלחה 😊");
          navigation.goBack();
        });
    } else if (newtitle == "" && newTextMessages != "") {
      await firebase
        .firestore()
        .collection("AdminMessages")
        .where("titleTextMessage", "==", oldtitle)
        .where("textMessage", "==", oldTextMessages)
        .get()
        .then((query) => {
          const updating = query.docs[0];
          updating.ref.update({
            textMessage: newTextMessages,
          });
          alert("תוכן ההודעה עודכן בהצלחה 😊");
          navigation.goBack();
        });
    } else if (newtitle != "" && newTextMessages != "") {
      await firebase
        .firestore()
        .collection("AdminMessages")
        .where("titleTextMessage", "==", oldtitle)
        .where("textMessage", "==", oldTextMessages)
        .get()
        .then((query) => {
          const updating = query.docs[0];
          updating.ref.update({
            titleTextMessage: newtitle,
            textMessage: newTextMessages,
          });
          alert("הכותרת ותוכן ההודעה עודכנו בהצלחה 😊");
          navigation.goBack();
        });
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/edit.png")}
          style={{ width: "100%", height: "45%" }}
        />
        <View style={styles.textInputView}>
          <Text style={styles.textInput}>כותרת</Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            placeholder={oldtitle}
            onChangeText={(newtitle) => {
              setNewTitle(newtitle);
            }}
            value={newtitle}
            defaultValue={oldtitle}
          />
        </View>

        <View style={styles.textInputView}>
          <Text style={styles.textInput}>תוכן ההודעה</Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            placeholder={oldTextMessages}
            onChangeText={(newtextMessage) => {
              setNewTextMessages(newtextMessage);
            }}
            value={newTextMessages}
            defaultValue={oldTextMessages}
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            onSubmit(oldtitle, oldTextMessages, newtitle, newTextMessages)
          }
        >
          <Text style={styles.sendButton}>עדכן</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
};

export default EditMessages;

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
