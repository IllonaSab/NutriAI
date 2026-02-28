import { Lemon_400Regular } from "@expo-google-fonts/lemon";
import { Lexend_400Regular, useFonts } from "@expo-google-fonts/lexend";
import { Slot } from "expo-router";

export default function App() {
  const [loaded] = useFonts({
    Lexend: Lexend_400Regular,
    Lemon: Lemon_400Regular,
  });

  if (!loaded) return null;

  return <Slot />;
}
