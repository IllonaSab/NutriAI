import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { theme } from "../src/theme/theme";
import { router } from "expo-router";

import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        {/* Logo + Nom de l'app */}
       <View style={styles.header}> <Image source={require("../assets/logo.png")} style={styles.logo} /> <Text style={styles.appName}>NutriAI</Text> </View>

        {/* Titre */}
        <Text style={styles.title}>LOGIN</Text>

        {/* Inputs */}
        <Input
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          label="Mot de passe"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChangeText={setPassword}
        />

        {/* Boutons */}
        <View style={styles.buttonsContainer}>
          <Button
            name="Se connecter"
            variant="primary"
            onPress={() => console.log("Connexion")}
          />

          <Button
            name="Se connecter avec Google"
            variant="secondary"
            onPress={() => console.log("Google")}
          />

          <Button
            name="Se connecter avec Apple"
            variant="secondary"
            onPress={() => console.log("Apple")}
          />
        </View>
        <View style={styles.registerContainer}> <Text style={styles.registerText}>Pas de compte ? </Text> <Text style={styles.registerLink} onPress={() => router.push("/register")} > Inscrivez-vous </Text> </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.bg,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 70,
  },

  logo: {
    width: 50,
    height: 50,
  },

  appName: {
    fontSize: 16,
    fontFamily: theme.fonts.title,
    color: theme.colors.textDark,
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    color: theme.colors.textDark,
    marginBottom: 80,
    fontFamily: theme.fonts.regular,
  },

  buttonsContainer: {
    marginTop: 20,
    gap: 15,
  },
  registerContainer: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 20,
},

registerText: {
  fontSize: 14,
  color: "#555",
},

registerLink: {
  fontSize: 14,
  color: theme.colors.gold, // bleu iOS
  fontWeight: "600",
},

});
