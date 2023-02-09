import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import Add from "../../../assets/images/add.svg";
console.log(Add);
export default function RegistrationScreen() {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require("../../../assets/images/bgImage.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View
              style={{
                ...styles.wrap,
                width: windowWidth,
                marginTop: windowWidth > 500 ? 100 : 263,
              }}
            >
              <View
                style={{
                  ...styles.imageThumb,
                  left: (windowWidth - 120) / 2,
                }}
              ></View>
              <TouchableOpacity style={addButton}>
                <Add />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrap: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageThumb: {
    top: -60,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    top: 21,
    width: 25,
    height: 25,
  },
});
