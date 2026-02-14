# TourAgent - Seyahat Rezervasyon Platformu

## Proje Özeti
Azerbaycan merkezli bir seyahat sitesi. Kullanıcılar uçuş bileti arayabilir, sonuçları görüntüleyebilir ve rezervasyon yapabilir.

## Teknik Yığın
- **Frontend:** Vite + React + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** react-router-dom
- **i18n:** Custom context-based (TR, EN, AZ)
- **Backend:** Yok (Tüm veriler mock)

## Tamamlanan Özellikler

### v1.0 - Temel Uçuş Arama (Şubat 2026)
- [x] Ana sayfa tasarımı
- [x] Uçuş arama formu (Nereden/Nereye/Tarih/Yolcu)
- [x] Mock şehir verileri (18 şehir)
- [x] Mock uçuş sonuçları
- [x] Sonuç filtreleme sidebar'ı
- [x] Sıralama (En ucuz/En hızlı)

### v1.1 - Checkout Akışı (Şubat 2026)
- [x] Checkout sayfası (/checkout route)
- [x] Uçuş özeti gösterimi
- [x] Yolcu bilgi formu (Ad, Soyad, E-posta, Telefon, Doğum Tarihi, Cinsiyet, Uyruk, Pasaport No)
- [x] Form validasyonu
- [x] Fiyat özeti (Bilet ücreti, Vergiler, Hizmet bedeli)
- [x] Mock ödeme işlemi
- [x] Başarı ekranı (Rezervasyon no)

### v1.2 - Para Birimi Güncellemesi (Şubat 2026)
- [x] Tüm fiyatlar TL yerine $ (USD) olarak güncellendi

## Bekleyen Özellikler

### P1 - Yüksek Öncelik
- [ ] Otel arama işlevselliği
- [ ] Tur arama işlevselliği

### P2 - Orta Öncelik
- [ ] Backend API entegrasyonu
- [ ] Gerçek ödeme entegrasyonu (Stripe)
- [ ] Kullanıcı kimlik doğrulama

### P3 - Düşük Öncelik
- [ ] Rezervasyon geçmişi
- [ ] E-posta bildirimleri
- [ ] Favorilere ekleme

## Dosya Yapısı
```
/app/frontend/
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx    # Ana arama ve sonuçlar
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── Checkout.tsx       # Rezervasyon sayfası
│   ├── contexts/
│   │   └── LanguageContext.tsx # i18n
│   └── App.tsx                 # Router
```

## Mock Veriler
- Şehirler: 18 şehir (BAK, IST, SAW, AYT, DXB vb.)
- Havayolları: AZAL, Turkish Airlines, Pegasus, Buta Airways, Qatar Airways, Emirates
- Uçuş sonuçları: Her aramada 8 rastgele sonuç üretilir

## Notlar
- Tüm veriler frontend'de hardcoded
- Ödeme işlemi sadece görsel simülasyon
- Gerçek rezervasyon kaydedilmiyor
