import { FileInLocalStorage } from "../utils/interfaces";
import CardImage from "./CardImage";

interface ImageGalleryProps {
  images: FileInLocalStorage[];
}
const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="row">
      {images.map((image) => {
        return (
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 my-2"
            key={image.timestamp}
          >
            <CardImage image={image} />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGallery;
