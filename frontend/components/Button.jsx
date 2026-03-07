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
    borderRadius: theme.radius,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
  },

  /* VARIANTES */

  // Bouton principal : OR
  primary: {
    backgroundColor: theme.colors.gold,      // #D4AF37
    borderWidth: 2,
    borderColor: theme.colors.textLight,     // #FDF6EC (bordure crème)
  },
  primaryText: {
    color: theme.colors.textLight,           // #FDF6EC (texte crème)
  },

  // Bouton secondaire : crème + bordure or
  secondary: {
    backgroundColor: theme.colors.bg,        // #FDF6EC
    borderWidth: 1,
    borderColor: theme.colors.gold,          // #D4AF37
  },
  secondaryText: {
    color: theme.colors.textDark,            // #5A3D21
  },

  disabled: {
    opacity: 0.5,
  },
});