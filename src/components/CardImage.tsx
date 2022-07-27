import React from "react";
import { FileInLocalStorage } from "../utils/interfaces";

interface CardImageProps {
  image: FileInLocalStorage;
}
const CardImage = ({ image }: CardImageProps) => {
  return (
    <div className="card border-primary h-100">
      <img
        src={image.src}
        className="img"
        alt={image.name}
        key={image.timestamp}
        style={{
          width: "100%",
          height: "35vw",
          objectFit: "scale-down",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{image.name}</h5>
      </div>
      <div className="card-footer">
        {new Date(image.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default CardImage;
