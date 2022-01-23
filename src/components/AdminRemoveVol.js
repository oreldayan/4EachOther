import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";

const AdminRemoveVol = ({ route, navigation }) => {
  const { title } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    const ref = firebase
      .firestore()
      .collection(title)
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
  }, []);

  const message = (VolTitle) => {
    Alert.alert("מחיקת פריט", "האם ברצונך למחוק התנדבות זו?", [
      {
        text: "כן",
        onPress: () => {
          deleteVol(title, VolTitle);
        },
      },
      {
        text: "חזור",
        onPress: () => {},
      },
    ]);
  };

  const deleteVol = async (title, VolTitle) => {
    await firebase
      .firestore()
      .collection(title)
      .where("title", "==", VolTitle)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
          alert("ארגון ההתנדבות נמחק בהצלחה");
        });
      });
  };

  return (
    <View>
      <ScrollView>
        {data.map(({ id, dataVal }) => (
          <TouchableOpacity key={id} onPress={() => message(dataVal.title)}>
            <Text style={styles.Cards}>{dataVal.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default AdminRemoveVol;

const styles = StyleSheet.create({
  Cards: {
    borderRadius: 15,
    padding: 10,
    textAlign: "center",
    paddingTop: 28,
    fontSize: 15,
    fontWeight: "bold",
    color: "purple",
  },
});
