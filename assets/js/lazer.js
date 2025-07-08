document.addEventListener('DOMContentLoaded', () => {
  const lazerCards = document.querySelectorAll('.lazer-card');
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalTitle = document.getElementById('galleryModalTitle');
  const swiperWrapper = document.querySelector('#gallerySwiper .swiper-wrapper');

  const lazerImages = {
    piscina: [
      'assets/images/destaques/piscina.jpg',
      'assets/images/destaques/piscina2.jpg',
    ],
    quadra: [
      'assets/images/destaques/quadra.jpg',
      'assets/images/destaques/quadra2.jpg',
    ],
    recreacao: [
      'assets/images/destaques/recreacao.jpg',
    ],
    bar: [
      'assets/images/destaques/bar.jpg',
    ],
    restaurante: [
      'assets/images/destaques/restaurante.jpg',
      'assets/images/destaques/restaurante2.jpg',
    ],
    convencoes: [
      'assets/images/destaques/convencoes.jpg',
    ],
  };

  lazerCards.forEach(card => {
    card.addEventListener('click', () => {
      const lazerType = card.dataset.lazer;
      const title = card.querySelector('h3').textContent;
      const images = lazerImages[lazerType];

      if (images && images.length > 0) {
        galleryModalTitle.textContent = title;
        swiperWrapper.innerHTML = ''; // Clear previous images

        images.forEach(imageSrc => {
          const swiperSlide = document.createElement('div');
          swiperSlide.classList.add('swiper-slide');
          const img = document.createElement('img');
          img.src = imageSrc;
          img.alt = title;
          swiperSlide.appendChild(img);
          swiperWrapper.appendChild(swiperSlide);
        });

        galleryModal.style.display = 'flex';

        // Initialize Swiper after images are loaded
        setTimeout(() => {
          new Swiper('#gallerySwiper', {
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        }, 50);
      }
    });
  });

  window.closeGalleryModal = () => {
    galleryModal.style.display = 'none';
  };

  // Static Image Display Logic
  const lazerOptionItems = document.querySelectorAll('.lazer-option-item');
  const lazerMainImage = document.getElementById('lazer-main-image');

  // Function to open gallery modal with content (adapted from existing lazer.js)
  function openGalleryModalWithContent(title, description, images) {
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalTitle = document.getElementById('galleryModalTitle');
    const swiperWrapper = document.querySelector('#gallerySwiper .swiper-wrapper');
    let modalBodyDescription = galleryModal.querySelector('.modal-description');

    if (!modalBodyDescription) {
      modalBodyDescription = document.createElement('p');
      modalBodyDescription.classList.add('modal-description');
      const modalBody = galleryModal.querySelector('.modal-body');
      modalBody.prepend(modalBodyDescription); // Add before the swiper
    }

    galleryModalTitle.textContent = title;
    modalBodyDescription.textContent = description;
    swiperWrapper.innerHTML = ''; // Clear previous images

    images.forEach(imageSrc => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = title;
      swiperSlide.appendChild(img);
      swiperWrapper.appendChild(swiperSlide);
    });

    galleryModal.style.display = 'flex';

    // Initialize Swiper after images are loaded
    setTimeout(() => {
      if (window.mySwiper) {
        window.mySwiper.destroy(true, true);
      }
      window.mySwiper = new Swiper('#gallerySwiper', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }, 50);
  }

  lazerOptionItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const imageSrc = item.dataset.mainImage;
      if (imageSrc) {
        lazerMainImage.src = imageSrc;
      }
    });

    item.addEventListener('mouseleave', () => {
      // Optionally revert to a default image or clear it
      // lazerMainImage.src = 'assets/images/default-lazer.jpg'; 
    });

    item.addEventListener('click', () => {
      const lazerType = item.dataset.locationId;
      const title = item.querySelector('h3').textContent;
      const description = item.querySelector('p').textContent;
      const images = lazerImages[lazerType]; // Use the existing lazerImages object

      if (images && images.length > 0) {
        openGalleryModalWithContent(title, description, images);
      }
    });
  });
});