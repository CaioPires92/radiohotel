document.addEventListener('DOMContentLoaded', () => {
  const programacaoCards = document.querySelectorAll('.programacao-card');
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalTitle = document.getElementById('galleryModalTitle');
  const swiperWrapper = document.querySelector('#gallerySwiper .swiper-wrapper');

  const programacaoImages = {
    julho: [
      'assets/images/programacoes/julho.png',
    ],
    feijoada: [
      'assets/images/programacoes/feijoada.png',
    ],
    italiana: [
      'assets/images/programacoes/italiana.png',
    ],
    bosque: [
      'assets/images/programacoes/bosque.png',
    ],
    especiais: [
      'assets/images/programacoes/especiais.png',
    ],
  };

  programacaoCards.forEach(card => {
    card.addEventListener('click', () => {
      const programacaoType = card.dataset.programacao;
      const title = card.querySelector('h3').textContent;
      const images = programacaoImages[programacaoType];

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
});