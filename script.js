document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const carousel = document.querySelector(".carousel-container");
    const gallery = document.querySelector(".horizontal-gallery");
    const revealItems = document.querySelectorAll(".reveal");

    function updateHeader() {
        header?.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (carousel && gallery && gallery.children.length > 0) {
        const originalItems = Array.from(gallery.children);
        originalItems.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            gallery.appendChild(clone);
        });

        let offset = 0;
        let dragStartX = 0;
        let dragStartOffset = 0;
        let isDragging = false;
        let lastInteraction = 0;
        const autoSpeed = 0.42;

        function getLoopWidth() {
            return gallery.scrollWidth / 2;
        }

        function normalizeOffset() {
            const loopWidth = getLoopWidth();
            if (!loopWidth) {
                return;
            }

            while (offset <= -loopWidth) offset += loopWidth;
            while (offset > 0) offset -= loopWidth;
        }

        function render() {
            normalizeOffset();
            gallery.style.transform = `translate3d(${offset}px, 0, 0)`;
        }

        function animate() {
            const shouldAutoMove = !isDragging && Date.now() - lastInteraction > 1800;

            if (shouldAutoMove) {
                offset -= autoSpeed;
                render();
            }

            requestAnimationFrame(animate);
        }

        function getPointerX(event) {
            return event.touches?.[0]?.clientX ?? event.clientX;
        }

        function startDrag(event) {
            isDragging = true;
            lastInteraction = Date.now();
            dragStartX = getPointerX(event);
            dragStartOffset = offset;
            carousel.classList.add("is-dragging");
        }

        function moveDrag(event) {
            if (!isDragging) {
                return;
            }

            offset = dragStartOffset + getPointerX(event) - dragStartX;
            render();
        }

        function endDrag() {
            if (!isDragging) {
                return;
            }

            isDragging = false;
            lastInteraction = Date.now();
            carousel.classList.remove("is-dragging");
        }

        carousel.addEventListener("mousedown", startDrag);
        carousel.addEventListener("touchstart", startDrag, { passive: true });
        window.addEventListener("mousemove", moveDrag);
        window.addEventListener("touchmove", moveDrag, { passive: true });
        window.addEventListener("mouseup", endDrag);
        window.addEventListener("touchend", endDrag);
        window.addEventListener("resize", render);

        carousel.addEventListener("mouseenter", () => {
            lastInteraction = Date.now();
        });

        render();
        requestAnimationFrame(animate);
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
