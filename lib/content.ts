export const getDefaultContent = () => ({
    homeTitle: "Pasar Ikan Modern Muara Baru",
    homeSub: "Segarnya tetap asli.",
    aboutFounderTitle: "Founder Pasar Ikan Modern Muara Baru",
    aboutFounderText: "Pada 13 Maret 2019, pasar kami resmi diresmikan oleh Joko Widodo, didampingi oleh Menteri Kelautan dan Perikanan serta sejumlah pejabat pemerintah lainnya...",
    aboutSejakTitle: "Sejak 2019",
    aboutSejakText: "Apa yang dimulai pada tahun 2019 sebagai babak baru bagi Muara Baru, kini telah berkembang menjadi tempat terpercaya..."
});

export const getContent = () => {
    if (typeof window === "undefined") return getDefaultContent();
    const data = localStorage.getItem("siteContent");
    return data ? JSON.parse(data) : getDefaultContent();
};

export const saveContent = (content: any) => {
    localStorage.setItem("siteContent", JSON.stringify(content));
};