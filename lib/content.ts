export const getDefaultContent = () => ({
  homeTitle: "Pasar Ikan Modern Muara Baru",
  homeSub: "Segarnya tetap asli",
  homeH2: "Ikan premium, harga jujur, segar setiap hari!",
  homeP:
    "Siap untuk mencobanya? Jelajahi tangkapan harian kami yang dipilih secara cermat demi kualitas dan kesegarannya.",
  homeImages: [
    { src: "/images/home/pasar.jpg", alt: "Pasar" },
    { src: "/images/home/home1.jpg", alt: "Dalam Pasar" },
    { src: "/images/home/home2.jpg", alt: "Pasar" },
    { src: "/images/home/home3.jpg", alt: "Dalam Pasar" },
  ],
  aboutTitle: "Cerita di Balik Pasar Ikan Muara Baru",
  aboutSub: "Perjalanan menjadi pasar ikan terpercaya",
  aboutTitle2: "ㆍ Kenali Pasar Ikan Kami ㆍ",
  aboutSub2:
    "Kami percaya hasil laut berkualitas berawal dari kepercayaan, kebersihan, harga jujur, dan penanganan yang baik.",
  aboutFounderTitle: "Founder Pasar Ikan Modern Muara Baru",
  aboutFounderText:
    "Pada 13 Maret 2019, pasar kami resmi diresmikan oleh Joko Widodo, didampingi oleh Menteri Kelautan dan Perikanan serta sejumlah pejabat pemerintah lainnya. Dibangun di bawah Kementerian Kelautan dan Perikanan, fasilitas modern ini dirancang untuk menghadirkan standar perdagangan hasil laut yang lebih bersih dan berkelas dunia bagi masyarakat lokal, dengan terinspirasi dari pasar ikan ternama di berbagai negara.",
  aboutSejakTitle: "Sejak 2019",
  aboutSejakText:
    "Apa yang dimulai pada tahun 2019 sebagai babak baru bagi Muara Baru, kini telah berkembang menjadi tempat terpercaya untuk mendapatkan hasil laut yang segar dan berkualitas. Dibangun dengan mengutamakan standar modern, pasar kami terus menghargai kerja keras para nelayan lokal sekaligus menghadirkan pengalaman yang lebih bersih dan nyaman bagi setiap pengunjung.",
  aboutLokasiTitle: "Kami Buka 24 Jam",
  aboutLokasiText:
    "Temukan kami di Muara Baru, Penjaringan, Jakarta Utara, di kawasan pesisir yang telah menjadi pusat industri perikanan selama beberapa generasi. Lokasi kami dekat dengan pelabuhan dan mudah dijangkau, sehingga Anda dapat menikmati hasil laut segar langsung dari nelayan lokal.",
  catalogTitle: "Katalog Produk Pasar Ikan Muara Baru",
  catalogSub: "Nikmati segarnya ikan dari laut",
  catalogTitle2: "ㆍ Temukan Ikan Terbaik ㆍ",
  catalogSub2:
    "Hasil tangkapan segar dari nelayan setempat, langsung ke meja Anda.",
  catalogTabelTitle: "Tabel Harga",
  catalogTabelText:
    "Kami menyediakan berbagai pilihan ikan segar dan berkualitas yang dipilih dari nelayan lokal dan pemasok terpercaya. Setiap ikan dapat diolah dengan berbagai cara, seperti mentah, dikukus, atau dibakar. Kami berkomitmen menyediakan ikan yang segar, lezat, dan bergizi dengan harga yang terjangkau untuk keluarga maupun restoran.",
  catalogPesanTitle: "ㆍ Pesan Ikan Anda ㆍ",
  catalogPesanSub:
    "Hasil tangkapan segar dari nelayan setempat, langsung ke meja Anda.",
  pesananTitle: "ㆍ Pesanan Anda ㆍ",
  pesananSub: "Silahkan isi form pemesanan dengan lengkap.",
  riwayatTitle: "Riwayat Pemesanan Pelanggan",
  riwayatSub: "Pantau status transaksi dan riwayat pembelian ikan segar Anda.",
  galeriTitle: "Galeri Pasar Ikan Modern Muara Baru",
  galeriSub: "Apa saja yang dilakukan di Pasar?",
  galeriTitle2: "Momen yang Terdokumentasi",
  galeriSub2:
    "Keseharian para nelayan lokal dan suasana Pasar Ikan Modern Muara Baru",
});

export const getContent = () => {
  if (typeof window === "undefined") return getDefaultContent();

  // KEY SITECONTENT
  const data = localStorage.getItem("siteContent");
  if (!data) return getDefaultContent();
  try {
    return { ...getDefaultContent(), ...JSON.parse(data) };
  } catch {
    return getDefaultContent();
  }
};

// return false kalau gagal (misal localStorage penuh karena gambar besar)
export const saveContent = (content: any): boolean => {
  try {
    localStorage.setItem("siteContent", JSON.stringify(content));
    return true;
  } catch {
    return false;
  }
};

export const resetDefaultContent = () => {
  localStorage.removeItem("siteContent");
};
