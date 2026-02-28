import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../src/theme/theme";

import Button from "../components/Button";
import Input from "../components/Input";

export default function Register() {
  const [step, setStep] = useState(1);

  // Étape 1
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Étape 2
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("");

  // Étape 3
  const [goal, setGoal] = useState(null);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER LOGO + NOM */}
        <View style={styles.header}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.appName}>NutriAI</Text>
        </View>

        <Text style={styles.title}>INSCRIPTION</Text>

        {/* ---------------- ÉTAPE 1 ---------------- */}
        {step === 1 && (
          <>
            <Input
              label="Prénom"
              placeholder="Votre prénom"
              value={firstname}
              onChangeText={setFirstname}
            />

            <Input
              label="Nom"
              placeholder="Votre nom"
              value={lastname}
              onChangeText={setLastname}
            />

            <Input
              label="Email"
              placeholder="Votre email"
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

            <Input
              label="Confirmer le mot de passe"
              placeholder="Confirmez"
              type="password"
              value={confirm}
              onChangeText={setConfirm}
            />

            <View style={styles.buttonsGroup}>
              <Button
                name="Suivant"
                variant="primary"
                onPress={() => setStep(2)}
              />
            </View>
          </>
        )}

        {/* ---------------- ÉTAPE 2 ---------------- */}
        {step === 2 && (
          <>
            <Input
              label="Âge"
              placeholder="Votre âge"
              value={age}
              onChangeText={setAge}
            />

            <Input
              label="Poids (kg)"
              placeholder="Votre poids"
              value={weight}
              onChangeText={setWeight}
            />

            <Input
              label="Taille (cm)"
              placeholder="Votre taille"
              value={height}
              onChangeText={setHeight}
            />

            <Input
              label="Activité"
              placeholder="Votre niveau d'activité"
              value={activity}
              onChangeText={setActivity}
            />

            <View style={styles.buttonsGroup}>
              <Button
                name="Suivant"
                variant="primary"
                onPress={() => setStep(3)}
              />

              <Button
                name="Retour"
                variant="secondary"
                onPress={() => setStep(1)}
              />
            </View>
          </>
        )}

        {/* ---------------- ÉTAPE 3 ---------------- */}
        {step === 3 && (
          <>
            <Text style={styles.subtitle}>Votre objectif</Text>

            <View style={styles.goalsColumn}>
              {["Perte de poids", "Maintien", "Prise de masse"].map((g) =>
              {
                const isSelected = goal === g;
                return (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.goalBox,
                      isSelected && styles.goalSelected,
                    ]}
                    onPress={() => setGoal(g)}
                  >
                    <Text
                      style={
                        {
                          fontSize: 14,
                          fontFamily: theme.fonts.text,
                          color: isSelected ? "#FFFFFF" : theme.colors.textDark, // blanc si sélectionné, marron sinon
                        }
                      }
                    >
                      {g}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
<View style={styles.buttonsGroup}>
              <Button
                name="Se connecter"
                variant="primary"
                onPress={() => router.push("/login")}
              />

              <Button
                name="Retour"
                variant="secondary"
                onPress={() => setStep(2)}
              />
            </View>
          </>
        )}
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
    marginBottom: 60,
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
    fontSize: 26,
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "600",
    color: theme.colors.textDark,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "600",
    color: theme.colors.textDark,
  },

  goalsColumn: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 30,
  },

  goalBox: {
    width: "100%",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
  },

  goalSelected: {
    backgroundColor: theme.colors.gold,
    color: theme.colors.textDark,
  },

  goalText: {
    fontSize: 14,
    color: theme.colors.textLight,
  },

  buttonsGroup: {
    color: theme.colors.textLight,
    marginTop: 25,
    gap: 12,
  },
});
