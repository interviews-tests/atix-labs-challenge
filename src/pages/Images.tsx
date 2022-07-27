import React, { useEffect, useState } from "react";
import { FileInLocalStorage } from "../utils/interfaces";
import { getImagesFromLocalStorage } from "../utils/constants";
import ImageGallery from "../components/ImageGallery";

const ImagesPage = () => {
  const [images, setImages] = useState<FileInLocalStorage[]>([]);
  const getImages = async () => {
    try {
      const _images = await getImagesFromLocalStorage();
      setImages(_images);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getImages();
  }, []);
  return (
    <>
      <h2>Images:</h2>

      {images.length ? (
        <>
          <small className="text-muted">Qty: {images.length}</small>
          <ImageGallery images={images} />
        </>
      ) : (
        <p>NO IMAGES TO SHOW</p>
      )}
    </>
  );
};
export default ImagesPage;
