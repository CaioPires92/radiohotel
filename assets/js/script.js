document.addEventListener("DOMContentLoaded", () => {
  /**
   * Main application object to encapsulate all site scripts.
   */
  const Site = {
    // =========================================================================
    // CONFIGURATION
    // =========================================================================
    whatsAppNumber: "55999999999", // WhatsApp number for reservations

    // =========================================================================
    // STATE
    // =========================================================================
    modalOpenedOnScroll: false,

    // =========================================================================
    // INITIALIZATION
    // =========================================================================
    init() {
      this.initSwiper();
      this.initScrollToTop();
      this.initReservationForm();
      this.initModal();
      this.initScrollListeners();
    },

    // =========================================================================
    // SWIPER CAROUSEL
    // =========================================================================
    initSwiper() {
      document.querySelectorAll(".swiper-hotel").forEach((swiperContainer) => {
        const carrosséis = document.querySelectorAll(".swiper-hotel");
        const pagination = swiperContainer.querySelector(".swiper-pagination");
        const next = swiperContainer.querySelector(".swiper-button-next");
        const prev = swiperContainer.querySelector(".swiper-button-prev");

        const baseConfig = {
          loop: true,
          centeredSlides: false,
          slidesPerView: 'auto',
          autoplay: { delay: 5000, disableOnInteraction: false },
          pagination: { el: pagination, clickable: true },
          navigation: { nextEl: next, prevEl: prev },
          breakpoints: {
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              centeredSlides: false
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 10,  // Reduzido para melhor visualização
              centeredSlides: true,
              effect: 'creative',  // Novo efeito para mobile
              creativeEffect: {
                prev: {
                  translate: ["-120%", 0, -500],
                  opacity: 0.5
                },
                next: {
                  translate: ["120%", 0, -500],
                  opacity: 0.5
                }
              }
            }
          },
          // Configurações comuns para todos os breakpoints
          on: {
            init: function () {
              // Força redimensionamento inicial
              this.updateSize();
              this.updateSlides();
            }
          }
        };

        const swiperInstance = new Swiper(swiperContainer, baseConfig);

        // Adiciona tratamento responsivo
        window.addEventListener('resize', () => {
          swiperInstance.updateSize();
          swiperInstance.updateSlides();
        });
      });
    },


    // =========================================================================
    // SCROLL TO TOP BUTTON
    // =========================================================================
    initScrollToTop() {
      const btnTopo = document.getElementById("btnTopo");
      if (btnTopo) {
        btnTopo.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    },

    // =========================================================================
    // RESERVATION FORM
    // =========================================================================
    initReservationForm() {
      const reservaForm = document.getElementById("reservaForm");
      if (!reservaForm) return;

      flatpickr("#checkin", { dateFormat: "d/m/Y", locale: "pt" });
      flatpickr("#checkout", { dateFormat: "d/m/Y", locale: "pt" });

      reservaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = [
          "Olá! Gostaria de consultar disponibilidade:",
          `Check-in: ${formData.get("checkin")}`,
          `Check-out: ${formData.get("checkout")}`,
          `Adultos: ${formData.get("adultos")}`,
          `Crianças: ${formData.get("criancas")}`,
          `Tipo de Quarto: ${formData.get("tipoQuarto")}`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/${this.whatsAppNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      });
    },

    // =========================================================================
    // MODAL
    // =========================================================================
    initModal() {
      const modal = document.getElementById("modal");
      const openBtn = document.getElementById("abrirModal");
      if (!modal) return;

      this.openModal = () => (modal.style.display = "flex");
      this.closeModal = () => (modal.style.display = "none");

      if (openBtn) {
        openBtn.addEventListener("click", this.openModal);
      }

      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeModal();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.closeModal();
      });

      // Expose to global scope for inline `onclick` attributes in HTML
      window.closeModal = this.closeModal;
    },

    // =========================================================================
    // SCROLL EVENT HANDLING
    // =========================================================================
    initScrollListeners() {
      window.addEventListener("scroll", () => this.handleScroll());
    },

    handleScroll() {
      this.toggleScrollTopButton();
      this.toggleFloatingIcons();
      this.openModalOnScroll();
    },

    toggleScrollTopButton() {
      const btnTopo = document.getElementById("btnTopo");
      if (btnTopo) {
        btnTopo.style.display = window.scrollY > 100 ? "block" : "none";
      }
    },

    toggleFloatingIcons() {
      const heroSection = document.getElementById("inicio");
      const floatingPopup = document.getElementById("abrirModal");
      const whatsappFixo = document.querySelector(".whatsapp-fixo");

      if (heroSection && floatingPopup && whatsappFixo) {
        const show = window.scrollY > heroSection.offsetHeight;
        floatingPopup.classList.toggle("visible-icons", show);
        floatingPopup.classList.toggle("hidden-icons", !show);
        whatsappFixo.classList.toggle("visible-icons", show);
        whatsappFixo.classList.toggle("hidden-icons", !show);
      }
    },

    openModalOnScroll() {
      if (this.modalOpenedOnScroll || !this.openModal) return;

      const scrollMidPoint = document.body.scrollHeight / 2;
      const screenMidPoint = window.scrollY + window.innerHeight / 2;

      if (screenMidPoint >= scrollMidPoint) {
        this.openModal();
        this.modalOpenedOnScroll = true;
      }
    },
  };

  // Run the application
  Site.init();
});