import React from 'react'

const ImageCarousel = () => {
    const imageArray = [
        "/public/Assets/Coffee 1.jpg",
        "/public/Assets/Coffee 2.webp",
        "/public/Assets/Coffee 3.jpg",
        "/public/Assets/Coffee 4.jpg",
        "/public/Assets/Coffee 5.webp",
        "/public/Assets/Coffee 6.webp",
        "/public/Assets/Coffee 7.webp",
        "/public/Assets/Coffee 8.webp",
        "/public/Assets/Coffee.jpg",
        "/public/Assets/Coffee.png",
        "/public/Assets/Coffee.webp",
      ];
  return (
    <div
    id="carouselExample"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div
      className="carousel-inner"
      style={{ height: "500px", objectFit: "cover" }}
    >
      {imageArray.map((image, index) => (
        <div
          key={index}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <img
            src={image}
            className="d-block w-100"
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span
        className="carousel-control-prev-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span
        className="carousel-control-next-icon"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  )
}

export default ImageCarousel