import { StyleSheet, Text, View } from "react-native";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Créer un compte</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF6EC",
  },
  text: {
    fontSize: 24,
    color: "#3A3B34",
  },
});
