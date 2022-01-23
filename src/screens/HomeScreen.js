import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";

const HomeScreen = ({ navigation }) => {
  const [err, setErr] = useState();
  const [AllMessages, setAllMessages] = useState([]);
  const [city, setCity] = useState("sd");

  useEffect(() => {
    setTimeout(async () => {
      const uid = firebase.auth().currentUser.uid;

      const checkCity = firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .onSnapshot((snapshot) => {
          var userCity = snapshot.data().city;
          setCity(userCity);
        });

      return () => checkCity();
    }, 500);
  }, [city]);

  useEffect(() => {
    setTimeout(async () => {
      const messageScreen = firebase
        .firestore()
        .collection("AdminMessages")
        .where("city", "==", city)
        .onSnapshot(
          (snapshot) => {
            setAllMessages(
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

      return () => messageScreen();
    }, 500);
  }, [AllMessages]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Image
              style={{
                resizeMode: "contain",
                height: 190,
                width: 600,
                alignSelf: "center",
                marginTop: -60,
              }}
              source={require("../../assets/bg.png")}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "center",
              marginTop: -20,
            }}
          >
            שלום 👋
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textAlign: "center",
              marginTop: 0,
            }}
          >
            במה תרצו להתנדב היום?
          </Text>
          <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                },
              ]}
            ></View>
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.textTitle}>קטגוריות</Text>
          </View>

          <View style={styles.categoryContainer2}>
            {city == "אופקים" ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: -10, marginTop: 0 }}
              >
                <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => {
                    navigation.navigate("religionOfakim");
                  }}
                >
                  <View style={styles.categoryIcon}>
                    <Image
                      source={require("../../assets/religion.png")}
                      style={styles.sliderImage}
                    />
                  </View>
                  <Text style={styles.categoryBtnTxt}>מגדר</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => {
                    navigation.navigate("oldsOfakim");
                  }}
                >
                  <View style={styles.categoryIcon}>
                    <Image
                      source={require("../../assets/old.png")}
                      style={styles.sliderImage}
                    />
                  </View>
                  <Text style={styles.categoryBtnTxt}>קשישים</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => {
                    navigation.navigate("routineOfakim");
                  }}
                >
                  <View style={styles.categoryIcon}>
                    <Image
                      source={require("../../assets/routine.png")}
                      style={styles.sliderImage}
                    />
                  </View>
                  <Text style={styles.categoryBtnTxt}>שגרה</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => {
                    navigation.navigate("Ofakim_HomeStack");
                  }}
                >
                  <View style={styles.categoryIcon}>
                    <Image
                      source={require("../../assets/plus.png")}
                      style={styles.sliderImage}
                    />
                  </View>
                  <Text style={styles.categoryBtnTxt}>קטגוריות נוספות</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : city == "באר שבע" ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: -10, marginTop: 0 }}
              >
                <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => {
                    navigation.navigate("GmachBeerSheva");
                  }}
                >
                  <View style={styles.categoryIcon}>
                    <Image
                      source={require("../../assets/give.png")}
                      style={styles.sliderImage}
                    />
                  </View>
                  <Text style={styles.categoryBtnTxt}>גמחים</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => {
                    navigation.navigate("OldsBeerSheva");
                  }}
                >
                  <View style={styles.categoryIcon}>
                    <Image
                      source={require("../../assets/old.png")}
                      style={styles.sliderImage}
                    />
                  </View>
                  <Text style={styles.categoryBtnTxt}>קשישים</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => {
                    navigation.navigate("TeensBeerSheva");
                  }}
                >
                  <View style={styles.categoryIcon}>
                    <Image
                      source={require("../../assets/teens.png")}
                      style={styles.sliderImage}
                    />
                  </View>
                  <Text style={styles.categoryBtnTxt}>נוער</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => {
                    navigation.navigate("BeerSheva_HomeStack");
                  }}
                >
                  <View style={styles.categoryIcon}>
                    <Image
                      source={require("../../assets/plus.png")}
                      style={styles.sliderImage}
                    />
                  </View>
                  <Text style={styles.categoryBtnTxt}>קטגוריות נוספות</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : null}
          </View>

          <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                },
              ]}
            ></View>
          </View>

          {/* ---------------------------------------------- */}

          <View>
            <Text style={styles.messageText}>הודעות</Text>
          </View>

          <View>
            {AllMessages.map(({ id, dataVal }) => (
              <TouchableOpacity
                key={id}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  padding: 20,
                  marginHorizontal: 20,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#20232a",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Image
                  source={require("../../assets/HomeMessage.jpg")}
                  style={{ width: 40, height: 40 }}
                />
                <View>
                  <Text
                    style={{
                      color: "#345c74",
                      fontWeight: "bold",
                      fontSize: 13,
                      paddingHorizontal: 20,
                      width: 170,
                      textAlign: "right",
                      left: 20,
                    }}
                  >
                    {dataVal.titleTextMessage}
                  </Text>
                  <Text
                    style={{
                      color: "#de4f35",
                      fontWeight: "bold",
                      fontSize: 12,
                      paddingHorizontal: 20,
                      top: 3,
                      textAlign: "right",
                    }}
                  >
                    {dataVal.textMessage}
                  </Text>

                  <Text
                    style={{
                      color: "#345c74",
                      fontWeight: "100",
                      fontSize: 12,
                      paddingHorizontal: 20,
                      top: 5,
                      textAlign: "right",
                    }}
                  >
                    מאת: {dataVal.username}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "rgb(270, 228, 228)",
    backgroundColor: "#ffffff",
  },
  textTitle: {
    fontSize: 19,
    color: "black",
    fontWeight: "bold",
    marginLeft: 140,
    paddingBottom: 15,
    textAlign: "center",
    textDecorationLine: "underline",
    paddingTop: 0,
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  slider: {
    height: "200%",
    width: "200%",
    alignSelf: "center",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 7,
    marginBottom: 5,
  },
  categoryContainer2: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    marginTop: 0,
    marginBottom: 5,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    left: 10,
    backgroundColor: "#fdeae7" /* '#FF6347' */,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "#de4f35",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    flexDirection: "row",
    height: 20,
  },
  infoBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    paddingTop: 15,
    color: "#422245",
    textAlign: "center",
    fontSize: 13,
    fontSize: 19,
    color: "black",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
