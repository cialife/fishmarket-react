export type GalleryItem = {
  id: number;
  type: "photo" | "video";
  src: string;
  previewSrc?: string;
  title: string;
  desc: string;
};

export const galleryData: GalleryItem[] = [
  {
    id: 1,
    type: "photo",
    src: "/images/burmese.jpg",
    title: "Pasar Ikan Modern Muara Baru",
    desc: "Fresh Catch Every Day",
  },
  {
    id: 2,
    type: "photo",
    src: "/images/GettyImages-492521043.jpg",
    title: "Fresh Tuna Fish",
    desc: "Caught by Local Fishermen",
  },
  {
    id: 3,
    type: "photo",
    src: "/images/maxresdefault (1).jpg",
    title: "Premium Salmon Fish",
    desc: "Export-Quality Freshness",
  },
  {
    id: 4,
    type: "photo",
    src: "/images/4265454432.jpg",
    title: "Clean & Hygienic Stall",
    desc: "High Hygiene Standards Maintained",
  },
  {
    id: 5,
    type: "photo",
    src: "/images/5b027c1a-26c8-45a0-942f-b9d69a49a7e0.jpeg",
    title: "Fresh Catch from The Sea",
    desc: "High-Quality Daily Supply",
  },
  {
    id: 6,
    type: "video",
    src: "https://www.youtube-nocookie.com/embed/AB4BaF_Uc0s?autoplay=1&rel=0",
    previewSrc:
      "https://www.youtube-nocookie.com/embed/AB4BaF_Uc0s?autoplay=1&mute=1&loop=1&playlist=AB4BaF_Uc0s&controls=0&enablejsapi=1",
    title: "Local Fishing Footage",
    desc: "From Sea to Market",
  },
  {
    id: 7,
    type: "photo",
    src: "/images/maxresdefault (2).jpg",
    title: "Live Fish",
    desc: "Succulent Daily Supply",
  },
  {
    id: 8,
    type: "photo",
    src: "/images/OIP (1).jpg",
    title: "Epinephelus fuscoguttatus",
    desc: "Sea Delights",
  },
  {
    id: 9,
    type: "photo",
    src: "/images/school-of-cod-fish-h7gt4d1njo8m3jr0.jpg",
    title: "Fresh cod fish",
    desc: "Perfect for Culinary Uses",
  },
  {
    id: 10,
    type: "photo",
    src: "/images/OIP.jpg",
    title: "Mackerel",
    desc: "Fresh Marine Selection",
  },
  {
    id: 11,
    type: "photo",
    src: "/images/NORALBUR4JIEXGEOA7HIETZHSQ.jpg",
    title: "Halibut",
    desc: "Wild-Caught Freshness",
  },
  {
    id: 12,
    type: "photo",
    src: "/images/OIP (2).jpg",
    title: "Sea Bass",
    desc: "Fresh sea bass fish caught",
  },
  {
    id: 13,
    type: "photo",
    src: "/images/GettyImages-492521043 (1).jpg",
    title: "Fresh Flounder",
    desc: "High Quality & Fresh",
  },
  {
    id: 14,
    type: "photo",
    src: "/images/P1030059.jpg",
    title: "Yellow Fin Tuna",
    desc: "Top Choice for Restaurants",
  },
  {
    id: 15,
    type: "photo",
    src: "/images/c472a4653c7ea795e6fc708e04383d35.jpg",
    title: "Monk Fish",
    desc: "A Wide Variety of Fish",
  },
];
