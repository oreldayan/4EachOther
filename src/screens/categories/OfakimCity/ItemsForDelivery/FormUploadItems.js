import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FirebaseContext } from "../../../../context/FirebaseContext";
import * as firebase from "firebase";

const FormUploadItems = ({ navigation, route }) => {
  const [photo, setPhoto] = useState();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [city, setCity] = useState();
  const [username, setUsername] = useState();
  const [popUp, setPopUp] = useState(false);
  const firebaseContext = useContext(FirebaseContext);

  const { title } = route.params;
  const uid = firebaseContext.getCurrentUser().uid;

  //Getting the phone number from the user.
  useEffect(() => {
    setTimeout(() => {
      const getData = firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((value) => {
          let number = value.data().phoneNumber;
          let city = value.data().city;
          let username = value.data().username;

          setPhoneNumber(number);
          setCity(city);
          setUsername(username);
        });

      return () => getData();
    }, 500);
  }, []);

  //Ask for permissions
  const getPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    } catch (error) {
      console.log("Error in pickImage ", error);
    }
  };

  const addPhoto = async () => {
    console.log("object");
    const status = await getPermissions();

    if (status !== "granted") {
      alert("בכדי לבחור תמונה נדרשת גישה לתמונות שלך.");
      return;
    }
    pickImage();
  };

  const sendData = async (name, description, photo) => {
    setPopUp(true);

    const remoteUri = await firebaseContext.uploadPhotoAsync(photo);
    console.log(remoteUri);

    return new Promise((res, rej) => {
      firebase
        .firestore()
        .collection(title)
        .add({
          title: name,
          description: description,
          image: remoteUri,
          name: username,
          phone: phoneNumber,
          uid: uid,
          city: city,
        })
        .then((ref) => {
          res(ref);
          // alert("הפריט הועלה בהצלחה! 😊");
          navigation.navigate("shoesofakim");
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  const sendDefaultData = async (name, description, defaultPhoto) => {
    setPopUp(true);

    return new Promise((res, rej) => {
      firebase
        .firestore()
        .collection(title)
        .add({
          title: name,
          description: description,
          image: defaultPhoto,
          name: username,
          phone: phoneNumber,
          uid: uid,
          city: city,
        })
        .then((ref) => {
          res(ref);
          //alert("הפריט הועלה בהצלחה!");
          navigation.navigate("shoesofakim");
        })

        .catch((error) => {
          rej(error);
        });
    });
  };

  const onSubmit = (name, description, photo) => {
    if (
      typeof name == "undefined" ||
      name.length == 0 ||
      typeof description == "undefined" ||
      description.length == 0
    ) {
      alert("נא למלא את כל השדות");
      return;
    }

    if (typeof photo == "undefined") {
      const defaultImage =
        "https://firebasestorage.googleapis.com/v0/b/eachother-59993.appspot.com/o/imgnotfound.png?alt=media&token=b1741111-815a-4da4-8f59-c59912b697bc";
      sendDefaultData(name, description, defaultImage);
    } else {
      sendData(name, description, photo);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <View style={styles.sliderContainer}>
          <View style={styles.slide}>
            <Image
              source={require("../../../../../assets/formUploadItems.png")}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.textTitle}>אנא מלאו את הפרטים הבאים</Text>
        </View>

        <View style={styles.textInputView}>
          <Text style={styles.textInput}>שם הפריט: </Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoFocus={false}
            keyboardType="default"
            onChangeText={(name) => {
              setName(name);
            }}
          />
        </View>

        <View style={styles.textInputView}>
          <Text style={styles.textInput}>תיאור הפריט: </Text>
          <TextInput
            style={styles.input}
            autoCompleteType="name"
            autoFocus={false} // open keyboard automate
            keyboardType="default"
            onChangeText={(details) => {
              setDetails(details);
            }}
          />
          {/* <AutoGrowingTextInput
            style={styles.input}
            onChangeText={(details) => {
              setDetails(details);
            }}
          /> */}
        </View>

        <View style={styles.photo}>
          <TouchableOpacity
            onPress={addPhoto}
            disabled={name.length == 0 && details.length == 0}
          >
            {photo ? (
              <View style={styles.ProfilePhoto}>
                <Image
                  source={{ uri: photo }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            ) : (
              <View style={styles.photo}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>
                  בחרו תמונה
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => onSubmit(name, details, photo)}>
            <Text style={styles.sendButton}>אישור</Text>

            {popUp ? (
              <ProgressDialog
                visible={popUp}
                title="אנא המתינו .."
                message="מעלה את הפריט שבחרתם 😊"
              ></ProgressDialog>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FormUploadItems;

const styles = StyleSheet.create({
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 40,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  input: {
    borderBottomColor: "#8e93a1",
    borderBottomWidth: 0.5,
    height: 48,
    margin: 0,
  },
  textInputView: {
    margin: 20,
  },
  ProfilePhoto: {
    flex: 1,
  },
  photo: {
    backgroundColor: "#e1e2e6",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginTop: 16,
    overflow: "hidden",
  },
  sendButton: {
    textAlign: "center",
    margin: 9,
    paddingTop: 13,
    fontSize: 29,
    fontWeight: "bold",
    color: "#fff",
    borderRadius: 10,
    marginLeft: 43,
    marginRight: 43,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "#33A8FF",
    justifyContent: "center",
  },
});
