import React, { useEffect, useState, useRef } from "react";

import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSepet } from "../context/SepetContext";

import UrunKarti from "../components/UrunKarti";

export default function AnaSayfa() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { toplamAdet } = useSepet();

  const [aramaMetni, setAramaMetni] = useState("");
  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState("");

  const ilkRender = useRef(true);

  async function urunleriGetir(arama = aramaMetni) {
    try {
      setYukleniyor(true);
      setHata("");

      const sorgu = (arama || "").trim();
      const url = sorgu
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(sorgu)}`
        : "https://dummyjson.com/products?limit=20";

      const cevap = await fetch(url);

      if (!cevap.ok) {
        throw new Error("Ürünler alınamadı.");
      }

      const veri = await cevap.json();

      setUrunler(veri.products || []);
    } catch (error) {
      setHata(error.message);
    } finally {
      setYukleniyor(false);
    }
  }

  useEffect(() => {
    if (ilkRender.current) {
      ilkRender.current = false;
      urunleriGetir("");
      return;
    }

    const timer = setTimeout(() => {
      urunleriGetir(aramaMetni);
    }, 400);

    return () => clearTimeout(timer);
  }, [aramaMetni]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <View
        style={[
          styles.ustAlan,
          { paddingTop: insets.top ? insets.top + 8 : 16 },
        ]}
      >
        <Text style={styles.baslik}>E-Ticaret Mağazam</Text>

        <Pressable
          style={styles.sepetButon}
          onPress={() => router.push("/sepet")}
        >
          <Text style={styles.butonYazi}>Sepetim ({toplamAdet})</Text>
        </Pressable>
      </View>

      <View style={styles.aramaAlani}>
        <TextInput
          style={styles.aramaInput}
          placeholder="Ürün ara..."
          placeholderTextColor="#af9caeff"
          value={aramaMetni}
          onChangeText={setAramaMetni}
          returnKeyType="search"
          onSubmitEditing={() => urunleriGetir(aramaMetni)}
          clearButtonMode="while-editing"
        />
      </View>

      {yukleniyor ? (
        <ActivityIndicator
          size="large"
          color="#eb25d1ff"
          style={styles.yukleme}
        />
      ) : hata ? (
        <View style={styles.mesajAlani}>
          <Text style={styles.hata}>{hata}</Text>

          <Pressable
            style={styles.tekrarButon}
            onPress={() => urunleriGetir(aramaMetni)}
          >
            <Text style={styles.butonYazi}>Tekrar Dene</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={urunler}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.liste}
          ListEmptyComponent={
            <Text style={styles.bosMetin}>Gösterilecek ürün bulunamadı.</Text>
          }
          renderItem={({ item }) => (
            <UrunKarti
              urun={item}
              onPress={() => router.push(`/urun/${item.id}`)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8b5d6ff",
  },

  ustAlan: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  baslik: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },

  sepetButon: {
    backgroundColor: "#eb259cff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  butonYazi: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  aramaAlani: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  aramaInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: "#111827",
  },

  liste: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  bosMetin: {
    textAlign: "center",
    color: "#806b7eff",
    marginTop: 20,
    fontSize: 15,
  },

  yukleme: {
    flex: 1,
    justifyContent: "center",
  },

  mesajAlani: {
    alignItems: "center",
    marginTop: 40,
    padding: 16,
  },

  hata: {
    color: "#dc2626",
    marginBottom: 16,
    textAlign: "center",
  },

  tekrarButon: {
    backgroundColor: "#eb2599ff",
    padding: 12,
    borderRadius: 8,
  },
});
