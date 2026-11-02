'use client';

import React, { useState } from 'react';
import type { Metadata } from "next";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Data galeri
  const galleryItems = [
    { id: 'img1', type: 'photo', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZNpL0Mc5rzWbPfEJFFd60_rJavuBOJ5GgjKVUD8veytxaq9Aa8sVbu4jz&s=10', title: 'Pasar Ikan Modern Muara Baru', desc: 'Pasar bersih dengan ikan segar' },
    { id: 'img2', type: 'photo', src: 'https://images.bisnis.com/posts/2018/11/16/860511/antarafoto-sistem-budi-daya-pertanian-akuaponik-101118-ast-6-1.jpg', title: 'Ikan Lele Segar', desc: 'Ditangkap oleh nelayan lokal' },
    { id: 'img3', type: 'photo', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ8Zm_Upb5de2k7aOxL5qwx8SX4WA4m9l_B76xsVUbsw&s=10', title: 'Ikan Nila Premium', desc: 'Kualitas premium dan segar' },
    { id: 'img4', type: 'photo', src: 'https://asset.kompas.com/crops/s6a_ePWHNBV3G7GNxInlxunpdLs=/0x85:1024x768/1200x800/data/photo/2019/03/21/4265454432.jpg', title: 'Kebersihan Stand', desc: 'Standar kebersihan terjaga' },
    { id: 'img5', type: 'photo', src: 'https://awsimages.detik.net.id/community/media/visual/2019/03/13/5b027c1a-26c8-45a0-942f-b9d69a49a7e0.jpeg?w=700&q=90', title: 'Tangkapan Segar dari Laut', desc: 'Pasokan dengan kualitas tinggi' },
    { id: 'vid1', type: 'video', src: 'https://www.youtube-nocookie.com/embed/AB4BaF_Uc0s', title: 'Video Suasana Pasar', desc: 'Keramaian Pasar' },
    { id: 'img7', type: 'photo', src: 'https://i.ytimg.com/vi/iGpRUDOjWIw/maxresdefault.jpg', title: 'Ikan Mentah', desc: 'Pasokan sehari-hari' },
    { id: 'img8', type: 'photo', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu9yWJv9LFlxsSsdmNMFabRYptpErCv7C8hDRP0MDAkiQazSB1Cxd0f2Rv&s=10', title: 'Penangkapan Ikan Tenggiri Raksasa', desc: 'Ditangkap oleh nelayan lokal' },
    { id: 'img9', type: 'photo', src: 'https://asset.kompas.com/crops/r9nRwGjo5ht4OZ-FCqcoEu_4nDM=/780x520:780x520/1200x800/data/photo/2021/05/30/60b2e4ed269a0.jpg', title: 'Ikan Gurami dari Laut', desc: 'Penangkapan ikan gurami' },
    { id: 'img10', type: 'photo', src: 'https://pict.sindonews.com/size/640/salsabila/photo/2020/12/31/1/7834/G-jelang-malam-tahun-baru-pasar-ikan-muara-angke-ramai-pembeli-dvv.jpg', title: 'Keramaian Pasar', desc: 'Cocok untuk belanja tahun baru' },
    { id: 'img11', type: 'photo', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZBId7WvaJwGz8xJZVkxukDJYWpJEY37uwtnhXhbIYbTXh5ox_luZMUQg&s=10', title: 'Kunjungan ke Pasar', desc: 'Pak Joko Widodo memastikan operasional lancar' },
    { id: 'img12', type: 'photo', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtphotOs9ieCg9N-Dww8HayE76QVW3gMIruh3YFroSkJTXI0TEldILuh8X&s=10', title: 'Penangkapan Ikan Tongkol', desc: 'Ikan segar ditangkap langsung dari sumbernya' },
    { id: 'img13', type: 'photo', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsebBNTvRhhHSy8CIHVXmDZpPRG6lyse3ZMD9PSK5363vVz2gXwb3wrlB2&s=10', title: 'Ikan Kakap Berkualitas', desc: 'Segar seperti laut' },
    { id: 'img14', type: 'photo', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSO9e1z1engWyGKbPEhxgFdJ5T3Y8QB5iyOZJN2j1X8cRRlrjqj3Fx_9k&s=10', title: 'Kesegaran Ikan Patin', desc: 'Ditangkap oleh nelayan lokal' },
    { id: 'img15', type: 'photo', src: 'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1551235436/v2s0wgu0dvwfz4q4mflo.jpg', title: 'Keramahan Penjual', desc: 'Menjual dan memasak dengan hati yang hangat' },
  ];

  // Filter item berdasarkan pilihan kategori
  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#fcffee] to-[#d7f8ff] font-sans text-gray-800">
      {/* Header */}
      <header className="flex fixed top-0 left-0 w-full h-16 justify-between items-center bg-[#0a1331] px-16 shadow-md z-10 box-border">
        <h2 className="text-[#f8ff74] text-xl font-bold flex items-center gap-2">
          <i className="fa-solid fa-fish"></i> Muara Baru
        </h2>
        <nav className="flex gap-4">
          <a href="home.html" className="text-[#defaff] no-underline hover:text-[#f8ff74]">Beranda</a>
          <a href="about.html" className="text-[#defaff] no-underline hover:text-[#f8ff74]">Tentang Kami</a>
          <a href="gallery.html" className="text-[#f8ff74] no-underline">Galeri</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[55vh] pt-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video controls autoPlay loop muted className="w-full h-full object-cover filter brightness-[45%]">
            <source src="/videos/gallery.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#defaff] mb-4">Galeri Pasar Ikan Modern Muara Baru</h1>
          <a href="#content" className="bg-gradient-to-l from-[#1e2f67] to-[#090f20] px-4 py-2 rounded-lg text-[#f8ff74] font-bold no-underline hover:bg-[#f8ff74] hover:text-[#0a1331] transition">
            Lihat Galeri <i className="fa-solid fa-circle-arrow-down"></i>
          </a>
        </div>
      </section>

      {/* Gallery Main Container */}
      <div id="content" className="max-w-[1200px] w-full mx-auto px-5 py-10 mb-28">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold inline-block p-2 bg-[#202b51] text-[#f8ff74] rounded-lg">ㆍ Momen yang Terdokumentasi ㆍ</h2>
          <p className="text-gray-600 mt-2">Keseharian para nelayan lokal dan suasana Pasar Ikan Modern Muara Baru</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button 
            onClick={() => setActiveFilter('all')} 
            className={`px-7 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${activeFilter === 'all' ? 'bg-[#f8ff74] text-[#0b132b] font-bold shadow-lg' : 'bg-white/5 text-[#003b88] border border-white/20 hover:bg-[#1b2d5e] hover:text-white'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('photo')} 
            className={`px-7 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${activeFilter === 'photo' ? 'bg-[#f8ff74] text-[#0b132b] font-bold shadow-lg' : 'bg-white/5 text-[#003b88] border border-white/20 hover:bg-[#1b2d5e] hover:text-white'}`}
          >
            Photo
          </button>
          <button 
            onClick={() => setActiveFilter('video')} 
            className={`px-7 py-2.5 rounded-full text-sm font-medium transition cursor-pointer ${activeFilter === 'video' ? 'bg-[#f8ff74] text-[#0b132b] font-bold shadow-lg' : 'bg-white/5 text-[#003b88] border border-white/20 hover:bg-[#1b2d5e] hover:text-white'}`}
          >
            Video
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setLightboxSrc(item.src)}
              className="group flex flex-col cursor-pointer transition transform hover:-translate-y-1.5"
            >
              <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden shadow-xl bg-[#1a233a]">
                {item.type === 'photo' ? (
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover transition duration-400 group-hover:scale-105" />
                ) : (
                  <iframe 
                    src={`${item.src}?autoplay=1&mute=1&loop=1&playlist=AB4BaF_Uc0s&controls=0`} 
                    title={item.title} 
                    className="w-full h-full pointer-events-none border-0"
                  />
                )}
                <span className="absolute top-3 right-3 bg-[#0b132b]/85 text-[#f8ff74] text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center gap-1.5 z-20">
                  <i className="fa-solid fa-magnifying-glass"></i> Zoom
                </span>
              </div>
              <div className="pt-4 text-center">
                <h3 className="text-lg font-bold text-[#090f25]">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-50">
          <button 
            onClick={() => setLightboxSrc(null)}
            className="absolute top-6 right-8 text-white text-4xl font-bold cursor-pointer hover:text-[#f8ff74]"
          >
            &times;
          </button>
          <div className="max-w-[85%] max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl">
            <img src={lightboxSrc} alt="Lightbox Preview" className="w-full max-h-[80vh] object-contain block" />
          </div>
        </div>
      )}
    </div>
  );
}