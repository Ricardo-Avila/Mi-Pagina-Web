document.addEventListener("DOMContentLoaded", () => {
    const miniWidget = document.getElementById("sc-mini-widget");

    if (!miniWidget || !window.SC?.Widget) {
        return;
    }

    const widget = window.SC.Widget(miniWidget);
    let isReady = false;

    function tryPlay() {
        if (isReady) {
            widget.play();
        }
    }

    widget.bind(window.SC.Widget.Events.READY, () => {
        isReady = true;
        tryPlay();
        setTimeout(tryPlay, 800);
    });

    function startAfterInteraction() {
        tryPlay();

        document.removeEventListener("click", startAfterInteraction);
        document.removeEventListener("touchstart", startAfterInteraction);
        document.removeEventListener("keydown", startAfterInteraction);
    }

    document.addEventListener("click", startAfterInteraction, { passive: true });
    document.addEventListener("touchstart", startAfterInteraction, { passive: true });
    document.addEventListener("keydown", startAfterInteraction);
});
