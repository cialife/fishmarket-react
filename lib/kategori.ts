export type KategoriItem = {
  id: number;
  nama: string;
};

// KEY KATEGORI
const KEY_KATEGORI = "categories_data";

export const DEFAULT_KATEGORI: KategoriItem[] = [
  { id: 1, nama: "Ikan Air Asin" },
  { id: 2, nama: "Ikan Air Tawar" },
];

export function getKategori(): KategoriItem[] {
  if (typeof window === "undefined") return DEFAULT_KATEGORI;
  const stored = localStorage.getItem(KEY_KATEGORI);
  if (!stored) {
    localStorage.setItem(KEY_KATEGORI, JSON.stringify(DEFAULT_KATEGORI));
    return DEFAULT_KATEGORI;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return DEFAULT_KATEGORI;
  }
}

export function saveKategoriList(list: KategoriItem[]) {
  localStorage.setItem(KEY_KATEGORI, JSON.stringify(list));
  window.dispatchEvent(new Event("kategoriUpdated"));
}

export function addKategori(nama: string) {
  const current = getKategori();
  const newItem: KategoriItem = { id: Date.now(), nama };
  const updated = [...current, newItem];
  saveKategoriList(updated);
  return updated;
}

export function updateKategori(id: number, nama: string) {
  const current = getKategori();
  const index = current.findIndex((k) => k.id === id);
  if (index !== -1) {
    current[index].nama = nama;
    saveKategoriList(current);
  }
  return current;
}

export function deleteKategori(id: number) {
  const current = getKategori();
  const filtered = current.filter((k) => k.id !== id);
  saveKategoriList(filtered);
  return filtered;
}
