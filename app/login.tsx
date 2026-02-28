import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "../src/theme/theme";

// Boutons réutilisables
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>

      {/* Logo + Nom de l'app */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>NutriAI</Text>
      </View>

      {/* Titre LOGIN */}
      <Text style={styles.title}>LOGIN</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.muted}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor={theme.colors.muted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Boutons regroupés avec espacement */}
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },

  appName: {
    fontSize: 28,
    fontFamily: theme.fonts.title,
    color: theme.colors.text,
  },

  title: {
    fontSize: 26,
    textAlign: "center",
    color: theme.colors.text,
    marginBottom: 30,
    fontFamily: theme.fonts.regular,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.brand,
    borderRadius: theme.radius,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.bgLight,
    marginBottom: 20,
    fontSize: 16,
  },

  buttonsContainer: {
    marginTop: 10,
    gap: 15, // ESPACEMENT ENTRE LES BOUTONS
  },
});
