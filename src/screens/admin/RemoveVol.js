import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import * as firebase from "firebase";
import { FirebaseContext } from "../../context/FirebaseContext";
import { Card } from "react-native-shadow-cards";
import { Button } from "react-native";

const RemoveVol = ({ navigation }) => {
  const [city, setCity] = useState("");
  const firebaseContext = useContext(FirebaseContext);

  useEffect(() => {
    const uid = firebaseContext.getCurrentUser().uid;

    const checkCity = firebase
      .firestore()
      .collection("admins")
      .doc(uid)
      .onSnapshot((snapshot) => {
        var userCity = snapshot.data().city;
        setCity(userCity);
      });

    return () => checkCity();
  }, [city]);

  return (
    <View style={styles.container}>
      {city == "אופקים" ? (
        <ScrollView>
          <Card style={{ padding: 10, margin: 10, paddingTop: 2, left: 12 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}
            >
              אנא בחר את הקטגוריה הרצויה
            </Text>
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "ofakim_emergency",
                });
              }}
              title="התנדבות בחירום"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "ofakim_olds",
                });
              }}
              title="התנדבות עם מבוגרים"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "ofakim_covid19",
                });
              }}
              title="התנדבויות בקורונה"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "ofakim_teens",
                });
              }}
              title="התנדבויות לנוער"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "ofakim_religion",
                });
              }}
              title="התנדבויות לפי מגדר"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "ofakim_routine",
                });
              }}
              title="התנדבויות בשגרה"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "realtime",
                });
              }}
              title="מעכשיו לעכשיו - כללי"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "realtimeAdults",
                });
              }}
              title="מעכשיו לעכשיו - מבוגרים"
              color="#841584"
            />
          </Card>
        </ScrollView>
      ) : (
        <ScrollView>
          <Card style={{ padding: 10, margin: 10, paddingTop: 2 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}
            >
              אנא בחר את הקטגוריה הרצויה
            </Text>
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "beersheva_emergency",
                });
              }}
              title="התנדבות בחירום"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "beersheva_covid19",
                });
              }}
              title="התנדבויות בקורונה"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "beersheva_teens",
                });
              }}
              title="התנדבויות לנוער"
              color="#841584"
            />
          </Card>
          <Card style={{ padding: 10, margin: 20, paddingTop: 2 }}>
            <Button
              onPress={() => {
                navigation.navigate("adminRemoveVol", {
                  title: "beersheva_gmach",
                });
              }}
              title="התנדבויות בגמחים"
              color="#841584"
            />
          </Card>
        </ScrollView>
      )}
    </View>
  );
};

export default RemoveVol;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
