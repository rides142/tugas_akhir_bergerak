import { View, Text, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "@/store/store";
import Listcom from "../../components/ListComp"; // Komponen daftar yang akan ditampilkan

export default function List() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.title}>LIST</Text>
        <Listcom />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Latar belakang gelap
    paddingHorizontal: 20,
    paddingTop: 40, // Memberikan ruang di atas
    
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF", // Warna gold untuk judul
    marginBottom: 20,
    textAlign: "center",
  },
});
