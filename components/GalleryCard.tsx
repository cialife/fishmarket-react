import React from 'react';
import { Card, Button } from 'react-bootstrap';

export type GalleryItem = {
  id: number;
  type: 'photo' | 'video';
  src: string;
  previewSrc?: string;
  title: string;
  desc: string;
};

interface GalleryCardProps {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
}
export default function GalleryCard({ item, onSelect }: GalleryCardProps) {
  return (
    <Card className="gallery-card-item h-100 shadow-sm border-0 rounded-4 overflow-hidden position-relative">
      <div 
        className="image-wrapper position-relative" 
        style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => onSelect(item)}
      >
        {item.type === 'photo' ? (
          <Card.Img 
            variant="top" 
            src={item.src} 
            alt={item.title} 
            className="w-100 h-100 image-cover"
          />
        ) : (
          <iframe
            src={item.previewSrc}
            title={item.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            className="w-100 h-100"
            style={{ pointerEvents: 'none', border: 0 }}
          ></iframe>
        )}

 <Button 
  variant="dark" 
  className="zoom-badge rounded-circle p-0 m-0 border-0"
  onClick={(e) => {
    e.stopPropagation();
    onSelect(item);
  }}
  aria-label="Perbesar"
>
  {item.type === 'photo' ? (
    <img 
      src="https://cdn-icons-png.flaticon.com/256/44/44981.png" 
      alt="Zoom" 
      className="zoom-icon-img"
      style={{ width: '15px', height: '15px' }} // Pakai inline style agar ukurannya patuh dan benar-benar kecil
    />
  ) : (
    <i className="fa-solid fa-play text-warning fs-6"></i>
  )}
</Button>
</div>

      <Card.Body className="text-center bg-white py-3">
        <Card.Title className="fw-bold text-dark fs-5 mb-1">{item.title}</Card.Title>
        <Card.Text className="text-muted small mb-0">{item.desc}</Card.Text>
      </Card.Body>
    </Card>
  );
}