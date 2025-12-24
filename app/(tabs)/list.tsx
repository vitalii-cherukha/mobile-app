import { Image } from "expo-image";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { AddWeaponModal } from "@/components/AddWeaponModal";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { useWeapons } from "@/contexts/WeaponContext";
import { Weapon } from "@/types/weapon";

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editWeapon, setEditWeapon] = useState<Weapon | null>(null);
  const { searchWeapons, deleteWeapon } = useWeapons();

  const filteredWeapons = searchWeapons(searchQuery);

  const handleEdit = (weapon: Weapon) => {
    setEditWeapon(weapon);
    setShowModal(true);
  };

  const handleDelete = (weapon: Weapon) => {
    Alert.alert(
      "Підтвердження",
      `Ви впевнені, що хочете видалити ${weapon.serialNumber}?`,
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: () => deleteWeapon(weapon.id),
        },
      ]
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditWeapon(null);
  };

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
      <ThemedView style={styles.weaponInfo}>
        <ThemedText style={[styles.serialNumber, { color: "#333" }]}>
          {item.serialNumber}
        </ThemedText>
        {item.model && (
          <ThemedText style={[styles.model, { color: "#666" }]}>
            {item.model}
          </ThemedText>
        )}
        <ThemedText style={[styles.name, { color: "#333" }]}>
          {item.firstName} {item.lastName}
        </ThemedText>
        <ThemedText style={[styles.date, { color: "#666" }]}>
          {new Date(item.dateAdded).toLocaleDateString()}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
          onPress={() => handleEdit(item)}
        >
          <Ionicons name="create-outline" size={16} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#f44336" }]}
          onPress={() => handleDelete(item)}
        >
          <Ionicons name="trash-outline" size={16} color="white" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/weapon-img-list.jpg")}
          style={styles.listImg}
        />
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Перелік зброї
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredWeapons}
        renderItem={renderWeaponItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>Список порожній</ThemedText>
        }
        contentContainerStyle={styles.listContent}
      />

      <AddWeaponModal
        visible={showModal}
        onClose={handleCloseModal}
        editWeapon={editWeapon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 200,
    width: "100%",
  },
  listImg: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
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
    borderColor: "#ccc",
    color: "#333",
    backgroundColor: "white",
  },
  listContent: {
    paddingBottom: 16,
  },
  weaponItem: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  weaponInfo: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
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
