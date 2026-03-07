import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  type = "text",
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !visible}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Image
              source={
                visible
                  ? require("../assets/eyesopen.png")
                  : require("../assets/eyesclose.png")
              }
              style={styles.eye}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eye: {
    width: 22,
    height: 22,
    opacity: 0.7,
  },
});