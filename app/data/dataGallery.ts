import type { GalleryItem } from '@/components/GalleryCard'; // Gunakan import type

export const galleryData: GalleryItem[] = [
  { 
    id: 1, 
    type: 'photo', 
    src: '/images/gallery/detik.jpeg', 
    title: 'Suasana Pasar Ikan Modern', 
    desc: 'Aktivitas jual beli dan pemotongan ikan segar' 
  },
  { 
    id: 2, 
    type: 'photo', 
    src: '/images/gallery/ikan2.jpg', 
    title: 'Ikan Tuna Segar', 
    desc: 'Hasil tangkapan nelayan lokal kualitas terbaik' 
  },
  { 
    id: 3, 
    type: 'photo', 
    src: '/images/gallery/ikan3.jpg', 
    title: 'Ikan Salmon Premium', 
    desc: 'Kesegaran tinggi standar ekspor' 
  },
  { 
    id: 4, 
    type: 'photo', 
    src: '/images/gallery/ikan4.jpg', 
    title: 'Aktivitas Bongkar Muat', 
    desc: 'Pasokan harian langsung dari laut' 
  },
  { 
    id: 5, 
    type: 'photo', 
    src: '/images/gallery/ikan5.jpg', 
    title: 'Tangkapan Laut Pilihan', 
    desc: 'Mutu dan kebersihan yang terjaga' 
  },
  { 
    id: 6, 
    type: 'video', 
    src: 'https://www.youtube-nocookie.com/embed/AB4BaF_Uc0s?autoplay=1&rel=0', 
    previewSrc: 'https://www.youtube-nocookie.com/embed/AB4BaF_Uc0s?autoplay=1&mute=1&loop=1&playlist=AB4BaF_Uc0s&controls=0&enablejsapi=1', 
    title: 'Rekaman Aktivitas Perikanan', 
    desc: 'Dari Laut Langsung ke Pasar' 
  },
  { 
    id: 7, 
    type: 'photo', 
    src: '/images/gallery/ikan1.jpg', 
    title: 'Ikan Monk / Pemangsa Laut', 
    desc: 'Beraneka ragam pilihan hasil laut eksotis' 
  },
  { 
    id: 8, 
    type: 'photo', 
    src: '/images/gallery/ikan6.jpg', 
    title: 'Ikan Kerapu & Kakap', 
    desc: 'Segar dan cocok untuk berbagai masakan' 
  },
  { 
    id: 9, 
    type: 'photo', 
    src: '/images/gallery/ikan7.jpg', 
    title: 'Ikan Flounder / Sebelah', 
    desc: 'Pilihan ikan segar berkualitas tinggi' 
  },
  { 
    id: 10, 
    type: 'photo', 
    src: '/images/gallery/ikan8.jpg', 
    title: 'Ikan Mackerel / Kembung', 
    desc: 'Pilihan favorit kaya gizi' 
  },
  { 
    id: 11, 
    type: 'photo', 
    src: '/images/gallery/ikan9.jpg', 
    title: 'Tuna Sirip Kuning', 
    desc: 'Kualitas terbaik pilihan restoran' 
  },
  { 
    id: 12, 
    type: 'photo', 
    src: '/images/gallery/ikan10.jpg', 
    title: 'Ikan Cod Laut', 
    desc: 'Daging lembut yang kaya nutrisi' 
  },
  { 
    id: 13, 
    type: 'photo', 
    src: '/images/gallery/view.jpg', 
    title: 'Interior Pasar Ikan Modern', 
    desc: 'Fasilitas bersih, tertata, dan berstandar internasional' 
  }
];

export { GalleryItem };
