import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import DismissKeyboard from "./DismissKeyboard";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditItems = ({ navigation, route }) => {
  const [newtitle, setTitle] = useState("");
  const [newdetails, setDetails] = useState("");

  const [oldtitle, setOldTitle] = useState("");
  const [oldimage, setOldImage] = useState();
  const [olddetails, setOldDetails] = useState("");
  const [docid, setDocId] = useState("");

  console.log(docid);

  const { title, nameOfProduct } = route.params;
  console.log(title);

  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    const getTitle = firebase
      .firestore()
      .collection(nameOfProduct)
      .where("title", "==", title)
      .where("uid", "==", uid)
      .onSnapshot((snapshot) => {
        let oldtitle;
        let olddetails;
        let oldimage;
        snapshot.forEach((doc) => {
          oldtitle = doc.data().title;
          olddetails = doc.data().description;
          oldimage = doc.data().image;
        });
        setOldTitle(oldtitle);
        setOldImage(oldimage);
        setOldDetails(olddetails);
      });

    return () => getTitle();
  }, []);

  const onSubmit = async (oldtitle, olddesc, newtitle, newdetails) => {
    if (newtitle == "" && newdetails == "") {
      navigation.goBack();
    } else if (newtitle != "" && newdetails == "") {
      await firebase
        .firestore()
        .collection(nameOfProduct)
        .where("title", "==", oldtitle)
        .where("description", "==", olddesc)
        .where("uid", "==", uid)
        .get()
        .then((query) => {
          const updating = query.docs[0];
          updating.ref.update({
            title: newtitle,
          });
          alert("הפריט עודכן בהצלחה 😊");
          navigation.goBack();
        });
    } else if (newtitle == "" && newdetails != "") {
      await firebase
        .firestore()
        .collection(nameOfProduct)
        .where("title", "==", oldtitle)
        .where("description", "==", olddesc)
        .where("uid", "==", uid)
        .get()
        .then((query) => {
          const updating = query.docs[0];
          updating.ref.update({
            description: newdetails,
          });
          alert("הפריט עודכן בהצלחה 😊");
          navigation.goBack();
        });
    } else if (newtitle != "" && newdetails != "") {
      await firebase
        .firestore()
        .collection(nameOfProduct)
        .where("title", "==", oldtitle)
        .where("description", "==", olddesc)
        .where("uid", "==", uid)
        .get()
        .then((query) => {
          const updating = query.docs[0];
          updating.ref.update({
            title: newtitle,
            description: newdetails,
          });
          alert("הפריט עודכן בהצלחה 😊");
          navigation.goBack();
        });
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
          <Text style={styles.textInput}>שם הפריט</Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            placeholder={oldtitle}
            onChangeText={(newtitle) => {
              setTitle(newtitle);
            }}
            value={newtitle}
            defaultValue={oldtitle}
          />
        </View>

        <View style={styles.textInputView}>
          <Text style={styles.textInput}>תיאור</Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="default"
            placeholder={olddetails}
            onChangeText={(newdetails) => {
              setDetails(newdetails);
            }}
            value={newdetails}
            defaultValue={olddetails}
          />
        </View>

        <TouchableOpacity
          onPress={() => onSubmit(oldtitle, olddetails, newtitle, newdetails)}
        >
          <Text style={styles.sendButton}>עדכן</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
};

export default EditItems;

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
