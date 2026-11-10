document.addEventListener("DOMContentLoaded", () => {
    // On fail don't execute?
    //if (typeof siteData == "undefined") return;

    // Contact benner implementation
    const bannerContainer = document.getElementById("contact-banner"); // find all mentions of the div for the contact banner
    if (bannerContainer) { // Replace div with banner
        const mailSubject = encodeURIComponent("Aanvraag Bijles");

        bannerContainer.innerHTML = `
            <section id="contact" class="py-5 bg-dark text-white text-center">
                <div class="container">
                    <h2 class="fw-bold mb-3">Geinterresseerd?</h2>
                    <p class="text-secondary col-lg-6 mx-auto mb-4">Stuur gerust een mail of appje voor vragen of het inplannen van een eerste bijles.</p>
                    <div class="d-flex justify-content-center gap-3 flex-wrap">
                        <a href="mailto:victor@lamain.nl?subject=${mailSubject}" class="btn btn-primary btn-lg" target="_blank">
                            <i class="bi bi-envelope-fill me-2"></i>Mail
                        </a>
                        <a href="https://wa.me/31634420848" class="btn btn-success btn-lg" target="_blank">
                            <i class="bi bi-whatsapp me-2"></i>WhatsApp
                        </a>
                    </div>
                </div>
            </section>
 

        `;
    }

});
