import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import CardSOS from "../../../components/CardSOS";

const Realtime = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    const ref = firebase
      .firestore()
      .collection("ofakim_realtime")
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
    <ScrollView>
      <View>
        {data.map(({ id, dataVal }) => (
          //   <TouchableOpacity
          //     key={id}
          //     onPress={() => {
          //       navigation.navigate("viewContents", {
          //         title: dataVal.title,
          //         subtitle: dataVal.subtitle,
          //         description: dataVal.description,
          //         image: dataVal.image,
          //       });
          //     }}
          //   >
          <CardSOS
            key={id}
            title={dataVal.title}
            description={dataVal.description}
            image={dataVal.image}
            maxVol={dataVal.max}
          />
          //   </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Realtime;
