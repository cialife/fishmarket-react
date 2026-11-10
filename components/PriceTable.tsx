"use client";
import { Fragment, useEffect, useState } from "react";
import { ProductItem, PENYAJIAN } from "@/app/data/dataProduct";
import { getProduk } from "@/lib/produk";
import { getKategori, KategoriItem } from "@/lib/kategori";

type Props = {
  kategori?: string; // opsional: kosong = tampilkan semua kategori
};

export default function PriceTable({ kategori }: Props) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<KategoriItem[]>([]);

  useEffect(() => {
    const loadProduk = () => setProducts(getProduk());
    const loadKategori = () => setCategories(getKategori());

    loadProduk();
    loadKategori();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "products") loadProduk();
      if (e.key === "categories_data") loadKategori();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("kategoriUpdated", loadKategori);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("kategoriUpdated", loadKategori);
    };
  }, []);

  const daftarKategori = kategori ? [kategori] : categories.map((k) => k.nama);

  return (
    <div className="price-table-wrap">
      <table className="price-table">
        <thead>
          <tr>
            <th rowSpan={2}>Tipe</th>
            <th colSpan={PENYAJIAN.length}>Cara Penyajian</th>
            <th rowSpan={2}>Kategori</th>
          </tr>
          <tr>
            {PENYAJIAN.map((p) => (
              <th key={p.value}>{p.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daftarKategori.map((namaKategori) => {
            const items = products.filter((p) => p.kategori === namaKategori);

            // kategori baru tanpa produk tetap ditampilkan
            if (items.length === 0) {
              return (
                <tr key={namaKategori}>
                  <th scope="row" className="text-muted">
                    -
                  </th>
                  <td colSpan={PENYAJIAN.length} className="text-muted">
                    Belum ada produk
                  </td>
                  <td className="kategori-cell">{namaKategori}</td>
                </tr>
              );
            }

            return (
              <Fragment key={namaKategori}>
                {items.map((item, i) => (
                  <tr key={item.id}>
                    <th scope="row">{item.nama}</th>
                    {PENYAJIAN.map((p) => (
                      <td key={p.value}>
                        {(item.harga + p.tambahan) / 1000}K / kg
                      </td>
                    ))}
                    {i === 0 && (
                      <td rowSpan={items.length} className="kategori-cell">
                        {namaKategori}
                      </td>
                    )}
                  </tr>
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
