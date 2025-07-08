window.addEventListener("load", () => {
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
      window.initSwipers(); // Call the new function from init-swiper.js
      this.initScrollToTop();
      this.initReservationForm(); // Main form on the page
      this.initReservationModal(); // New, more detailed reservation modal
      this.initModal(); // Old modal (Férias de Julho)
      this.initScrollListeners();
      this.initCTAs(); // Initialize CTAs to open the new modal
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
    // MAIN RESERVATION FORM (TOP OF PAGE)
    // =========================================================================
    initReservationForm() {
      const reservaForm = document.getElementById("reservaForm");
      if (!reservaForm) return;

      const checkinInput = flatpickr("#checkin", { dateFormat: "d/m/Y", locale: "pt" });
      const checkoutInput = flatpickr("#checkout", { dateFormat: "d/m/Y", locale: "pt" });

      reservaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Pre-fill and open the new, more detailed reservation modal
        document.getElementById("modalCheckin").value = formData.get("checkin");
        document.getElementById("modalCheckout").value = formData.get("checkout");
        document.getElementById("modalAdultos").value = formData.get("adultos");
        document.getElementById("modalCriancas").value = formData.get("criancas");
        document.getElementById("modalTipoQuarto").value = formData.get("tipoQuarto");

        // Trigger change to generate child age inputs if necessary
        const event = new Event('change');
        document.getElementById("modalCriancas").dispatchEvent(event);

        this.openReservationModal();
      });
    },

    // =========================================================================
    // NEW DETAILED RESERVATION MODAL
    // =========================================================================
    initReservationModal() {
      const reservationModal = document.getElementById("reservationModal");
      const modalCheckin = document.getElementById("modalCheckin");
      const modalCheckout = document.getElementById("modalCheckout");
      const modalCriancas = document.getElementById("modalCriancas");
      const childAgeInputsContainer = document.getElementById("childAgeInputs");
      const fullReservationForm = document.getElementById("fullReservationForm");

      if (!reservationModal) return;

      this.openReservationModal = () => {
        reservationModal.style.display = "flex";
        document.body.classList.add("modal-open");
      };
      window.closeReservationModal = () => {
        reservationModal.style.display = "none";
        document.body.classList.remove("modal-open");
      };

      flatpickr(modalCheckin, { dateFormat: "d/m/Y", locale: "pt" });
      flatpickr(modalCheckout, { dateFormat: "d/m/Y", locale: "pt" });

      // Function to generate child age input fields
      const generateChildAgeInputs = () => {
        childAgeInputsContainer.innerHTML = ""; // Clear previous inputs
        const numChildren = parseInt(modalCriancas.value);

        if (numChildren > 0) {
          const title = document.createElement('p');
          title.innerHTML = '<b>Idade das Crianças:</b>';
          childAgeInputsContainer.appendChild(title);
        }

        for (let i = 0; i < numChildren; i++) {
          const div = document.createElement("div");
          div.classList.add("form-group");
          div.innerHTML = `
            <label for="childAge${i}">Criança ${i + 1} (idade):</label>
            <input type="number" id="childAge${i}" name="childAge${i}" class="form-control" min="0" max="17" required />
          `;
          childAgeInputsContainer.appendChild(div);
        }
      };

      modalCriancas.addEventListener("change", generateChildAgeInputs);

      // Handle full reservation form submission
      fullReservationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const childAges = [];
        for (let i = 0; i < parseInt(modalCriancas.value); i++) {
          childAges.push(formData.get(`childAge${i}`));
        }

        const message = [
          "Olá! Gostaria de fazer uma reserva com os seguintes detalhes:",
          `Nome: ${formData.get("modalNome")}`,
          `Email: ${formData.get("modalEmail")}`,
          `Telefone: ${formData.get("modalTelefone")}`,
          `Check-in: ${formData.get("modalCheckin")}`,
          `Check-out: ${formData.get("modalCheckout")}`,
          `Adultos: ${formData.get("modalAdultos")}`,
          `Crianças: ${formData.get("modalCriancas")}`,
          childAges.length > 0 ? `Idade das Crianças: ${childAges.join(", ")}` : "",
          `Tipo de Quarto: ${formData.get("modalTipoQuarto")}`,
        ].filter(Boolean).join("\n"); // Filter(Boolean) removes empty strings

        const whatsappUrl = `https://wa.me/${this.whatsAppNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");

        window.closeReservationModal(); // Close modal after submission
      });

      // Close modal on overlay click or escape key
      reservationModal.addEventListener("click", (e) => {
        if (e.target === reservationModal) window.closeReservationModal();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") window.closeReservationModal();
      });
    },

    // =========================================================================
    // OLD MODAL (FÉRIAS DE JULHO)
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
    // CTA BUTTONS TO OPEN NEW RESERVATION MODAL
    // =========================================================================
    initCTAs() {
      const ctaButtons = document.querySelectorAll(".cta-btn");
      ctaButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          e.preventDefault(); // Prevent default link behavior
          this.openReservationModal();
        });
      });
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