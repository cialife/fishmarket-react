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
    desc: "Ikan laut kaya Omega-3 dengan tekstur daging lembut dan gurih alami. Sangat pas diolah dengan cara dibakar maupun dikukus bumbu rempah.",
    src: "/images/product/kembung.png",
  },
  {
    id: 2,
    nama: "Tongkol",
    kategori: "Ikan Air Asin",
    harga: 25000,
    desc: "Memiliki tekstur daging yang padat, tebal, dan bercita rasa gurih khas. Tidak mudah hancur saat dimasak, cocok untuk hidangan bakar bumbu pedas manis.",
    src: "/images/product/tongkol.png",
  },
  {
    id: 3,
    nama: "Cakalang",
    kategori: "Ikan Air Asin",
    harga: 17000,
    desc: "Ikan laut dengan serat daging yang kokoh dan aroma gurih yang kuat. Nikmat disajikan sebagai hidangan bakar rica maupun dikukus.",
    src: "/images/product/cakalang.png",
  },
  {
    id: 4,
    nama: "Layang",
    kategori: "Ikan Air Asin",
    harga: 30000,
    desc: "Ikan berdaging lembut dengan perpaduan rasa gurih dan sedikit manis yang lezat. Pilihan favorit keluarga yang nikmat dibakar atau dikukus.",
    src: "/images/product/layang.png",
  },
  {
    id: 5,
    nama: "Kakap",
    kategori: "Ikan Air Asin",
    harga: 70000,
    desc: "Ikan laut premium berdaging putih tebal, lembut, dan manis alami tanpa bau amis. Istimewa untuk sajian ikan bakar maupun kukus tim.",
    src: "/images/product/kakap.png",
  },
  {
    id: 6,
    nama: "Tenggiri",
    kategori: "Ikan Air Asin",
    harga: 65000,
    desc: "Memiliki daging putih yang tebal, halus, dan gurih dengan duri yang mudah dipisahkan. Sangat lezat dibakar, dikukus, maupun dijadikan bahan olahan.",
    src: "/images/product/tenggiri.png",
  },
  {
    id: 7,
    nama: "Patin",
    kategori: "Ikan Air Tawar",
    harga: 30000,
    desc: "Ikan air tawar dengan tekstur daging super lembut, juicy, dan gurih tanpa duri halus. Sangat cocok dikukus kuah segar atau dibakar bumbu kecap.",
    src: "/images/product/patin.jpg",
  },
  {
    id: 8,
    nama: "Bawal",
    kategori: "Ikan Air Tawar",
    harga: 65000,
    desc: "Berdaging tebal dengan tekstur kenyal lembut dan rasa gurih yang kaya. Salah satu pilihan terbaik untuk sajian ikan bakar maupun kukus.",
    src: "/images/product/bawal.jpg",
  },
  {
    id: 9,
    nama: "Mujair",
    kategori: "Ikan Air Tawar",
    harga: 30000,
    desc: "Ikan air tawar segar dengan daging gurih dan rasa manis alami yang ringan. Pas dinikmati dengan olahan bakar sambal kecap maupun dikukus.",
    src: "/images/product/mujair.png",
  },
  {
    id: 10,
    nama: "Lele",
    kategori: "Ikan Air Tawar",
    harga: 28000,
    desc: "Memiliki daging yang empuk, gurih, dan meresap bumbu dengan sempurna. Sangat nikmat disajikan hangat sebagai lele bakar maupun olahan segar lainnya.",
    src: "/images/product/lele.jpg",
  },
  {
    id: 11,
    nama: "Nila",
    kategori: "Ikan Air Tawar",
    harga: 32000,
    desc: "Ikan air tawar segar dengan daging putih bersih, lembut, dan manis tanpa bau tanah. Favorit untuk menu nila bakar madu atau dikukus.",
    src: "/images/product/nila.jpg",
  },
  {
    id: 12,
    nama: "Gurami",
    kategori: "Ikan Air Tawar",
    harga: 50000,
    desc: "Ikan air tawar unggulan berdaging tebal, lembut, dan manis dengan duri besar yang mudah dipisahkan. Sempurna untuk sajian bakar maupun tim kukus.",
    src: "/images/product/gurami.png",
  },
];
