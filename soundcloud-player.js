// En tu archivo soundcloud.js
document.addEventListener('DOMContentLoaded', function() {
    const miniWidget = document.getElementById('sc-mini-widget');
    let widget;
    
    // Precargar cuando el usuario interactúe con la página
    function initOnInteraction() {
        widget = SC.Widget(miniWidget);
        widget.bind(SC.Widget.Events.READY, function() {
            widget.play();
            setTimeout(() => widget.pause(), 1000); // Precarga
        });
        
        // Eliminar este listener después del primer uso
        document.removeEventListener('click', initOnInteraction);
    }
    
    // Intentar autoplay después de interacción
    document.addEventListener('click', initOnInteraction);
    
    // Alternativa: Forzar autoplay después de 5 segundos (puede no funcionar en móviles)
    setTimeout(() => {
        if (widget) widget.play();
    }, 5000);
});