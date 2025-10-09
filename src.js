document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.snappy-slider .track').forEach((track) => {
    const items = Array.from(track.children);

    for (let i = items.length - 1; i > 0; i--) {
      const spacer = document.createElement('li');

      spacer.className = 'spacer';
      spacer.setAttribute('aria-hidden', 'true');
      spacer.setAttribute('role', 'presentation');

      track.insertBefore(spacer, items[i]);
    };
  });

  document.querySelectorAll('.snappy-slider').forEach((slider) => {
    const content = slider.querySelector('.content');
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');
    const scrollAmount = 300;

    prev.addEventListener('click', () => {
      content.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    next.addEventListener('click', () => {
      content.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  });
});


