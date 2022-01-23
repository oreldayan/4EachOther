import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CardMessage = ({ title, status }) => {
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text numberOfLines={1} style={styles.cardDetails}>
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardMessage;

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 15,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "#33A8FF",
  },
  cardDetails: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
  },
});
