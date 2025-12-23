import { Image } from "expo-image";
import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

import { AddWeaponModal } from "@/components/AddWeaponModal";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function HomeScreen() {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleScan = () => {
    Alert.alert("Scan", "Функція сканування буде реалізована");
  };

  const handleAddWeapon = () => {
    setShowAddModal(true);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/weapon-img-title.jpg")}
          style={styles.homeImg}
        />
      }
    >
      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#666666" }]}
          onPress={handleScan}
        >
          <IconSymbol name="camera.fill" size={24} color="white" />
          <ThemedText style={[styles.buttonText, { color: "white" }]}>
            Сканувати
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#666666" }]}
          onPress={handleAddWeapon}
        >
          <IconSymbol name="plus.circle.fill" size={24} color="white" />
          <ThemedText style={[styles.buttonText, { color: "white" }]}>
            Додати зброю
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <AddWeaponModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 16,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  homeImg: {
    height: 250,
    width: 420,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
