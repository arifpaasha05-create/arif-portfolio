
/**
 * PORTFOLIO CLIENT SCRIPTS – ARIF PASHA
 * Mobile navigation, skill popups and scroll-to-top.
 */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. MOBILE HAMBURGER MENU
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    const navLinks = document.querySelectorAll(".nav-links a");

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        // Close menu after clicking navigation links
        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        // Close menu when returning to desktop layout
        window.addEventListener("resize", () => {

            if (window.innerWidth > 820) {
                closeMenu();
            }
        });
    }


    // =====================================
    // 2. SCROLL TO TOP BUTTON
    // =====================================

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (scrollTopBtn) {

        window.addEventListener("scroll", () => {

            scrollTopBtn.classList.toggle(
                "visible",
                window.scrollY > 250
            );
        });

        scrollTopBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // =====================================
    // 3. SKILL POPUP FUNCTIONALITY
    // =====================================

    const skillCards = document.querySelectorAll(".skill-card-wrap");

    // Position popup within the viewport
    function positionPopup(wrap) {

        const popup = wrap.querySelector(".skill-popup");

        if (!popup) return;

        const rect = wrap.getBoundingClientRect();

        const popupWidth = popup.offsetWidth;

        const popupHeight = popup.offsetHeight;

        const margin = 12;

        // Calculate horizontal position
        const center = rect.left + rect.width / 2;

        const desiredLeft = Math.max(
            margin,
            Math.min(
                center - popupWidth / 2,
                window.innerWidth - popupWidth - margin
            )
        );

        // Convert viewport position to parent-relative position
        popup.style.left = `${desiredLeft - rect.left}px`;

        // Keep the popup arrow pointing toward its card
        popup.style.setProperty(
            "--arrow-left",
            `${center - desiredLeft}px`
        );

        // Display popup below when there is insufficient space above
        if (rect.top < popupHeight + 20) {

            popup.style.top = "calc(100% + 12px)";
            popup.style.bottom = "auto";

            popup.classList.add("flipped");

        } else {

            popup.style.bottom = "calc(100% + 12px)";
            popup.style.top = "auto";

            popup.classList.remove("flipped");
        }
    }


    // Update popup accessibility attributes
    function updatePopup(wrap, isOpen) {

        const popup = wrap.querySelector(".skill-popup");

        wrap.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        if (popup) {
            popup.setAttribute(
                "aria-hidden",
                String(!isOpen)
            );
        }
    }


    // Close all active popups
    function closeAllPopups() {

        skillCards.forEach(card => {

            card.classList.remove("active");

            updatePopup(card, false);
        });
    }


    // Open a particular popup
    function openPopup(wrap, activate = false) {

        if (activate) {
            closeAllPopups();
            wrap.classList.add("active");
        }

        positionPopup(wrap);

        updatePopup(wrap, true);
    }


    skillCards.forEach(wrap => {

        // Desktop hover
        wrap.addEventListener("mouseenter", () => {
            openPopup(wrap);
        });

        wrap.addEventListener("mouseleave", () => {

            if (!wrap.classList.contains("active") &&
                !wrap.contains(document.activeElement)) {

                updatePopup(wrap, false);
            }
        });


        // Mouse click and mobile tap
        wrap.addEventListener("click", () => {

            const isActive = wrap.classList.contains("active");

            if (isActive) {

                wrap.classList.remove("active");

                updatePopup(wrap, false);

            } else {

                openPopup(wrap, true);
            }
        });


        // Keyboard: Enter and Space
        wrap.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                const isActive = wrap.classList.contains("active");

                if (isActive) {

                    wrap.classList.remove("active");

                    updatePopup(wrap, false);

                } else {

                    openPopup(wrap, true);
                }
            }
        });


        // Keyboard focus
        wrap.addEventListener("focusin", () => {
            openPopup(wrap);
        });

        wrap.addEventListener("focusout", event => {

            if (
                !wrap.contains(event.relatedTarget) &&
                !wrap.classList.contains("active") &&
                !wrap.matches(":hover")
            ) {

                updatePopup(wrap, false);
            }
        });

    });


    // Close popups when clicking outside
    document.addEventListener("click", event => {

        if (!event.target.closest(".skill-card-wrap")) {
            closeAllPopups();
        }
    });


    // Escape key closes popups and mobile navigation
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeAllPopups();

            closeMenu();
        }
    });


    // Reposition active popup when the screen changes
    window.addEventListener("resize", () => {

        skillCards.forEach(card => {

            if (card.classList.contains("active")) {
                positionPopup(card);
            }
        });
    });

});
