// Swiper Carousel
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".swiper-hotel")
    .forEach(function (swiperContainer) {
      // Elementos de paginação e navegação relativos a este container
      const pagination = swiperContainer.querySelector(".swiper-pagination");
      const next = swiperContainer.querySelector(".swiper-button-next");
      const prev = swiperContainer.querySelector(".swiper-button-prev");

      new Swiper(swiperContainer, {
        loop: true,
        centeredSlides: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: pagination, clickable: true },
        navigation: { nextEl: next, prevEl: prev },
        breakpoints: {
          1024: { slidesPerView: 2, spaceBetween: -400 },
          768: { slidesPerView: 1, spaceBetween: 20 },
          0: { slidesPerView: 1, spaceBetween: 30 },
        },
      });
    });

  // Botão Scroll Top
  const btnTopo = document.getElementById("btnTopo");
  if (btnTopo) {
    window.onscroll = () => {
      btnTopo.style.display = window.scrollY > 100 ? "block" : "none";
    };
    btnTopo.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  // Sistema de Reservas
  const reservaForm = document.getElementById("reservaForm");
  if (reservaForm) {
    // Flatpickr initialization
    flatpickr("#checkin", { dateFormat: "d/m/Y", locale: "pt" });
    flatpickr("#checkout", { dateFormat: "d/m/Y", locale: "pt" });

    reservaForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const mensagem = `Olá! Gostaria de consultar disponibilidade:\n
                Check-in: ${formData.get("checkin")}\n
                Check-out: ${formData.get("checkout")}\n
                Adultos: ${formData.get("adultos")}\n
                Crianças: ${formData.get("criancas")}\n
                Tipo de Quarto: ${formData.get("tipoQuarto")}`;

      window.open(
        `https://wa.me/55999999999?text=${encodeURIComponent(mensagem)}`,
        "_blank",
      );
    });
  }




  // Função para abrir o modal
  function openModal() {
    document.getElementById("modal").style.display = "flex";
  }

  // Função para fechar o modal
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  // Quando o botão flutuante é clicado, abre o modal
  document.getElementById("abrirModal").addEventListener("click", openModal);

  // Função para abrir modal ao rolar até o meio
  let modalOpenedOnScroll = false; // Garante que só abra uma vez

  function handleScrollOpenModal() {
    if (!modalOpenedOnScroll) {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;

      // Quando o scroll passa do meio
      if (scrollY + windowHeight / 2 >= docHeight / 2) {
        openModal();
        modalOpenedOnScroll = true;
      }
    }
  }

  window.addEventListener("scroll", handleScrollOpenModal);

  // Também fecha modal ao clicar no overlay (extra opcional)
  document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });


  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();  // Chama a função para fechar o modal
    }
  });

  // Expondo a função de fechar para o botão (caso esteja no escopo global)
  window.closeModal = closeModal;
});
