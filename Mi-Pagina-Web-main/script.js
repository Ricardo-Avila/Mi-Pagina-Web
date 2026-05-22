document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const gallery = document.querySelector(".horizontal-gallery");
    const revealItems = document.querySelectorAll(".reveal");

    function updateHeader() {
        header?.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (gallery && gallery.children.length > 0) {
        const originalItems = Array.from(gallery.children);
        originalItems.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            gallery.appendChild(clone);
        });
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.16,
                rootMargin: "0px 0px -40px",
            }
        );

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }
});
