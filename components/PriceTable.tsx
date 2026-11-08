import { Fragment } from "react";
import { productData, PENYAJIAN } from "@/app/data/dataProduct";

type Kategori = "Ikan Air Asin" | "Ikan Air Tawar";

type Props = {
  kategori?: Kategori; // opsional: kosong = tampilkan semua kategori
};

const SEMUA_KATEGORI: Kategori[] = ["Ikan Air Asin", "Ikan Air Tawar"];

export default function PriceTable({ kategori }: Props) {
  const daftarKategori = kategori ? [kategori] : SEMUA_KATEGORI;

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
          {daftarKategori.map((kategori) => {
            const items = productData.filter((p) => p.kategori === kategori);

            return (
              <Fragment key={kategori}>
                {items.map((item, i) => (
                  <tr key={item.id}>
                    <th scope="row">{item.nama}</th>
                    {PENYAJIAN.map((p) => (
                      <td key={p.value}>
                        {(item.harga + p.tambahan) / 1000}K / kg
                      </td>
                    ))}
                    {/* sel kategori hanya di baris pertama, menutupi semua baris kategori itu */}
                    {i === 0 && (
                      <td rowSpan={items.length} className="kategori-cell">
                        {kategori}
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