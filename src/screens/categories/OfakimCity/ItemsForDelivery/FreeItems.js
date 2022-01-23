import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as firebase from "firebase";

const FreeItems = ({ navigation, route }) => {
  const [city, setCity] = useState();
  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    const checkCity = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setCity(doc.data().city);
        }
      });

    return () => checkCity();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <View style={styles.slide}>
          <Image
            source={require("../../../../../assets/giving.png")}
            resizeMode="cover"
            style={styles.sliderImage}
          />
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.textTitle}>אנא בחרו את הקטגוריה המתאימה</Text>
        </View>
      </View>

      {/* ---------------------------- Categories Section ------------------------------------ */}

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => {
            navigation.navigate("shoesofakim", {
              title: "shoes",
              name: "נעליים למסירה",
              city: city,
            });
          }}
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../../../../../assets/shoesIcon1.png")}
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>נעליים</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => {
            navigation.navigate("shoesofakim", {
              title: "clothes",
              name: "בגדים למסירה",
              city: city,
            });
          }}
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../../../../../assets/clothesIcon.png")}
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>בגדים</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => {
            navigation.navigate("shoesofakim", {
              title: "furniture",
              name: "ריהוט למסירה",
              city: city,
            });
          }}
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../../../../../assets/furnitureIcon.png")}
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>ריהוט</Text>
        </TouchableOpacity>
      </View>

      {/* ---------------------------- Categories Section ------------------------------------ */}

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => {
            navigation.navigate("shoesofakim", {
              title: "electronics",
              name: "מוצרי חשמל למסירה",
              city: city,
            });
          }}
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../../../../../assets/electronicsIcon.png")}
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>מוצרי חשמל</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => {
            navigation.navigate("shoesofakim", {
              title: "housewares",
              name: "כלי בית למסירה",
              city: city,
            });
          }}
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../../../../../assets/housewaresIcon.png")}
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>כלי בית</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => {
            navigation.navigate("shoesofakim", {
              title: "books",
              name: "ספרים למסירה",
              city: city,
            });
          }}
        >
          <View style={styles.categoryIcon}>
            <Image
              source={require("../../../../../assets/booksIcon.png")}
              style={styles.sliderImage}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>ספרים</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FreeItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 40,
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
