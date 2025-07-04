document.addEventListener('DOMContentLoaded', function () {
    // Carregar Header
    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            initializeHeader();
        })
        .catch(error => console.error('Error loading header:', error));

    // Carregar Footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            initializeFooter();
        })
        .catch(error => console.error('Error loading footer:', error));

    // Função header unificado
    function initializeHeader() {
        // Menu Mobile
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Fechar menu ao clicar nos links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }

        // Scroll Header
        const header = document.getElementById('header');
        if (header) {
            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 50);
            });
        }

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    // Função footer unificado
    function initializeFooter() {
        // Newsletter
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const body = `Gostaria de receber novidades.\nE-mail: ${email}`;
                window.location.href = `mailto:caiocgp92@gmail.com?subject=Novo Cadastro Newsletter&body=${encodeURIComponent(body)}`;
            });
        }

        // Observador de elementos
        const elements = document.querySelectorAll('.fade-in');
        if (elements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            elements.forEach(el => observer.observe(el));
        }
    }
});
