export type Pesanan = {
  id: number;
  nama: string;
  src: string;
  penyajian: string;
  jumlah: number;
  hargaSatuan: number;
  total: number;
  catatan?: string; 
};

const KEY = "pesanan";

export function getPesanan(): Pesanan[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) ?? "[]");
}

export function addPesanan(p: Pesanan) {
  const all = getPesanan();
  all.push(p);
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event("pesananUpdated"));
}

export function deletePesanan(id: number) {
  const sisa = getPesanan().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(sisa));
  window.dispatchEvent(new Event("pesananUpdated"));
}

export function clearPesanan() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("pesananUpdated"));
}

export type Pemesan = {
  nama: string;
  email: string;
  alamat: string;
};

export type Transaksi = {
  id: number;
  tanggal: string;
  pemesan: Pemesan;
  items: Pesanan[];
  total: number;
  status?: string;
};

const KEY_TRANSAKSI = "transaksi";

export function saveTransaksi(t: Transaksi) {
  const list = getTransaksiList();
  list.unshift({ ...t, status: t.status || "Menunggu" });
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
