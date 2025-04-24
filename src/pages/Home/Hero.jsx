import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const heroSlides = [
  {
    title: "Empowering Students for a Brighter Future",
    subtitle: "Quality education with modern technology.",
    button: "Learn More",
    image: "/assets/computer.jpg",
    link: "/about",
  },
  {
    title: "Unlocking Knowledge, Building Success",
    subtitle: "Innovative learning environments for all.",
    button: "Our Services",
    image: "/assets/class.jpg",
    link: "/service",
  },
  {
    title: "Dedicated Teachers, Inspired Learning",
    subtitle: "Guiding students towards excellence.",
    button: "Meet Our Team",
    image: "/assets/teacher.jpg",
    link: "/account",
  },
  {
    title: "Join Our Community of Scholars",
    subtitle: "Shape your future with us today.",
    button: "Contact Us",
    image: "/assets/teach.jpg",
    link: "/contact",
  },
];

function NextArrow({ onClick }) {
  return (
    <div
      className="absolute right-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-white p-3 shadow-lg transition hover:bg-blue-500 hover:text-white"
      onClick={onClick}
    >
      <FaArrowRight className="text-xl" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      className="absolute left-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-white p-3 shadow-lg transition hover:bg-blue-500 hover:text-white"
      onClick={onClick}
    >
      <FaArrowLeft className="text-xl" />
    </div>
  );
}

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => {
      document.querySelectorAll(".hero-slide a").forEach((link) => {
        link.setAttribute("tabindex", "-1");
      });
    },
    afterChange: (current) => {
      document
        .querySelector(`.slick-slide[data-index="${current}"]`)
        ?.querySelectorAll("a")
        .forEach((link) => {
          link.setAttribute("tabindex", "0");
        });
    },
  };

  return (
    <div className="relative mt-8 h-[50vh] w-full">
      <Slider {...settings}>
        {heroSlides.map((slide, index) => (
          <div key={index} className="hero-slide relative h-[50vh] w-full">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
              loading="eager"
            />
            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-6 text-center text-white">
              <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                {slide.title}
              </h1>
              <p className="mb-6 text-lg md:text-xl">{slide.subtitle}</p>
              <Link
                to={slide.link}
                className="rounded-full bg-blue-400 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-500 hover:text-black"
              >
                {slide.button}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
