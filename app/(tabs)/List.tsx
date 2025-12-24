import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { useWeapons } from "@/contexts/WeaponContext";
import { Weapon } from "@/types/weapon";

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchWeapons } = useWeapons();
  const colorScheme = "dark";

  const filteredWeapons = searchWeapons(searchQuery);

  const renderWeaponItem = ({ item }: { item: Weapon }) => (
    <ThemedView
      style={[
        styles.weaponItem,
        {
          borderColor: "#ccc",
          backgroundColor: "white",
        },
      ]}
    >
      <ThemedText style={[styles.serialNumber, { color: "#333" }]}>
        {item.serialNumber}
      </ThemedText>
      <ThemedText style={[styles.model, { color: "#666" }]}>
        {item.model}
      </ThemedText>
      <ThemedText style={[styles.name, { color: "#333" }]}>
        {item.firstName} {item.lastName}
      </ThemedText>
      <ThemedText style={[styles.date, { color: "#666" }]}>
        {new Date(item.dateAdded).toLocaleDateString()}
      </ThemedText>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#2A2A2A" }}
      headerImage={
        <Image
          source={require("@/assets/images/weapon-img-list.jpg")}
          style={styles.listImg}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          List weapon
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              borderColor: "#ccc",
              color: "#333",
              backgroundColor: "white",
            },
          ]}
          placeholder="Пошук"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      <FlatList
        data={filteredWeapons}
        renderItem={renderWeaponItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>Список порожній</ThemedText>
        }
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  listImg: {
    height: 250,
    width: 420,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,

    fontSize: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  weaponItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  serialNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  model: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 4,
    opacity: 0.8,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    opacity: 0.7,
  },
});
