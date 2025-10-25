import React, { useEffect } from "react"; 
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import "./VideoSlider.css";
import arrow_back from "../../Assets/Catalog/arrow-up-1--arrow-up-keyboard.png";
import arrow_go from "../../Assets/Catalog/arrow-up-2--arrow-up-keyboard.png";
const VideoSlider = () => {
  const videoData = [
    {
      poster:
        "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    },
    {
      poster:
        "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    },
    {
      poster:
        "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    },
    {
      poster:
        "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    },
    {
      poster:
        "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    },
    {
      poster:
        "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    },
  ];

  useEffect(() => {
    const playerSettings = {
      controls: ["play-large"],
      fullscreen: { enabled: false },
      resetOnEnd: true,
      hideControls: true,
      clickToPlay: true,
      keyboard: false,
    };

    const players = Plyr.setup(".js-player", playerSettings);

    // Pause other players when one is playing
    players.forEach((instance) => {
      instance.on("play", () => {
        players.forEach((otherInstance) => {
          if (instance !== otherInstance) {
            otherInstance.pause();
          }
        });
      });
    });

    // Pause all videos when the carousel slides
    const carousel = document.querySelector(".video-section");
    carousel.addEventListener("translated.owl.carousel", () => {
      players.forEach((player) => player.pause());
    });

    return () => {
      carousel.removeEventListener("translated.owl.carousel", () => {
        players.forEach((player) => player.pause());
      });
    };
  }, []);

  const options = {
    stagePadding: 200,
    loop: true,
    margin: 10,
    items: 1,
    nav: true,
    navText: [
      `<img src="${arrow_back}" alt="Previous" />`,
      `<img src="${arrow_go}" alt="Next" />`,
    ],
    responsive: {
      0: {
        items: 1,
        stagePadding: 60,
      },
      600: {
        items: 1,
        stagePadding: 100,
      },
      1000: {
        items: 1,
        stagePadding: 200,
      },
      1200: {
        items: 1,
        stagePadding: 250,
      },
      1400: {
        items: 1,
        stagePadding: 300,
      },
      1600: {
        items: 1,
        stagePadding: 350,
      },
      1800: {
        items: 1,
        stagePadding: 400,
      },
    },
  };

  return (
    <div className="video-section">
      <OwlCarousel className="owl-carousel" {...options}>
        {videoData.map((video, index) => (
          <div className="item" key={index}>
            <video
              className="js-player"
              crossOrigin="anonymous"
              playsInline
              poster={video.poster}
            >
              <source src={video.src} type="video/mp4" size="720" />
            </video>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
};

export default VideoSlider;
