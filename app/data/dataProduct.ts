export type ProductItem = {
  id: number;
  nama: string;
  kategori: string;
  harga: number;
  desc: string;
  src: string;
};

export const PENYAJIAN = [
  { value: "mentah", label: "Mentah", tambahan: 0 },
  { value: "kukus", label: "Kukus", tambahan: 10000 },
  { value: "bakar", label: "Bakar", tambahan: 12000 },
] as const;

export const productData: ProductItem[] = [
  {
    id: 1,
    nama: "Kembung",
    kategori: "Ikan Air Asin",
    harga: 35000,
    desc: "Daging lembut, gurih alami, dan kaya Omega-3.",
    src: "/images/product/kembung.png",
  },
  {
    id: 2,
    nama: "Tongkol",
    kategori: "Ikan Air Asin",
    harga: 25000,
    desc: "Daging padat, tebal, dan gurih meresap bumbu.",
    src: "/images/product/tongkol.png",
  },
  {
    id: 3,
    nama: "Cakalang",
    kategori: "Ikan Air Asin",
    harga: 17000,
    desc: "Serat daging kokoh dengan cita rasa gurih khas.",
    src: "/images/product/cakalang.png",
  },
  {
    id: 4,
    nama: "Layang",
    kategori: "Ikan Air Asin",
    harga: 30000,
    desc: "Daging lembut dengan rasa gurih dan sedikit manis.",
    src: "/images/product/layang.png",
  },
  {
    id: 5,
    nama: "Kakap",
    kategori: "Ikan Air Asin",
    harga: 70000,
    desc: "Ikan laut premium berdaging putih tebal dan lembut.",
    src: "/images/product/kakap.png",
  },
  {
    id: 6,
    nama: "Tenggiri",
    kategori: "Ikan Air Asin",
    harga: 65000,
    desc: "Daging putih halus, tebal, dan minim duri halus.",
    src: "/images/product/tenggiri.png",
  },
  {
    id: 7,
    nama: "Patin",
    kategori: "Ikan Air Tawar",
    harga: 30000,
    desc: "Daging super lembut, juicy, dan tanpa duri halus.",
    src: "/images/product/patin.jpg",
  },
  {
    id: 8,
    nama: "Bawal",
    kategori: "Ikan Air Tawar",
    harga: 65000,
    desc: "Berdaging tebal dengan tekstur kenyal lembut dan gurih.",
    src: "/images/product/bawal.jpg",
  },
  {
    id: 9,
    nama: "Mujair",
    kategori: "Ikan Air Tawar",
    harga: 30000,
    desc: "Daging segar, gurih, dengan rasa manis alami.",
    src: "/images/product/mujair.png",
  },
  {
    id: 10,
    nama: "Lele",
    kategori: "Ikan Air Tawar",
    harga: 28000,
    desc: "Daging empuk, gurih, dan sangat pas dibakar bumbu.",
    src: "/images/product/lele.jpg",
  },
  {
    id: 11,
    nama: "Nila",
    kategori: "Ikan Air Tawar",
    harga: 32000,
    desc: "Daging putih bersih, manis alami, dan bebas bau tanah.",
    src: "/images/product/nila.jpg",
  },
  {
    id: 12,
    nama: "Gurami",
    kategori: "Ikan Air Tawar",
    harga: 50000,
    desc: "Daging tebal, lembut, dan manis dengan duri besar.",
    src: "/images/product/gurami.png",
  },
];
