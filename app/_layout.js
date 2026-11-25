import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SepetProvider } from "../context/SepetContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SepetProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Ürünler", headerShown: false }}
          />

          <Stack.Screen
            name="urun/[id]"
            options={{ title: "Ürün Detayı", headerShown: false }}
          />

          <Stack.Screen
            name="sepet"
            options={{ title: "Sepetim", headerShown: false }}
          />
        </Stack>
      </SepetProvider>
    </SafeAreaProvider>
  );
}
