import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require("../../../assets/images/bgImage.png")}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: { flex: 1, resizeMode: "cover", justifyContent: "flex-end" },
});
