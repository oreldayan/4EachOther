import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default BeerSheva = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <View style={styles.slide}>
          <Image
            source={require("../../assets/BeerShevaCity.jpg")}
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

      {/* ---------------------------- Categories Section ------------------------------------ */}

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => {
            navigation.navigate("EmergencyBeerSheva");
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
            navigation.navigate("Covid19BeerSheva");
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
            navigation.navigate("TeensBeerSheva");
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
            navigation.navigate("OldsBeerSheva");
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

        {/* ---------------------------------------------------------------------- */}

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
          <Text style={styles.categoryBtnTxt}>התנדבויות בגמחים</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => {
            navigation.navigate("freeItems", {
              nameOfCity: "פריטים למסירה בבאר שבע",
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
      </View>

      {/* ---------------------------------------------------------------------- */}

      <View style={styles.categoryContainer}>
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
    marginTop: 5,
    color: "#de4f35",
    fontSize: 12,
    fontWeight: "bold",
  },
});
