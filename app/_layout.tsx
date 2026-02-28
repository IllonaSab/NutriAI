import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";
import { theme } from "../src/theme/theme";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
