document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.horizontal-gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const itemWidth = galleryItems[0].offsetWidth + 15;
    
    // Clonamos los primeros items y los añadimos al final
    const firstItems = Array.from(galleryItems).slice(0, 3);
    firstItems.forEach(item => {
        gallery.appendChild(item.cloneNode(true));
    });
    
    // Reiniciamos la posición cuando termina la animación
    gallery.addEventListener('animationiteration', () => {
        gallery.style.transition = 'none';
        gallery.style.transform = 'translateX(0)';
        setTimeout(() => {
            gallery.style.transition = 'transform 0.5s linear';
        }, 50);
    });
});