document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.snappy-slider').forEach((slider) => {

    /* Step 1: Insert spacers between every <li> pair */

    const track = slider.querySelector('.track');
    const slides = Array.from(track.children);

    for (let i = slides.length - 1; i > 0; i--) {
      const spacer = document.createElement('li');

      spacer.className = 'spacer';
      spacer.setAttribute('aria-hidden', 'true');
      spacer.setAttribute('role', 'presentation');

      track.insertBefore(spacer, slides[i]);
    };

    /* Step 2: Apply snapping to the HTML-defined target */

    const snapTarget = slider.getAttribute('data-snapTarget');
    const slidesWithSpacers = Array.from(track.children);

    const snapElements = slidesWithSpacers.filter((element) => {
      return element.classList.contains(snapTarget)
    });

    snapElements.forEach((element) => {
      element.classList.add('snap-target');
    });

    /* Step 3: Add basic click-only navigation functionality to the buttons */

    const viewport = slider.querySelector('.viewport');
    const scrollSpeed = parseInt(slider.getAttribute('data-scrollSpeed')) || 300;
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');

    prev.addEventListener('click', () => {
      viewport.scrollBy({
        left: -scrollSpeed,
        behavior: 'smooth'
      })
    });

    next.addEventListener('click', () => {
      viewport.scrollBy({
        left: scrollSpeed,
        behavior: 'smooth'
      });
    });

    /* Step 4: Add click-and-hold navigation functionality to the buttons */
    const scrollInterval = parseInt(slider.getAttribute('data-scrollInterval')) || 400;
    let scrollTimer = null;

    function startScroll(direction) {
      if (scrollTimer) return;

      scrollTimer = setInterval(() => {
        viewport.scrollBy({
          left: direction * scrollSpeed,
          behavior: 'smooth'
        });
      }, scrollInterval);
    };

    function stopScroll() {
      clearInterval(scrollTimer);
      scrollTimer = null;
    };

    next.addEventListener('mousedown', () => startScroll(1));
    next.addEventListener('mouseup', stopScroll);
    next.addEventListener('mouseleave', stopScroll);
    next.addEventListener('touchstart', () => startScroll(1), { passive: true });
    next.addEventListener('touchend', stopScroll);

    prev.addEventListener('mousedown', () => startScroll(-1));
    prev.addEventListener('mouseup', stopScroll);
    prev.addEventListener('mouseleave', stopScroll);
    prev.addEventListener('touchstart', () => startScroll(-1), { passive: true });
    prev.addEventListener('touchend', stopScroll);

  });
});