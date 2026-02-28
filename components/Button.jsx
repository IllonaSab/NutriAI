import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../src/theme/theme";

export default function Button({ name, variant = "primary", disabled = false, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, styles[variant + "Text"]]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 13,
    paddingHorizontal: 43,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
  },

  // VARIANTES
  primary: {
    backgroundColor: "#D4AF37",
    borderWidth: 2,
    borderColor: "#FFFF",   // la bordure demandée
  },
  primaryText: {
    color: "#fff",
  },

  secondary: {
    backgroundColor: "#FDF6EC",
    borderWidth: 1,
    borderColor: "#D4AF37",   // la bordure demandée
  },
  secondaryText: {
    color: "#5A3D21",
  },

  disabled: {
    opacity: 0.5,
  },
});
