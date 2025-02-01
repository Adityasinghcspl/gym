import { useState } from 'react';
import { AiOutlinePicture } from 'react-icons/ai';

const galleryImages = [
  { src: 'img/gallery/gallery-1.jpg', wide: true },
  { src: 'img/gallery/gallery-2.jpg', wide: false },
  { src: 'img/gallery/gallery-3.jpg', wide: false },
  { src: 'img/gallery/gallery-4.jpg', wide: false },
  { src: 'img/gallery/gallery-5.jpg', wide: false },
  { src: 'img/gallery/gallery-6.jpg', wide: true },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-[#151515] overflow-hidden py-10">
      <div className="container mx-auto px-4">
        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden group cursor-pointer ${image.wide ? 'lg:col-span-2' : ''}`}
              onClick={() => setSelectedImage(image.src)}
            >
              <img src={image.src} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              {/* Hover Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <AiOutlinePicture className="text-orange-500 text-5xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative max-w-3xl w-full p-4">
            <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
            <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
