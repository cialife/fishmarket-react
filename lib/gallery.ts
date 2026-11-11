import {
  galleryData as initialData,
  GalleryItem,
} from "@/app/data/dataGallery";

// KEY GALLERY
const KEY_GALLERY = "gallery_data";

export function getGalleryItems(): GalleryItem[] {
  if (typeof window === "undefined") return initialData;
  const stored = localStorage.getItem(KEY_GALLERY);
  if (!stored) {
    localStorage.setItem(KEY_GALLERY, JSON.stringify(initialData));
    return initialData;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return initialData;
  }
}

export function saveGalleryItems(items: GalleryItem[]) {
  localStorage.setItem(KEY_GALLERY, JSON.stringify(items));
  window.dispatchEvent(new Event("galleryUpdated"));
}

export function addGalleryItem(item: Omit<GalleryItem, "id">) {
  const current = getGalleryItems();
  const newItem: GalleryItem = {
    ...item,
    id: Date.now(),
  };
  const updated = [newItem, ...current];
  saveGalleryItems(updated);
  return updated;
}

export function updateGalleryItem(updatedItem: GalleryItem) {
  const current = getGalleryItems();
  const index = current.findIndex((i) => i.id === updatedItem.id);
  if (index !== -1) {
    current[index] = updatedItem;
    saveGalleryItems(current);
  }
  return current;
}

export function deleteGalleryItem(id: number) {
  const current = getGalleryItems();
  const filtered = current.filter((i) => i.id !== id);
  saveGalleryItems(filtered);
  return filtered;
}

export function resetGalleryItems() {
  saveGalleryItems(initialData);
  return initialData;
}