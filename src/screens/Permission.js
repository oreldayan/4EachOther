import React, { useEffect, useState } from "react";
import { Platform, Text, View, StyleSheet, Linking } from "react-native";
import * as firebase from "firebase";
import { Card } from "@paraboly/react-native-card";
import { Wander } from "react-native-animated-spinkit";

const Permission = () => {
  const [Auth, setAuth] = useState(false);
  const [data, setData] = useState([]);
  const [city, setCity] = useState("sd");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(async () => {
      const uid = firebase.auth().currentUser.uid;

      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .onSnapshot((snapshot) => {
          var userCity = snapshot.data().city;
          setCity(userCity);
        });

      return () => clearTimeout(timer);
    }, 500);
  }, [city]);

  useEffect(() => {
    let timer = setTimeout(async () => {
      firebase
        .firestore()
        .collection("permission")
        .where("city", "==", city)
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

      return () => clearTimeout(timer);
    }, 500);
  }, [data]);

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;

    const checkPermission = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => {
        var bool = snapshot.data().permission;
        setAuth(bool);
      });

    return () => checkPermission();
  }, [Auth]);

  useEffect(() => {
    let timer = setTimeout(async () => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const openMap = async (lat, lng, name) => {
    /** Open google maps */
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${lat},${lng}`;
    const label = "הבית של " + name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    await Linking.openURL(url);
  };

  return (
    <View>
      {loading ? (
        <Wander
          size={90}
          color="#33A8FF"
          animating={loading}
          style={{ alignSelf: "center", marginTop: 250 }}
        />
      ) : null}
      {Auth && (
        <View>
          <View>
            {data.map(({ id, dataVal }) => (
              <Card
                key={id}
                title={dataVal.name}
                iconName="home"
                iconType="Entypo"
                topRightText={"לחצו כאן לניווט לכתובת"}
                bottomRightText={dataVal.city}
                description={dataVal.street}
                onPress={() =>
                  openMap(dataVal.latitude, dataVal.longitude, dataVal.name)
                }
                style={{ marginHorizontal: 10, marginTop: 10 }}
              />
            ))}
          </View>
        </View>
      )}
      {Auth == false && (
        <View>
          <Text>אין לך גישה לצפות בתוכן זה</Text>
        </View>
      )}
    </View>
  );
};

export default Permission;

const styles = StyleSheet.create({});
