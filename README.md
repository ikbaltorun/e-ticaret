# 🛍️ React Native API Tabanlı E-Ticaret Uygulaması

Bu proje, **React Native** ve **Expo Router** kullanılarak geliştirilmiş, REST API entegrasyonuna sahip ve merkezi **Context API** durum yönetimi barındıran modern bir mobil e-ticaret uygulamasıdır.

Laboratuvar föyü kılavuzluğunda hazırlanmış olup, temel isterlerin yanı sıra tanımlanan tüm ek öğrenci görevleri (puan gösterimi, indirimli fiyat hesaplama, sepet ürün adedi canlı takibi ve dinamik arama) eksiksiz olarak tamamlanmıştır.

---

## 🚀 Özellikler

- **Dinamik Ürün Listeleme:** DummyJSON REST API'den ürünler çekilerek `FlatList` bileşeni ile performanslı bir şekilde listelenir.
- **Canlı Ürün Arama (Ek Görev):** Ana sayfadaki arama çubuğu (`TextInput`) vasıtasıyla DummyJSON arama ucu (`/products/search?q=`) kullanılarak anlık ürün araması yapılır.
- **Detaylı Ürün Sayfası:** `[id].js` dinamik rota parametresiyle seçilen ürünün görseli, açıklaması, kategorisi, değerlendirme puanı ve fiyat bilgileri görüntülenir.
- **İndirimli Fiyat Hesaplama (Ek Görev):** Ürün detayında API'den gelen `discountPercentage` bilgisi işlenerek orijinal fiyatın yanında indirimli satış tutarı hesaplanır ve gösterilir.
- **Merkezi Sepet Yönetimi:** `Context API` (`SepetContext`) kullanılarak uygulama genelinde senkronize çalışan sepet mimarisi kurulmuştur.
- **Sepet Butonunda Adet Gösterimi (Ek Görev):** Ana sayfadaki sepet butonunda sepetteki toplam ürün adedi canlı olarak güncellenir (`Sepetim (X)`).
- **Sepet İşlemleri:** Sepetteki ürünlerin adetlerini artırma/azaltma, ürünü sepetten tamamen silme ve toplam sepet tutarını otomatik hesaplama.
- **Özelleştirilmiş Ürün Kartı:** `UrunKarti` bileşeni üzerinden ürün resmi, başlığı, fiyatı ve değerlendirme puanı (`rating`) gösterilir.

---

## 🛠️ Kullanılan Teknolojiler ve Kütüphaneler

* **Framework:** [React Native](https://reactnative.dev/) (Expo / Expo Go)
* **Yönlendirme (Routing):** [Expo Router](https://docs.expo.dev/router/introduction/) (File-Based Routing)
* **Durum Yönetimi (State Management):** React Context API (`createContext`, `useContext`)
* **Dil:** JavaScript (ES6+)
* **API:** [DummyJSON Products API](https://dummyjson.com/)
* **Arayüz & Yerleşim:** React Native Core Components (`FlatList`, `ScrollView`, `Pressable`, `ActivityIndicator`, `Image`, `SafeAreaView`)

---

## 📂 Klasör ve Proje Yapısı

```text
eticaret-lab/
├── app/                      # Expo Router sayfa yapısı
│   ├── _layout.js            # Root layout ve SepetProvider sarmalayıcısı
│   ├── index.js              # Ana sayfa (Ürün listesi ve Arama)
│   ├── sepet.js              # Sepet yönetim ekranı
│   └── urun/
│       └── [id].js           # Dinamik ürün detay ekranı
├── components/
│   └── UrunKarti.js          # Yeniden kullanılabilir ürün kartı bileşeni
├── context/
│   └── SepetContext.js       # Sepet verisi ve merkezi state fonksiyonları
├── app.json                  # Expo yapılandırma dosyası
├── package.json              # Proje bağımlılıkları
└── README.md                 # Proje dokümantasyonu
```

## 💻 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

### 1. Repoyu Klonlayın
```bash
git clone [https://github.com/kullanici-adiniz/e-ticaret.git](https://github.com/kullanici-adiniz/e-ticaret.git)
cd e-ticaret
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Uygulamayı Başlatın
Expo Go önbelleğini temizleyerek geliştirme sunucusunu başlatın:
```bash
npx expo start --go-clear
```
### 4. Mobil Cihazda Çalıştırın
iOS için Kamera uygulamasını, Android için Expo Go uygulamasını açarak terminaldeki QR kodu okutun.
Yerel ağ kısıtlaması yaşarsanız tünel modunu kullanabilirsiniz:
```bash
npx expo start --go --tunnel
```

## 📋 Tamamlanan Görevler ve Test Senaryoları

- [x] **Görev 1:** `components/UrunKarti.js` içerisine ürünün API'den gelen `rating` (puan) bilgisi eklendi.
- [x] **Görev 2:** Ana sayfadaki `Sepetim` butonuna `useSepet` hook'u bağlanarak toplam ürün adedi `Sepetim (${toplamAdet})` formatında entegre edildi.
- [x] **Görev 3:** `app/urun/[id].js` sayfasında `discountPercentage` kullanılarak indirimli fiyat hesaplaması yapıldı ve ekranda vurgulandı.
- [x] **Görev 4:** Ana sayfaya `TextInput` arama çubuğu eklenerek DummyJSON arama servisi üzerinden dinamik ürün arama fonksiyonu geliştirildi.
- [x] **Context Entegrasyonu:** Sepete ürün ekleme, silme, adet güncelleme ve toplam tutar hesaplama işlemleri Context API üzerinden tüm sayfalarla senkronize edildi.
