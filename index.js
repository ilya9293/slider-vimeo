const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: null,
  },
  slidesPerView: 4,
  spaceBetween: 20,
});

const slide = document.querySelectorAll(".swiper-slide");
slide.forEach((el) => {
  const imgPreview = document.createElement("img");
  el.appendChild(imgPreview);
});
const imgSlide = document.querySelectorAll(".swiper-slide img");

imgSlide.forEach((el) => el.addEventListener("click", () => myPopup.show()));

const getVideos = async () => {
  try {
    const res = await fetch(
      "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/824804225&maxheight=600"
    );
    const video = await res.json();
    imgSlide.forEach((el) => {
      el.src = video.thumbnail_url_with_play_button;
    });
    modal(video.html);
  } catch (error) {
    console.log(error);
  }
};

getVideos();

const modal = (html) => {
  const bodyPopup = document.querySelector(".popup-body");
  bodyPopup.innerHTML = html;
};

const closeModal = () => {
   const iframes = document.querySelectorAll(".popup-body iframe");
  iframes.forEach(iframe => {
    iframe.contentWindow.postMessage('{"method":"pause"}', '*');
    iframe.contentWindow.postMessage('{"method":"setCurrentTime", "value":0}', '*');
   });
}

const myPopup = new Popup({
  id: "my-popup",
  loadCallback: modal,
  hideCallback: closeModal,
  hideTitle: true,
});
