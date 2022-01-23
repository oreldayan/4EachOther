import React, { useRef, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import * as Animatable from "react-native-animatable";
import { UserContext } from "../context/UserContext";
import * as firebase from "firebase";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 350;

const CardViewShoesOfakim = ({ route, navigation }) => {
  const { title, phone, description, image, nameOfProduct } = route.params;
  const navTitleView = useRef(null);
  const [user] = useContext(UserContext);
  const [data, setdata] = useState(false);

  const userId = firebase.auth().currentUser.uid;

  useEffect(() => {
    const ref = firebase
      .firestore()
      .collection(nameOfProduct)
      .where("title", "==", title)
      .where("uid", "==", userId)
      .onSnapshot((snapshot) => {
        snapshot.forEach((querySelect) => {
          test(querySelect.data().uid, userId);
        });
      });

    return () => ref();
  }, []);

  const test = (uid, userId) => {
    if (uid == userId) {
      setdata(true);
    } else {
      setdata(false);
    }
  };

  var deleteFields = async (nameOfProduct, title, uid) => {
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
        navigation.goBack();
      });
  };

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image source={{ uri: image }} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{title}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{title}</Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.title}>פרטים על הנעליים</Text>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{description}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.title}>יצירת קשר עם המוסר</Text>
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{phone}</Text>
        </View>

        {data ? (
          <TouchableOpacity
            onPress={() => Options(title, nameOfProduct, userId)}
          >
            <Text
              style={{
                paddingTop: 15,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
                backgroundColor: "#33A8FF",
                borderRadius: 28,
                color: "white",
              }}
            >
              עריכת פריט
            </Text>
          </TouchableOpacity>
        ) : null}
      </HeaderImageScrollView>
    </View>
  );
};
export default CardViewShoesOfakim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  buttonStyle: {
    color: "red",
    marginTop: 20,
    padding: 20,
    backgroundColor: "green",
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  vol: {
    flexDirection: "row",
    alignItems: "stretch",
    alignContent: "space-between",
  },
  name: {
    fontWeight: "bold",
  },
  section: {
    padding: 20,
    borderBottomWidth: 5,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
    alignContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContent: {
    fontSize: 16,
    textAlign: "justify",
    alignContent: "center",
    alignItems: "center",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  categoryContainer: {
    flexDirection: "row",
    backgroundColor: "#33A8FF",
    borderRadius: 20,
    margin: 4,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  imageTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 24,
    fontWeight: "bold",
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  sectionLarge: {
    minHeight: 100,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#33A8FF",
    alignItems: "center",
    marginTop: 10,
  },
});
