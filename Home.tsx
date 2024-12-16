import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";

const Home = () => {
  const [newsData, setNewsData] = useState([]); // State untuk menyimpan data berita
  const [loading, setLoading] = useState(true); // State untuk menandakan apakah data sedang dimuat
  const [error, setError] = useState(""); // State untuk menangani error
  const [query, setQuery] = useState("tesla"); // State untuk menyimpan query pencarian

  const apiKey = "c89332fadf2348b280255dc453ea8a4d"; // API Key
  const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-11-16&sortBy=publishedAt&apiKey=${apiKey}`;

  // Mengambil data dari API menggunakan axios
  useEffect(() => {
    if (!query) return; // Cegah permintaan jika query kosong

    setLoading(true); // Set loading true ketika mengambil berita
    axios
      .get(url)
      .then((response) => {
        const filteredArticles = response.data.articles.filter((article) => 
          article.title && article.urlToImage && article.description
        );

        if (filteredArticles.length > 0) {
          setNewsData(filteredArticles);
        } else {
          setError("Tidak ada berita ditemukan.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Gagal memuat berita. Coba lagi nanti.");
        setLoading(false);
      });
  }, [query]); // Mengambil data berita setiap kali query berubah

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => alert('Link ke berita: ' + item.url)}>
      <Image source={{ uri: item.urlToImage }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.source}>Source: {item.source.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={(item) => item.url}
          renderItem={renderNewsItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Ubah ke latar belakang putih (light mode)
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  card: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#FFFFFF", // Card menjadi putih
    overflow: "hidden",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#000000", // Judul teks hitam untuk kontras terang
  },
  description: {
    fontSize: 14,
    color: "#333333", // Deskripsi berwarna abu-abu gelap
    marginBottom: 10,
  },
  source: {
    fontSize: 12,
    color: "#FFD700", // Masih mempertahankan warna gold pada sumber berita
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Home;
