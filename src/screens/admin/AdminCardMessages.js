import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AdminCardMessages = ({ title, status, fullName, phoneNumber, city }) => {
  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>שם המתנדב: {fullName}</Text>
          <Text style={styles.cardTitle}>שם ההתנדבות: {title}</Text>
          <Text style={styles.cardTitle}>מס' טלפון: {phoneNumber}</Text>
          <Text style={styles.cardTitle}>עיר: {city} </Text>
          <Text numberOfLines={1} style={styles.cardDetails}>
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AdminCardMessages;

const styles = StyleSheet.create({
  card: {
    height: 125,
    marginVertical: 15,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
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
    fontSize: 17,
    textAlign: "center",
    color: "#33A8FF",
  },
  cardDetails: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
  },
});
