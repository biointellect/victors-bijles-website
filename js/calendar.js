// calendar.js
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("availability-calendar");
    if (!container) return;

    // --- CONFIGURATION ---
    const DAYS_PER_WEEK = 7; // Set to 5 (Mon-Fri) or 7 (Mon-Sun)
    const WEEKS_TO_SHOW = 4; // Current week + next 3 weeks
    // ---------------------

    // Inject self-contained styles with 4-space formatting
    if (!document.getElementById("cal-grid-styles")) {
        const style = document.createElement("style");
        style.id = "cal-grid-styles";
        style.textContent = `
            .cal-grid-wrapper {
                overflow-x: auto;
                padding-bottom: 0.5rem;
            }
            .cal-week-grid {
                display: grid;
                grid-template-columns: repeat(${DAYS_PER_WEEK}, minmax(120px, 1fr));
                gap: 0.5rem;
                margin-bottom: 0.65rem;
            }
            .cal-day-card {
                min-height: 110px;
            }
            .cal-day-past {
                background-color: #f8f9fa;
                opacity: 0.75;
            }
            .cal-day-today {
                border-width: 2px !important;
                border-color: var(--bs-primary) !important;
            }
        `;
        document.head.appendChild(style);
    }

    container.className = "cal-grid-wrapper";
    container.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Anchor strictly to Monday of the current week to show all days of this week
    const dayOfWeek = today.getDay(); // Sun=0, Mon=1 ... Sat=6
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startMonday = new Date(today);
    startMonday.setDate(today.getDate() + diffToMonday);

    const formatDateKey = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    for (let week = 0; week < WEEKS_TO_SHOW; week++) {
        const weekRow = document.createElement("div");
        weekRow.className = "cal-week-grid";

        for (let dayOffset = 0; dayOffset < DAYS_PER_WEEK; dayOffset++) {
            const currentDate = new Date(startMonday);
            currentDate.setDate(startMonday.getDate() + week * 7 + dayOffset);

            const dateKey = formatDateKey(currentDate);
            const isPast = currentDate.getTime() < today.getTime();
            const isToday = currentDate.getTime() === today.getTime();

            // Check config status
            const hasConfigEntry = Object.prototype.hasOwnProperty.call(AVAILABILITY_CONFIG, dateKey);
            const slots = hasConfigEntry ? AVAILABILITY_CONFIG[dateKey] : [];

            // Status checks
            const isAvailable = !isPast && hasConfigEntry && slots.length > 0;
            const isFull = !isPast && hasConfigEntry && slots.length === 0;
            const isUnavailable = !isPast && !hasConfigEntry;

            // Dutch locale formatting for weekdays and months
            const weekdayName = currentDate.toLocaleDateString("nl-NL", { weekday: "short" });
            const dayMonth = currentDate.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });

            let cardClasses = "card cal-day-card ";
            let headerClasses = "card-header py-1 px-2 d-flex justify-content-between align-items-center ";

            if (isPast) {
                cardClasses += "cal-day-past border-secondary-subtle";
                headerClasses += "bg-transparent text-muted";
            } else if (isAvailable) {
                cardClasses += "border-success-subtle shadow-sm";
                headerClasses += "bg-success-subtle text-success-emphasis";
            } else if (isFull) {
                // Neutral border with muted background, text handled inside body
                cardClasses += "border-light-subtle bg-white text-muted";
                headerClasses += "bg-transparent text-muted";
            } else {
                cardClasses += "border-light-subtle bg-light text-muted";
                headerClasses += "bg-transparent";
            }

            if (isToday) {
                cardClasses += " cal-day-today";
            }

            const cardEl = document.createElement("div");
            cardEl.className = cardClasses;

            let bodyContent = "";
            if (isPast) {
                bodyContent = '<small class="text-muted">—</small>';
            } else if (isAvailable) {
                bodyContent = slots.map(slot => `<span class="badge bg-success w-100 mb-1 py-1 fw-normal" style="font-size: 0.78rem;">${slot}</span>`).join("");
            } else if (isFull) {
                bodyContent = '<small class="text-danger fw-semibold">Volgeboekt</small>';
            } else {
                bodyContent = '<small class="text-muted opacity-75">Niet beschikbaar</small>';
            }

            cardEl.innerHTML = `
                <div class="${headerClasses}">
                    <small class="fw-bold text-uppercase">${weekdayName}</small>
                    <small>${dayMonth}</small>
                </div>
                <div class="card-body p-2 d-flex flex-column justify-content-center align-items-center text-center">
                    ${isToday ? '<span class="badge bg-primary mb-1" style="font-size: 0.65rem;">VANDAAG</span>' : ""}
                    ${bodyContent}
                </div>
            `;

            weekRow.appendChild(cardEl);
        }

        container.appendChild(weekRow);
    }
});
