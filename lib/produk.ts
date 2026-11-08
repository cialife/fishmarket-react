import { productData } from "@/app/data/dataProduct";

export const getProduk = () => {
  if (typeof window === "undefined") return [];
  const localData = localStorage.getItem("products");
  if (localData) {
    return JSON.parse(localData);
  } else {
    // Jika belum ada di localstorage, set data default
    localStorage.setItem("products", JSON.stringify(productData));
    return productData;
  }
};

export const saveProduk = (products: any[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const deleteProduk = (id: number) => {
  const current = getProduk();
  const filtered = current.filter((p: any) => p.id !== id);
  saveProduk(filtered);
  return filtered;
};
