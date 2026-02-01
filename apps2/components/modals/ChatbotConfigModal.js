import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import CustomRadio from "../tools/CustomRadio";

const ChatbotConfigModal = ({ visible, onClose, goToChat }) => {
  const [level, setLevel] = useState("beginner");
  const [language, setLanguage] = useState("english-us");
  const [readingSpeed, setReadingSpeed] = useState("Slow");
  const [voice, setVoice] = useState("homme");
  const [discussionMode, setDiscussionMode] = useState("discussionOralPriority");


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>Chatbot Configuration</Text>
                </View>

                <View style={{ width: 24 }} />
              </View>

              {/* Level */}
              <Text style={styles.label}>Level</Text>
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={[
                    { label: "Beginner", value: "beginner" },
                    { label: "Intermediate", value: "intermediate" },
                    { label: "Advanced", value: "advanced" },
                  ]}
                  labelField="label"
                  valueField="value"
                  placeholder="Select level"
                  value={level}
                  onChange={(item) => setLevel(item.value)}
                />
              </View>

              {/* Languages */}
              <Text style={styles.label}>Languages</Text>
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={[
                    { label: "English (US)", value: "english-us" },
                    { label: "English (UK)", value: "english-uk" },
                    { label: "French", value: "french" },
                    { label: "Spanish", value: "Spanish" },
                    { label: "Deutch", value: "german" },
                    { label: "Italian", value: "italian" },
                    { label: "Portuguese", value: "portuguese" },
                    { label: "Espanol", value: "espanol" },
                  ]}
                  labelField="label"
                  valueField="value"
                  placeholder="Select language"
                  value={language}
                  onChange={(item) => setLanguage(item.value)}
                />
              </View>

              {/* Reading Speed */}
              <Text style={styles.label}>Reading Speed</Text>
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={[
                    { label: "Slow", value: "Slow" },
                    { label: "Normal", value: "Normal" },
                    { label: "Fast", value: "Fast" },
                  ]}
                  labelField="label"
                  valueField="value"
                  placeholder="Select speed"
                  value={readingSpeed}
                  onChange={(item) => setReadingSpeed(item.value)}
                />
              </View>

              {/* Voice */}
              <Text style={styles.label}>Voice</Text>
              <View style={styles.radioGroup}>
                <CustomRadio
                  label="Female"
                  selected={voice === "femme"}
                  onPress={() => setVoice("femme")}
                />
                <View
                style={{
                  marginLeft:30
                }}
                >
                  <CustomRadio
                    label="Male"
                    selected={voice === "homme"}
                    onPress={() => setVoice("homme")}
                  />
                </View>
              </View>
              

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "white",
                  padding: 5,
                }}
              >
                <Text style={styles.label}>Discussion Mode</Text>

                <View style={{ marginLeft: 30 }}>
                  <CustomRadio
                    label="Systematic error correction"
                    selected={discussionMode === "correctionSystematic"}
                    onPress={() => setDiscussionMode("correctionSystematic")}
                  />
                </View>

                <View style={{ marginLeft: 30 }}>
                  <CustomRadio
                    label="Prioritize oral discussion"
                    selected={discussionMode === "discussionOralPriority"}
                    onPress={() => setDiscussionMode("discussionOralPriority")}
                  />
                </View>

                <View style={{ marginLeft: 30 }}>
                  <CustomRadio
                    label="Oral quiz"
                    selected={discussionMode === "oralQuiz"}
                    onPress={() => setDiscussionMode("oralQuiz")}
                  />
                </View>
              </View>
              {/* <Text style={{ color: "white" }}>
                Mode sélectionné : {discussionMode || "Aucun"}
              </Text> */}

              {/* Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  const config = {
                    level,
                    language,
                    readingSpeed,
                    voice,
                    discussionMode
                  };
                  goToChat(config);
                }}
              >
                <Text style={styles.buttonText}>Go to the Chatbot</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ChatbotConfigModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    margin: 20,
    backgroundColor: "#198754",
    borderRadius: 12,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  backButton: {
    width: 24,
    alignItems: "flex-start",
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  // label: {
  //   color: "#fff",
  //   marginTop: 10,
  //   fontWeight: "600",
  // },
  dropdownContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#e4a022ff",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#d4cbcbff",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#fff",
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    color: "#fff",
    marginRight: 15,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#f5a623",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
    customRadio: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#157479ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e2dedfff",
  },
  label: {
    fontSize: 16,
    color: "white",
  },
});
