window.initSwipers = function () {
  const carouselData = {
    'programacoes': [
      {
        img: 'assets/images/programacoes/especiais.png',
        title: 'Pacotes Especiais',
        link: '#pacotes',
        linkText: 'Saiba mais',
      },
      {
        img: 'assets/images/programacoes/bosque.png',
        title: 'Passeio no Bosque',
        link: '#bosque',
        linkText: 'Saiba mais',
      },
      {
        img: 'assets/images/programacoes/feijoada.png',
        title: 'Sábado Feijoada',
        link: '#sabado',
        linkText: 'Saiba mais',
      },
      {
        img: 'assets/images/programacoes/julho.png',
        title: 'Férias de Julho',
        link: '#ferias',
        linkText: 'Saiba mais',
      },
      {
        img: 'assets/images/programacoes/italiana.png',
        title: 'Noite Italiana',
        link: '#italiana',
        linkText: 'Saiba mais',
      },
    ],
    acomodacoes: [
      {
        img: 'assets/images/acomodacoes/standard.png',
        title: 'Apto Standard',
        link: '#ferias',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/acomodacoes/master.jpg',
        title: 'Apto Master',
        link: '#ferias',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/acomodacoes/luxo.png',
        title: 'Apto Luxo',
        link: '#ferias',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/acomodacoes/master2.png',
        title: 'Apto Master',
        link: '#ferias',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/acomodacoes/standard.png',
        title: 'Apto Standard',
        link: '#ferias',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/acomodacoes/master.jpg',
        title: 'Apto Master',
        link: '#ferias',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/acomodacoes/luxo.png',
        title: 'Apto Luxo',
        link: '#ferias',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/acomodacoes/master2.png',
        title: 'Apto Master',
        link: '#ferias',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
    ],
    destaques: [
      {
        img: 'assets/images/acomodacoes/luxo.png',
        title: 'Acomodações de Luxo',
        link: '#acomodacoes',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/destaques/piscina.jpg',
        title: 'Área de Piscinas',
        link: '#lazer',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/destaques/restaurante.jpg',
        title: 'Gastronomia Requintada',
        link: '#restaurante',
        linkText: 'Ver cardápio',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/destaques/convencoes.jpg',
        title: 'Eventos e Convenções',
        link: '#convencoes',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
      {
        img: 'assets/images/destaques/recreacao.jpg',
        title: 'Recreação para a Família',
        link: '#lazer',
        linkText: 'Saiba mais',
        style: 'width: 100%; height: 380px; object-fit: cover; border-radius: 18px;',
      },
    ],
  };

  for (const key in carouselData) {
    const swiperContainer = document.querySelector(`#${key} .swiper-container`);
    if (swiperContainer) {
      const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
      const slides = carouselData[key]
        .map((slide) => {
          return `
          <div class="swiper-slide">
            <div class="image-slide">
              <img src="${slide.img}" loading="lazy" alt="${slide.title}" ${slide.style ? `style="${slide.style}"` : ''} />
              <div class="info-box">
                <span class="slide-title">${slide.title}</span>
                <a href="${slide.link}" class="slide-link">${slide.linkText} <i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        `;
        })
        .join('');
      swiperWrapper.innerHTML = slides;
      const pagination = swiperContainer.querySelector('.swiper-pagination');
      const next = swiperContainer.querySelector('.swiper-button-next');
      const prev = swiperContainer.querySelector('.swiper-button-prev');
      const baseConfig = {
        loop: true,
        centeredSlides: true,
        slidesPerView: 1,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: pagination, clickable: true },
        navigation: { nextEl: next, prevEl: prev },
        observer: true,
        observeParents: true,
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: true,
          },
          0: {
            slidesPerView: 1,
            centeredSlides: true,
          },
        },
        on: {
          init: function () {
            this.updateSize();
            this.updateSlides();
          },
        },
      };
      
      // Removida a duplicação da inicialização do Swiper
      
      // Removida a duplicação da inicialização do Swiper
      const swiperInstance = new Swiper(swiperContainer, baseConfig);
      // Força a atualização para corrigir problemas de layout na inicialização
      swiperInstance.update();
      setTimeout(() => {
        swiperInstance.update();
      }, 250);
      // Adiciona tratamento responsivo
      window.addEventListener('resize', () => {
        swiperInstance.updateSize();
        swiperInstance.updateSlides();
      });
    }
  }

};