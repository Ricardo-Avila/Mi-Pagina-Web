document.addEventListener("DOMContentLoaded", () => {
    const miniWidget = document.getElementById("sc-mini-widget");

    if (!miniWidget || !window.SC?.Widget) {
        return;
    }

    const widget = window.SC.Widget(miniWidget);
    let isReady = false;

    widget.bind(window.SC.Widget.Events.READY, () => {
        isReady = true;
    });

    function startAfterInteraction() {
        if (isReady) {
            widget.play();
        }

        document.removeEventListener("click", startAfterInteraction);
        document.removeEventListener("touchstart", startAfterInteraction);
    }

    document.addEventListener("click", startAfterInteraction, { passive: true });
    document.addEventListener("touchstart", startAfterInteraction, { passive: true });
});
