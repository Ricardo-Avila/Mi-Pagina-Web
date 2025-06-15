// soundcloud.js
document.addEventListener('DOMContentLoaded', function() {
    const widgetIframe = document.getElementById('sc-widget');
    const toggleBtn = document.getElementById('sc-toggle');
    let widget;
    let isPlaying = false;

    // Cargar API de SoundCloud
    function loadSCAPI() {
        return new Promise((resolve) => {
            if (window.SC) return resolve();
            
            const script = document.createElement('script');
            script.src = 'https://w.soundcloud.com/player/api.js';
            script.onload = resolve;
            document.body.appendChild(script);
        });
    }

    // Inicializar widget
    function initWidget() {
        widget = SC.Widget(widgetIframe);
        
        // Configurar eventos
        widget.bind(SC.Widget.Events.READY, function() {
            console.log('Reproductor listo');
            toggleBtn.disabled = false;
        });
        
        widget.bind(SC.Widget.Events.PLAY, function() {
            isPlaying = true;
            toggleBtn.textContent = '⏸ Pausar';
        });
        
        widget.bind(SC.Widget.Events.PAUSE, function() {
            isPlaying = false;
            toggleBtn.textContent = '▶️ Reproducir';
        });
    }

    // Control de reproducción
    function togglePlayback() {
        if (!widget) return;
        
        if (isPlaying) {
            widget.pause();
        } else {
            widget.play();
        }
    }

    // Inicialización completa
    loadSCAPI().then(() => {
        initWidget();
        toggleBtn.addEventListener('click', togglePlayback);
    });
});