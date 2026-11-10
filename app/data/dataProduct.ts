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
      desc: "tes",
      src: "/images/product/kembung.png", 
    },
    {
        id: 2,
        nama: "Tongkol",
        kategori: "Ikan Air Asin",
        harga: 25000,
        desc: "tes",
        src: "/images/product/tongkol.png", 
    },
    {
        id: 3,
        nama: "Cakalang",
        kategori: "Ikan Air Asin",
        harga: 17000,
        desc: "tes",
        src: "/images/product/cakalang.png", 
    },
    {
        id: 4,
        nama: "Layang",
        kategori: "Ikan Air Asin",
        harga: 30000,
        desc: "tes",
        src: "/images/product/layang.png", 
    },
    {
        id: 5,
        nama: "Kakap",
        kategori: "Ikan Air Asin",
        harga: 70000,
        desc: "tes",
        src: "/images/product/kakap.png", 
    },
    {
        id: 6,
        nama: "Tenggiri",
        kategori: "Ikan Air Asin",
        harga: 65000,
        desc: "tes",
        src: "/images/product/tenggiri.png", 
    },
    {
        id: 7,
        nama: "Patin",
        kategori: "Ikan Air Tawar",
        harga: 30000,
        desc: "tes",
        src: "/images/product/patin.jpg", 
    },
    {
        id: 8,
        nama: "Bawal",
        kategori: "Ikan Air Tawar",
        harga: 65000,
        desc: "tes",
        src: "/images/product/bawal.jpg",
    },
    {
        id: 9,
        nama: "Mujair",
        kategori: "Ikan Air Tawar",
        harga: 30000,
        desc: "tes",
        src: "/images/product/mujair.png",
    },
    {
        id: 10,
        nama: "Lele",
        kategori: "Ikan Air Tawar",
        harga: 28000,
        desc: "tes",
        src: "/images/product/lele.jpg",
    },
    {
        id: 11,
        nama: "Nila",
        kategori: "Ikan Air Tawar",
        harga: 32000,
        desc: "tes",
        src: "/images/product/nila.jpg",
    },
    {
        id: 12,
        nama: "Gurami",
        kategori: "Ikan Air Tawar",
        harga: 50000,
        desc: "tes",
        src: "/images/product/gurami.png",
    },
];
  