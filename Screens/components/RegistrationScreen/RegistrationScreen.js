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

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get("window").width);
  const [phoneHeight, setPhoneHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setPhoneWidth(width);

      const height = Dimensions.get("window").height;
      setPhoneHeight(height);
    };
    const addListener = Dimensions.addEventListener("change", onChange);

    return () => addListener.remove();
  }, []);

  const loginSave = (login) => setLogin(login);
  const emailSave = (email) => setEmail(email);
  const passwprdSave = (password) => setPassword(password);

  const onLogin = () => {
    if (!login.trim() || !email.trim() || !password.trim()) {
      Alert.alert(`Все поля должны быть заполнены!`);
      return;
    }
    Alert.alert(`${login}, успешно зарегистрированы!`);
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
    RobotoRegular: require("../../../assets/fonts/Roboto-Regular.ttf"),
    // RobotoMono: require("../../../assets/fonts/RobotoMono-Italic-VariableFont_wght.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fonts) {
      await SplashScreen.hideAsync();
    }
  }, [fonts]);

  if (!fonts) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      onLayout={onLayoutRootView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.containerFlex}>
          <ImageBackground
            style={{
              ...styles.imageBG,
              width: phoneWidth,
              height: phoneHeight,
            }}
            source={require("../../../assets/images/bgImage.png")}
          >
            <ScrollView>
              <View
                style={{
                  ...styles.wrapper,
                  marginTop: phoneWidth > 400 ? 200 : 400,
                }}
              >
                <View
                  style={{
                    ...styles.imageWrap,
                    left: (phoneWidth - 120) / 2,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    ...styles.addSvg,
                    left: phoneWidth / 2 + 48,
                  }}
                >
                  <Add />
                </TouchableOpacity>
                <View style={{ width: phoneWidth - 16 * 2 }}>
                  <Text style={styles.title}>Регистрация</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedLogin ? "#FF6C00" : "#E8E8E8",
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
                    }}
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    value={email}
                    placeholder="Адрес электронной почты"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={emailSave}
                    keyboardType="email-address"
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
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
                    style={styles.isPassword}
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text style={styles.isPasswordShow}>
                      {isPasswordHidden ? "Показать" : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onLogin}>
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.footer}>Уже есть аккаунт? Войти</Text>
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
  containerFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 270,
  },

  imageWrap: {
    top: -60,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addSvg: {
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
    fontFamily: "RobotoBold",
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
    fontFamily: "RobotoRegular",

    color: "#212121",
  },
  isPassword: {
    position: "absolute",
    right: 0,
    bottom: 205,
    paddingRight: 16,
  },
  isPasswordShow: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "RobotoRegular",
  },

  button: {
    height: 51,
    marginTop: 27,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "RobotoBold",
  },
  footer: {
    marginTop: 16,
    marginBottom: 60,
    textAlign: "center",
    color: "#1B4371",
    fontFamily: "RobotoRegular",
  },
});
