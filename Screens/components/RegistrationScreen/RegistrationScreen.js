import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Add from "../../../assets/images/add.svg";
const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [isFocusedLogin, setIsFocusedLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    Dimensions.addEventListener("change", onChange);

    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  const loginSave = (login) => setLogin(login);
  const emailSave = (email) => setEmail(email);
  const passwprdSave = (password) => setPassword(password);

  const onLogin = () => {
    if (!login.trim() || !email.trim() || !password.trim()) {
      Alert.alert(`Все поля должны быть заполнены!`);
      return;
    }
    Alert.alert(`${login}, успешно зарегистрирован!`);
    console.log(login, email, password);
    setLogin("");
    setEmail("");
    setPassword("");
    Keyboard.dismiss();
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const [fonts] = useFonts({
    RobotoBold: require("../../../assets/fonts/Roboto-Bold.ttf"),
    Roboto: require("../../../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayout = useCallback(async () => {
    if (fonts) {
      await SplashScreen.hideAsync();
    }
  }, [fonts]);

  if (!fonts) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      onLayout={onLayout}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ImageBackground
            style={{
              ...styles.imageBG,
              width: windowWidth,
              height: windowHeight,
            }}
            source={require("../../../assets/images/bgImage.png")}
          >
            <ScrollView>
              <View
                style={{
                  ...styles.wrapper,
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
                <TouchableOpacity
                  style={{
                    ...styles.addButton,
                    left: windowWidth / 2 + 48,
                  }}
                >
                  <Add />
                </TouchableOpacity>
                <View style={{ width: windowWidth - 16 * 2 }}>
                  <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>
                    Регистрация
                  </Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedLogin ? "#FF6C00" : "#E8E8E8",
                      fontFamily: "Roboto",
                    }}
                    onFocus={() => setIsFocusedLogin(true)}
                    onBlur={() => setIsFocusedLogin(false)}
                    value={login}
                    placeholder="Логин"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={loginSave}
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                      fontFamily: "Roboto",
                    }}
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    value={email}
                    placeholder="EmАдрес электронной почты"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={emailSave}
                    keyboardType="email-address"
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                      fontFamily: "Roboto",
                    }}
                    onFocus={() => setIsFocusedPassword(true)}
                    onBlur={() => setIsFocusedPassword(false)}
                    value={password}
                    placeholder="Пароль"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={isPasswordHidden}
                    onChangeText={passwprdSave}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.showPassword}
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text
                      style={{
                        ...styles.textShowPassword,
                        fontFamily: "Roboto",
                      }}
                    >
                      {isPasswordHidden ? "Показать" : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text
                      style={{ ...styles.textButton, fontFamily: "Roboto" }}
                    >
                      Зарегистрироваться
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={{ ...styles.link, fontFamily: "Roboto" }}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
  },
  wrapper: {
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
  title: {
    marginTop: 92,
    marginBottom: 33,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,

    color: "#212121",
  },
  showPassword: {
    position: "absolute",
    right: 0,
    bottom: 205,
    paddingRight: 16,
  },
  textShowPassword: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  button: {
    height: 51,
    marginTop: 27,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  link: {
    marginTop: 16,
    marginBottom: 60,
    textAlign: "center",
    color: "#1B4371",
  },
});
