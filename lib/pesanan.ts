import { getProduk } from "@/lib/produk";

export type Pesanan = {
  id: number;
  email?: string;
  nama: string;
  src?: string;
  kategori?: string;
  penyajian: string;
  jumlah: number;
  hargaSatuan: number;
  total: number;
  catatan?: string;
};

// KEY PESANAN
const KEY = "pesanan";

function getAllPesanan(): Pesanan[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function getPesanan(email?: string): Pesanan[] {
   const all = getAllPesanan();
   if (!email) return [];
  return all.filter((p) => p.email?.toLowerCase() === email.toLowerCase());

}

export function addPesanan(p: Pesanan) {
  const all = getAllPesanan();
  all.push(p);
  localStorage.setItem(KEY, JSON.stringify(all));
  // langsung sinkronisasi komponen dan tab browser
  window.dispatchEvent(new Event("pesananUpdated"));
}

export function deletePesanan(id: number) {
  const sisa = getAllPesanan().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(sisa));
  window.dispatchEvent(new Event("pesananUpdated"));
}

export function clearPesanan(email: string) {
  const sisa = getAllPesanan().filter(
    (p) => p.email?.toLowerCase() !== email.toLowerCase(),
  );
  localStorage.setItem(KEY, JSON.stringify(sisa));
  window.dispatchEvent(new Event("pesananUpdated"));
}

export type Pemesan = {
  nama: string;
  email: string;
  alamat: string;
};

export type Transaksi = {
  id: number;
  tanggal?: string;
  pemesan: Pemesan;
  items: Pesanan[];
  total: number;
  status?: string;
};

// KEY TRANSAKSI
const KEY_TRANSAKSI = "transaksi";

export function saveTransaksi(t: Transaksi) {
  const list = getTransaksiList();
  const produkList = getProduk();

  const transaksiBaru: Transaksi = {
    ...t,
    tanggal: t.tanggal ?? new Date().toISOString(),
    status: t.status || "Menunggu",
    items: t.items.map((item) => ({
      ...item,
      kategori:
        item.kategori ??
        produkList.find((p) => p.nama === item.nama)?.kategori ??
        "",
    })),
  };

  list.unshift(transaksiBaru);
  localStorage.setItem(KEY_TRANSAKSI, JSON.stringify(list));
  window.dispatchEvent(new Event("pesananUpdated"));
}

export function getTransaksiList(): Transaksi[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY_TRANSAKSI);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [parsed];
  } catch {
    return [];
  }
}

export function getTransaksi(): Transaksi | null {
  const list = getTransaksiList();
  // Mengambil  transaksi paling depan (terakhir)
  return list.length > 0 ? list[0] : null;
}

export function updateTransaksiStatus(id: number, status: string) {
  const list = getTransaksiList();
  const index = list.findIndex((t) => t.id === id);
  if (index !== -1) {
    list[index].status = status;
    localStorage.setItem(KEY_TRANSAKSI, JSON.stringify(list));
    window.dispatchEvent(new Event("pesananUpdated"));
  }
}

export function deleteTransaksi(id: number) {
  const list = getTransaksiList();
  const filtered = list.filter((t) => t.id !== id);
  localStorage.setItem(KEY_TRANSAKSI, JSON.stringify(filtered));
  window.dispatchEvent(new Event("pesananUpdated"));
}
