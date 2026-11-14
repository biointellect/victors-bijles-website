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
                            <li class="nav-item"><a class="nav-link ${currentPage == "availability" ? "active" : ""}" href="availability.html">Beschikbaarheid</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }

    // Pricing cards
    const pricingContainer = document.getElementById("pricing-cards");
    if (pricingContainer) {
        // Check if any open packages
        if (siteData.packages) {
            pricingContainer.innerHTML = siteData.packages.map(pkg => {
                const waLink = `https://wa.me/${siteData.phoneNumber}`;
                return `
                    <div class="col-md-6 col-lg-5">
                        <div class="card shadow-sm border-0 rounded-4 overflow-hidden h-100">
                            <div class="card-header bg-dark text-white text-center py-4">
                                <span class="badge ${pkg.badgeClass} text-uppercase px-3 py-2 mb-2">${pkg.badge}</span>
                                <h2 class="display-4 fw-bold my-0">${pkg.price} <span class="fs-5 text-secondary fw-normal">${pkg.period}</span></h2>
                            </div>
                            <div class="card-body p-4 d-flex flex-column">
                                <h4 class="fw-bold text-center mb-3">${pkg.title}</h4>
                                <p class="py-2 border-bottom fw-semibold text-primary"><i class="bi bi-geo-alt-fill me-2"></i>${pkg.location}</p>
                                <p class="text-secondary mb-4">${pkg.description}</p>
                                <div class="d-grid gap-2 mt-auto">
                                    <a href="#contact" class="btn btn-secondary btn-lg">
                                        <i class="bi bi-chat-dots-fill me-2"></i>Neem contact op
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

        }
        // else {}
    }


    // Subject pills
    const subjectContainer = document.getElementById("subject-pills");
    if (subjectContainer) {
        subjectContainer.innerHTML = `
            <div class="col-lg-8 text-center">
                <div class="d-flex justify-content-center flex-wrap gap-2">
                    <span class="badge bg-white text-dark border px-3 py-2 shadow-sm"><i class="bi bi-check-circle text-success me-1"></i>${siteData.subjects}</span>
                    <span class="badge bg-white text-dark border px-3 py-2 shadow-sm"><i class="bi bi-check-circle text-success me-1"></i>${siteData.levels}</span>
                </div>
            </div>
        `
    }

    // Grid Beschikbaarheid (3 weken x 7 dagen)
    const gridContainer = document.getElementById("availability-grid-container");
    if (gridContainer && siteData.availabilityGrid) {
        gridContainer.innerHTML = siteData.availabilityGrid.map(week => `
            <div class="card shadow-sm border rounded-4 bg-white p-4 mb-4">
                <h5 class="fw-bold mb-3 text-secondary"><i class="bi bi-calendar-range text-primary me-2"></i>${week.weekLabel}</h5>
                <div class="table-responsive">
                    <table class="table table-bordered text-center align-middle mb-0" style="table-layout: fixed;">
                        <thead>
                            <tr class="table-light small text-muted">
                                <th>Ma</th><th>Di</th><th>Wo</th><th>Do</th><th>Vr</th><th>Za</th><th>Zo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                ${week.days.map(day => `
                                    <td class="p-3 ${day.available ? 'bg-primary bg-opacity-10' : ''}">
                                        <div class="fw-bold small text-dark mb-1">${day.date}</div>
                                        <div class="${day.available ? 'text-primary fw-semibold' : 'text-muted small'}" style="font-size: 0.8rem;">${day.slot}</div>
                                    </td>
                                `).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `).join('');
    }

    // Intro text on homepage
    const introText = document.getElementById("intro-text-homepage");
    if (introText && siteData.subjectsText) {
        introText.innerHTML = `
            <p class="lead text-muted col-lg-8 mx-auto mt-3">
                Doelgerichte begeleiding in ${siteData.subjectsText}. Ga van stampen naar begrijpen.
            </p>

        `
    }
});
