import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CustomRadio({ label, selected, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.circle, selected && styles.circleSelected]}>
        {selected && <Ionicons name="checkmark" size={16} color="#27cfc1ff" />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#f6f3f3ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  circleSelected: {
    borderColor: "#f6f5f2ff",
    borderWidth:0.5
  },
  check: {
    fontSize: 14,
    color: "#ff4081",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#f4f0f0ff",
  },
});
