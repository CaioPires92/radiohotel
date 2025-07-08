document.addEventListener('DOMContentLoaded', () => {
  const acomodacoesCards = document.querySelectorAll('.acomodacao-card');
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalTitle = document.getElementById('galleryModalTitle');
  const gallerySwiperWrapper = document.querySelector('#gallerySwiper .swiper-wrapper');
  let gallerySwiper;

  const acomodacoesData = {
    standard: {
      title: 'Apto Standard',
      images: [
        'assets/images/acomodacoes/standard.png',
        'assets/images/acomodacoes/standard.png',
        'assets/images/acomodacoes/standard.png',
      ],
    },
    master: {
      title: 'Apto Master',
      images: [
        'assets/images/acomodacoes/master.jpg',
        'assets/images/acomodacoes/master2.png',
        'assets/images/acomodacoes/master.jpg',
      ],
    },
    luxo: {
      title: 'Apto Luxo',
      images: [
        'assets/images/acomodacoes/luxo.png',
        'assets/images/acomodacoes/luxo.png',
        'assets/images/acomodacoes/luxo.png',
      ],
    },
    master2: {
      title: 'Apto Master',
      images: [
        'assets/images/acomodacoes/master2.png',
        'assets/images/acomodacoes/master.jpg',
        'assets/images/acomodacoes/master2.png',
      ],
    },
  };

  acomodacoesCards.forEach(card => {
    card.addEventListener('click', () => {
      const acomodacao = card.dataset.acomodacao;
      const data = acomodacoesData[acomodacao];

      galleryModalTitle.textContent = data.title;
      gallerySwiperWrapper.innerHTML = data.images.map(img => `
        <div class="swiper-slide">
          <img src="${img}" loading="lazy" alt="${data.title}">
        </div>
      `).join('');

      galleryModal.style.display = 'flex';

      if (gallerySwiper) {
        gallerySwiper.destroy(true, true);
      }

      gallerySwiper = new Swiper('#gallerySwiper', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        observer: true,
        observeParents: true,
        on: {
          init: function () {
            this.update();
          }
        }
      });
    });
  });

  window.closeGalleryModal = () => {
    galleryModal.style.display = 'none';
  };
});