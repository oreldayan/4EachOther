import React, { useRef, useContext, useEffect, useState } from "react";
import { View, Text, Image, StatusBar, Platform } from "react-native";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import * as Animatable from "react-native-animatable";
import { UserContext } from "../context/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { FirebaseContext } from "../context/FirebaseContext";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 350;

const CardViewRealtime = ({ route, navigation }) => {
  const { title, subtitle, description, image } = route.params;
  const navTitleView = useRef(null);
  const [data, setdata] = useState(false);
  const firebaseContext = useContext(FirebaseContext);

  //check if the user already sign to vol.
  useEffect(() => {
    const userId = firebaseContext.getCurrentUser.uid;
    const ref = firebase
      .firestore()
      .collection("requests")
      .where("title", "==", title)
      .where("uid", "==", userId)
      .onSnapshot((snapshot) => {
        snapshot.forEach((querySelect) => {
          test(querySelect.data().title);
        });
      });

    return () => ref();
  }, []);

  const test = (titleParam) => {
    if (titleParam == title) {
      setdata(true);
    } else {
      setdata(false);
    }
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
            <Text style={styles.title}>מידע על ההתנדבות</Text>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{subtitle}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.title}>פעילות</Text>
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{description}</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.title}>מעוניין להתנדב?</Text>
        </View>
        <View style={styles.sectionLarge}>
          <TouchableOpacity
            disabled={data}
            style={styles.commandButton}
            onPress={() => {
              navigation.navigate("formTextInput", { title: title });
            }}
          >
            <Text style={styles.panelButtonTitle}>לחץ כאן</Text>
          </TouchableOpacity>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};

export default CardViewRealtime;
