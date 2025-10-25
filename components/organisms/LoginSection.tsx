import React from "react";
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import TextTitle from "../atoms/TextTitle";
import LoginForm from "../molecules/LoginForm";
import ButtonPrimary from "../atoms/ButtonPrimary";

interface Props {
  usuario: string;
  password: string;
  setUsuario: (text: string) => void;
  setPassword: (text: string) => void;
  onSubmit: () => void;
  onRegister?: () => void;
}

const LoginSection: React.FC<Props> = ({
  usuario,
  password,
  setUsuario,
  setPassword,
  onSubmit,
  onRegister,
}) => {
  return (
    <ImageBackground
      source={require("../../assets/images/portada_mobile.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* IZQUIERDA - Formulario */}
          <View style={styles.leftSection}>
            <View style={styles.headerContainer}>
              <Image
                source={require("../../assets/images/logo-sinfondo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <TextTitle text="Iniciar sesión" style={styles.title} />
            </View>

            <View style={styles.formContainer}>
              <LoginForm
                usuario={usuario}
                password={password}
                setUsuario={setUsuario}
                setPassword={setPassword}
              />

              <View style={styles.buttonWrapper}>
                <ButtonPrimary title="Ingresar" onPress={onSubmit} />
              </View>

              {/* Línea separadora */}
              <View style={styles.separatorContainer}>
                <View style={styles.line} />
              </View>

              {/* Texto de registro */}
              <Text style={styles.registerTextContainer}>
                ¿No tenés cuenta?{" "}
                <Text
                  style={styles.registerLink}
                  onPress={onRegister}
                >
                  Registrarme
                </Text>
              </Text>
            </View>
          </View>

          {/* DERECHA - Imagen decorativa (solo web) */}
          {Platform.OS === "web" && (
            <View style={styles.rightSection}>
              <Image
                source={require("../../assets/images/portada_mobile.jpg")}
                style={styles.innerImage}
                resizeMode="cover"
              />
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    flexDirection: Platform.OS === "web" ? "row" : "column",
    backgroundColor: "rgba(255, 255, 255, 0.93)",
    borderRadius: 24,
    width: Platform.OS === "web" ? "85%" : "90%",
    maxWidth: 1200,
    minHeight: "78%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  leftSection: {
    flex: 1.2,
    paddingHorizontal: Platform.OS === "web" ? 80 : 40,
    paddingVertical: Platform.OS === "web" ? 60 : 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  rightSection: {
    flex: 1,
    backgroundColor: "#eee",
  },
  innerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  logo: {
    width: Platform.OS === "web" ? 160 : 120,
    height: Platform.OS === "web" ? 160 : 120,
    marginBottom: 10,
    transform: [{ scale: 1.8 }],
  },
  title: {
    fontSize: Platform.OS === "web" ? 30 : 26,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginTop: 12,
  },
  formContainer: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 16,
    alignItems: "center",
  },
  separatorContainer: {
    width: "100%",
    marginVertical: 25,
  },
  line: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  registerTextContainer: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
  },
  registerLink: {
    color: "#c47719",
    fontWeight: "600",
  },
});

export default LoginSection;
