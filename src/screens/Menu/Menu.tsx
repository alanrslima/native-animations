import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Modules from "../../modules";
import { useNavigation } from "@react-navigation/native";

export const Menu: React.FC = () => {
  const navigation = useNavigation();

  const getModulesArray = () => {
    const arrModules = [];
    for (let i in Modules) {
      arrModules.push({ name: i, component: (Modules as any)[i] });
    }
    return arrModules;
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.name)}
        style={styles.containerItem}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getModulesArray()}
        keyExtractor={(item) => `${item.name}`}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerItem: {
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
