// Script para efeito de scroll no header
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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








// Reserva==========================================

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

