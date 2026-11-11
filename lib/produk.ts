import { productData, ProductItem } from "@/app/data/dataProduct";

export const getProduk = (): ProductItem[] => {
  if (typeof window === "undefined") return [];

  // KEY PRODUK
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
  if (typeof window === "undefined") return;
  localStorage.setItem("products", JSON.stringify(products));
  window.dispatchEvent(new Event("produkUpdated"));
};

export const getProdukById = (id: number) => {
  const current = getProduk();
  return current.find((p: any) => p.id === Number(id)) || null;
};

export const updateProduk = (updatedProduct: any) => {
  const current = getProduk();
  const index = current.findIndex(
    (p: any) => p.id === Number(updatedProduct.id),
  );
  if (index !== -1) {
    current[index] = updatedProduct;
  } else {
    current.push(updatedProduct);
  }
  saveProduk(current);
  return current;
};

export const deleteProduk = (id: number) => {
  const current = getProduk();
  const filtered = current.filter((p: any) => p.id !== id);
  saveProduk(filtered);
  return filtered;
};
