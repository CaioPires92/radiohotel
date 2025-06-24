document.addEventListener('DOMContentLoaded', function () {
    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const body = `Nome: ${formData.get('nome')}\nE-mail: ${formData.get('email')}\n\nMensagem:\n${formData.get('mensagem')}`;
            window.location.href = `mailto:contato@radiohotel.com.br?subject=Contato via Site&body=${encodeURIComponent(body)}`;
        });
    }
});
