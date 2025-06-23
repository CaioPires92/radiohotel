// Script para efeito de scroll no header
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});




// script.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Script para menu mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});




const destaquesSwiper = new Swiper('.destaques-carousel', {
    loop: true,
    centeredSlides: true, // Centraliza os slides
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Configuração responsiva com espaçamento reduzido
    breakpoints: {
        1024: { // >= 1024px (mostra 3 slides)
            slidesPerView: 3,
            spaceBetween: -250 // Cards colados
        },
        768: { // >= 768px e < 1024px (mostra 2 slides)
            slidesPerView: 2,
            spaceBetween: 20 // Cards colados
        },
        0: { // < 768px (mobile - mostra 1 slide)
            slidesPerView: 1,
            spaceBetween: 30 // Sem espaço no mobile
        }
    },
});

// Mostra o botão quando a página é rolada
window.onscroll = function () {
    const btn = document.getElementById("btnTopo");
    btn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";
};

// Função que leva pro topo
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}



//Newslatter
document.getElementById('newsletter-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne o envio imediato do formulário

    var email = document.getElementById('email').value; // Pega o e-mail inserido pelo usuário
    var subject = 'Novo Cadastro de Newsletter';
    var body = 'Gostaria de receber novidades.\nE-mail: ' + email;

    // Abre o cliente de e-mail com as informações
    window.location.href = 'mailto:caiocgp92@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});








// Reserva ==========================================

document.addEventListener('DOMContentLoaded', function () {
    const checkin = document.getElementById('checkin');
    const checkout = document.getElementById('checkout');

    // Flatpickr nos campos
    flatpickr("#checkin", {
        dateFormat: "d/m/Y",
        locale: "pt"
    });
    flatpickr("#checkout", {
        dateFormat: "d/m/Y",
        locale: "pt"
    });

    // Preencher datas automáticas
    const hoje = new Date();
    const amanha = new Date();
    amanha.setDate(hoje.getDate() + 1);

    // Formatar as datas pro formato brasileiro (d/m/Y)
    const formatarData = (data) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    checkin.value = formatarData(hoje);
    checkout.value = formatarData(amanha);

    // Capturar o submit do formulário
    const form = document.getElementById('reservaForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const adultos = document.getElementById('adultos').value;
        const criancas = document.getElementById('criancas').value;
        const tipoQuarto = document.getElementById('tipoQuarto').value;

        const mensagem = `Olá! Gostaria de consultar disponibilidade:\n
        Check-in: ${checkin.value}\n
        Check-out: ${checkout.value}\n
        Adultos: ${adultos}\n
        Crianças: ${criancas}\n
        Tipo de Quarto: ${tipoQuarto}`;

        const telefone = '55999999999'; // Aqui corrigi também
        const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, '_blank');
    });

});



// Elementos aparecendo na tela conforme rola
const elements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // para só disparar uma vez
        }
    });
}, {
    threshold: 0.1
});

elements.forEach(el => observer.observe(el));













document.addEventListener('DOMContentLoaded', function () {

    let modalJaAberto = false; // Controla se o modal já foi aberto pelo scroll

    // Função para abrir o modal
    function openModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.classList.add('modal-open');
        }
    }

    // Função para fechar o modal
    function closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }

    // Torna as funções globais para uso no onclick
    window.openModal = openModal;
    window.closeModal = closeModal;

    // Adiciona o event listener para o botão de abrir
    const abrirModalBtn = document.getElementById('abrirModal');
    if (abrirModalBtn) {
        abrirModalBtn.addEventListener('click', openModal);
    }

    // NOVA FUNCIONALIDADE: Abrir modal ao rolar a página
    function verificarScroll() {
        // Calcula a porcentagem de scroll da página
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;

        // Abre o modal quando atingir 50% da página (você pode ajustar este valor)
        if (scrollPercent >= 50 && !modalJaAberto) {
            modalJaAberto = true;
            openModal();

            // Remove o event listener após abrir para não abrir novamente
            window.removeEventListener('scroll', verificarScroll);
        }
    }

    // Adiciona o event listener para o scroll
    window.addEventListener('scroll', verificarScroll);

    // Fechar modal ao clicar fora dele
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // OPCIONAL: Reativar o modal por scroll após fechar (descomente se quiser)
    /*
    window.closeModal = function() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            modalJaAberto = false; // Permite abrir novamente por scroll
            window.addEventListener('scroll', verificarScroll); // Reativa o listener
        }
    }
    */
});