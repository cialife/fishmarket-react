// 1. TYPE IMPORT
// Mengimpor tipe data GalleryItem dari komponen GalleryCard.
// Tipe ini bertindak sebagai "cetak biru" atau kontrak yang memastikan 
// setiap data di dalam array memiliki struktur yang seragam (harus ada id, type, src, dll).
import type { GalleryItem } from '@/components/GalleryCard';

// 2. MOCK DATA / DATA SOURCE
// Memisahkan data dari komponen UI (Gallery.tsx) ke file tersendiri.
// Praktik ini disebut "Separation of Concerns". Tujuannya agar kode UI lebih bersih,
// mudah dibaca, dan jika ada perubahan/penambahan data, kita cukup mengedit file ini saja.
export const galleryData: GalleryItem[] = [
  { 
    id: 1, 
    type: 'photo', 
    src: '/images/gallery/pasar.png', 
    title: 'Pasar Ikan Modern Muara Baru', 
    desc: 'Pasar bersih dengan ikan segar' 
  },
  { 
    id: 2, 
    type: 'photo', 
    src: '/images/gallery/ikanLele.png', 
    title: 'Ikan Lele Segar', 
    desc: 'Ditangkap oleh nelayan lokal' 
  },
  { 
    id: 3, 
    type: 'photo', 
    src: '/images/gallery/ikanNila.png', 
    title: 'Ikan Nila Premium', 
    desc: 'Kualitas premium dan segar' 
  },
  { 
    id: 4, 
    type: 'photo', 
    src: '/images/gallery/kebersihanStand.png', 
    title: 'Kebersihan Stand', 
    desc: 'Standar kebersihan terjaga' 
  },
  { 
    id: 5, 
    type: 'photo', 
    src: '/images/gallery/tangkapanSegar.png', 
    title: 'Tangkapan Segar dari Laut', 
    desc: 'Pasokan dengan kualitas tinggi' 
  },
  { 
    id: 6, 
    type: 'video', 
    // Khusus untuk video, kita menggunakan link embed eksternal (YouTube)
    src: 'https://www.youtube-nocookie.com/embed/AB4BaF_Uc0s?autoplay=1&rel=0', 
    previewSrc: 'https://www.youtube-nocookie.com/embed/AB4BaF_Uc0s?autoplay=1&mute=1&loop=1&playlist=AB4BaF_Uc0s&controls=0&enablejsapi=1', 
    title: 'Video Suasana Pasar', 
    desc: 'Keramaian Pasar' 
  },
  { 
    id: 7, 
    type: 'photo', 
    src: '/images/gallery/ikanMentah.png', 
    title: 'Ikan Mentah', 
    desc: 'Pasokan sehari-hari' 
  },
  { 
    id: 8, 
    type: 'photo', 
    src: '/images/gallery/ikanTenggiri.png', 
    title: 'Penangkapan Ikan Tenggiri Raksasa', 
    desc: 'Ditangkap oleh nelayan lokal' 
  },
  { 
    id: 9, 
    type: 'photo', 
    src: '/images/gallery/ikanGurami.png', 
    title: 'Ikan Gurami dari Laut', 
    desc: 'Penangkapan ikan gurami' 
  },
  { 
    id: 10, 
    type: 'photo', 
    src: '/images/gallery/keramaianPasar.png', 
    title: 'Keramaian Pasar', 
    desc: 'Cocok untuk belanja tahun baru' 
  },
  { 
    id: 11, 
    type: 'photo', 
    src: '/images/gallery/kunjunganPasar.png', 
    title: 'Kunjungan ke Pasar', 
    desc: 'Pak Joko Widodo memastikan operasional lancar' 
  },
  { 
    id: 12, 
    type: 'photo', 
    src: '/images/gallery/ikanTongkol.png', 
    title: 'Penangkapan Ikan Tongkol', 
    desc: 'Daging lembut yang kaya nutrisi' 
  },
  { 
    id: 13, 
    type: 'photo', 
    src: '/images/gallery/ikanKakap.png', 
    title: 'Ikan Kakap Berkualitas', 
    desc: 'Segar seperti laut' 
  },
  { 
    id: 14, 
    type: 'photo', 
    src: '/images/gallery/ikanPatin.png', 
    title: 'Kesegaran Ikan Patin', 
    desc: 'Ditangkap oleh nelayan lokal' 
  },
  { 
    id: 15, 
    type: 'photo', 
    src: '/images/gallery/keramahanPenjual.png', 
    title: 'Keramahan Penjual', 
    desc: 'Menjual dan memasak dengan hati yang hangat' 
  },
];

// Mengekspor kembali tipe data agar file lain yang membutuhkan (jika ada) bisa menggunakannya
export { GalleryItem };
