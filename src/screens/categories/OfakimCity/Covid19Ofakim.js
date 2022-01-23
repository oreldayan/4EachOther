import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import CardVol from "../../../components/CardVol";

const Covid19Ofakim = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    const ref = firebase
      .firestore()
      .collection("ofakim_covid19")
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

  return (
    <View>
      <Image
        source={require("../../../../assets/covid19Cover.png")}
        resizeMode="cover"
        style={{ height: "45%", width: "100%" }}
      />
      <ScrollView>
        {data.map(({ id, dataVal }) => (
          <TouchableOpacity
            key={id}
            onPress={() => {
              navigation.navigate("viewContents", {
                title: dataVal.title,
                subtitle: dataVal.subtitle,
                description: dataVal.description,
                image: dataVal.image,
              });
            }}
          >
            <CardVol
              title={dataVal.title}
              description={dataVal.description}
              image={dataVal.image}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
export default Covid19Ofakim;
