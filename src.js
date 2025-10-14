document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.snappy-slider').forEach((slider) => {

    /* Step 1: Insert spacers between every <li> pair */

    const track = slider.querySelector('.track');
    const originalList = Array.from(track.children);

    for (let i = originalList.length - 1; i > 0; i--) {
      const spacer = document.createElement('li');

      spacer.className = 'spacer';
      spacer.setAttribute('aria-hidden', 'true');
      spacer.setAttribute('role', 'presentation');

      track.insertBefore(spacer, originalList[i]);
    };

    /* Step 2: Apply snapping to the HTML-defined target */

    const snapTarget = slider.getAttribute('data-snapTarget');
    const newList = Array.from(track.children);

    const snapElements = newList.filter((element) => {
      return element.classList.contains(snapTarget)
    });

    snapElements.forEach((element) => {
      element.classList.add('snap-target');
    });

    /* Step 3: Add navigation functionality to the buttons */

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

  });
});