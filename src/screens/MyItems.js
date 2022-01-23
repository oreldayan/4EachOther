import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import * as firebase from "firebase";
import CardMessage from "../components/CardMessage";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";

const MyItems = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState();
  const [pickerValue, setPickerValue] = useState("books");


  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;

    const ref = firebase
      .firestore()
      .collection(pickerValue)
      .where("uid", "==", uid)
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

    return () => ref();
  }, [pickerValue]);

  const Options = (title, nameOfProduct, userId) => {
    Alert.alert("עריכת פריט", "בחר את האופציה הרלוונטית", [
      {
        text: "עריכת פריט",
        onPress: () => {
          navigation.navigate("editItems", {
            title: title,
            nameOfProduct: nameOfProduct,
          });
        },
      },
      {
        text: "מחיקת פריט",
        onPress: () => {
          deleteFields(nameOfProduct, title, userId);
        },
      },
      {
        text: "חזור",
        onPress: () => {},
      },
    ]);
  };

  const deleteFields = async (nameOfProduct, title, uid) => {
    await firebase
      .firestore()
      .collection(nameOfProduct)
      .where("uid", "==", uid)
      .where("title", "==", title)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
          alert("הפריט נמחק בהצלחה!");
        });
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: "60%",
          height: "30%",
          marginLeft: 80,
        }}
        source={require("../../assets/notifications.png")}
      />
      <View>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {" "}
          באיזור זה תוכלו לצפות בפריטים למסירה שהעלתם
        </Text>
      </View>

      <View>
        <Picker
          style={{ width: "100%" }}
          selectedValue={pickerValue}
          onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}
        >
          <Picker.Item label="ספרים למסירה" value="books" />
          <Picker.Item label="מוצרי חשמל למסירה" value="electronics" />
          <Picker.Item label="ריהוט למסירה" value="furniture" />
          <Picker.Item label="כלי בית למסירה" value="housewares" />
          <Picker.Item label="נעליים למסירה" value="shoes" />
          <Picker.Item label="בגדים למסירה" value="clothes" />
        </Picker>
      </View>

      <ScrollView>
        {data.map(({ id, dataVal }) => (
          <TouchableOpacity
            key={id}
            onPress={() => {
              Options(dataVal.title, pickerValue, dataVal.uid);
            }}
          >
            <CardMessage title={dataVal.title} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
