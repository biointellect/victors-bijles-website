document.addEventListener("DOMContentLoaded", () => {
    // On fail don't execute?
    if (typeof siteData == "undefined") return;

    // Contact banner implementation
    const bannerContainer = document.getElementById("contact-banner"); // find all mentions of the div for the contact banner
    if (bannerContainer) { // Replace div with banner
        const mailSubject = encodeURIComponent("Aanvraag Bijles");

        bannerContainer.innerHTML = `
            <section id="contact" class="py-5 bg-dark text-white text-center">
                <div class="container">
                    <h2 class="fw-bold mb-3">Geinterresseerd?</h2>
                    <p class="text-secondary col-lg-6 mx-auto mb-4">Stuur gerust een mail of appje voor vragen of het inplannen van een eerste bijles.</p>
                    <div class="d-flex justify-content-center gap-3 flex-wrap">
                        <a href="mailto:${siteData.mailAdress}?subject=${mailSubject}" class="btn btn-primary btn-lg" target="_blank">
                            <i class="bi bi-envelope-fill me-2"></i>Mail
                        </a>
                        <a href="https://wa.me/${siteData.phoneNumber}" class="btn btn-success btn-lg" target="_blank">
                            <i class="bi bi-whatsapp me-2"></i>WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        `;
    }

    // Top banner implementation
    const navContainer = document.getElementById("main-navbar");
    if (navContainer) {
        // Find page type or none for highlighting purposes
        const currentPage = document.body.dataset.page || "";

        navContainer.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand fw-bold" href="index.html">${siteData.name}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link ${currentPage == "index" ? "active" : ""}" href="index.html">Home</a></li>
                            <li class="nav-item"><a class="nav-link ${currentPage == "about" ? "active" : ""}" href="about.html">Over mij</a></li>
                            <li class="nav-item"><a class="nav-link ${currentPage == "pricing" ? "active" : ""}" href="pricing.html">Tarieven</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }


});
