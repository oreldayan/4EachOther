import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default Ofakim = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <View style={styles.slide}>
          <Image
            source={require("../../assets/ofakimCity.jpg")}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.textTitle}>
            אנא בחרו את הקטגוריה שבה תרצו להתנדב
          </Text>
        </View>
      </View>

      <ScrollView>
        {/* ---------------------------- Categories Section ------------------------------------ */}

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("EmergencyOfakim");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/newemergency.jpg")}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>התנדבויות בחירום</Text>
          </TouchableOpacity>

          {/* ---------------------------------------------------------------------- */}

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("covid19ofakim");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/covid.png")}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>התנדבויות בקורונה</Text>
          </TouchableOpacity>

          {/* ---------------------------------------------------------------------- */}

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("teensOfakim");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/teens.png")}
                style={styles.sliderImage}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>התנדבויות לנוער</Text>
          </TouchableOpacity>
        </View>

        {/* ------------------------ANOTHER SECTION------------------------------------ */}

        <View style={styles.categoryContainer}>
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
            <Text style={styles.categoryBtnTxt}>התנדבויות לפי מגדר</Text>
          </TouchableOpacity>

          {/* ---------------------------------------------------------------------- */}

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
            <Text style={styles.categoryBtnTxt}>התנדבויות בשגרה</Text>
          </TouchableOpacity>

          {/* ---------------------------------------------------------------------- */}

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
            <Text style={styles.categoryBtnTxt}>התנדבויות עם קשישים</Text>
          </TouchableOpacity>
        </View>

        {/* ------------------------ANOTHER SECTION------------------------------------ */}

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("freeItems", {
                nameOfCity: "פריטים למסירה באופקים",
              });
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/free.png")}
                style={{
                  height: "100%",
                  width: "117%",
                  alignSelf: "center",
                  borderRadius: 8,
                }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>פריטים למסירה</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("realtime");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/sos.png")}
                style={{
                  height: "100%",
                  width: "100%",
                  alignSelf: "center",
                  borderRadius: 8,
                }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>מעכשיו לעכשיו</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => {
              navigation.navigate("permission");
            }}
          >
            <View style={styles.categoryIcon}>
              <Image
                source={require("../../assets/address.png")}
                style={{
                  height: "100%",
                  width: "100%",
                  alignSelf: "center",
                  borderRadius: 8,
                  backgroundColor: "#FFF",
                }}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>מבוגרים</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
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
    marginTop: 1,
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
    marginTop: 10,
    color: "red",
    fontSize: 12,
    fontWeight: "bold",
  },
});
