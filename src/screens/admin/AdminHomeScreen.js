import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default AdminHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <View style={styles.slide}>
          <Image
            source={require("../../../assets/manager.jpeg")}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.textTitle}>שלום מנהל/ת התנדבויות!</Text>
      </View>

      {/* ---------------------------- Categories Section ------------------------------------ */}
      <ScrollView>
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("addNewVol");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../../assets/addadmin.png")}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>הוספת התנדבות חדשה</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("showRequests");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../../assets/requestadmin.png")}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>בקשות ממתינות להתנדבות</Text>
          </TouchableOpacity>
        </View>

        {/* NEW SECTION */}

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("removeVol");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../../assets/deleteVol.png")}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.categoryBtnTxt}> מחיקת התנדבויות מהמאגר</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("admininformation");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../../assets/infoCategory.png")}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.categoryBtnTxt}> מידע נוסף</Text>
          </TouchableOpacity>
        </View>

        {/* NEW SECTION */}

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("AddNewMessage");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../../assets/HomeMessage.jpg")}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>הוספת הודעה חדשה</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("allMessages");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../../assets/message.jpg")}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>עריכת הודעות</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 85,
    textAlign: "center",
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
    marginTop: 25,
    marginBottom: 10,
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
    backgroundColor: "#fdeae7" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 5,
    color: "#de4f35",
    fontSize: 14,
    fontWeight: "bold",
  },
});
