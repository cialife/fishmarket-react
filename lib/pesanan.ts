export type Pesanan = {
    id: number;
    nama: string;
    src: string;
    penyajian: string;
    jumlah: number;
    total: number;
};

const KEY = "pesanan";

export function getPesanan(): Pesanan[] {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
}

export function addPesanan(p: Pesanan) {
    const all = getPesanan();
    all.push(p);
    localStorage.setItem(KEY, JSON.stringify(all));

    window.dispatchEvent(new Event("pesananUpdated"));
}

export function deletePesanan(id: number) {
    // Simpan semua pesanan yang idnya bukan id yang mau di delete
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
};

const KEY_TRANSAKSI ="transaksi";

export function saveTransaksi(t: Transaksi) {
    localStorage.setItem(KEY_TRANSAKSI, JSON.stringify(t));
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
    const raw = localStorage.getItem(KEY_TRANSAKSI);
    return raw ? JSON.parse(raw) : null;
}