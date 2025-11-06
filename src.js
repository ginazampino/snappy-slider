document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.snappy-slider').forEach((slider) => {

    /* ======================
    
        Step 1) Insert spacers between every <li> pair.

    ====================== */

    const track = slider.querySelector('.track');
    const slides = Array.from(track.children);

    for (let i = slides.length - 1; i > 0; i--) {
      const spacer = document.createElement('li');

      spacer.className = 'spacer';
      spacer.setAttribute('aria-hidden', 'true');
      spacer.setAttribute('role', 'presentation');

      track.insertBefore(spacer, slides[i]);
    };

    /* ======================
    
        Step 2) Apply snapping to the HTML-defined target.

    ====================== */


    const snapTarget = slider.getAttribute('data-snapTarget');
    const slidesWithSpacers = Array.from(track.children);

    const snapElements = slidesWithSpacers.filter((element) => {
      return element.classList.contains(snapTarget)
    });

    snapElements.forEach((element) => {
      element.classList.add('snap-target');
    });

    /* ======================
    
        Step 3) Implement viewport scroll logic.

    ====================== */

    const viewport = slider.querySelector('.viewport');
    const allSnapTargets = Array.from(track.querySelectorAll('.snap-target'));

    // Identify which snap target is currently in view:
    function getCurrentSnapTarget() {
      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.left + viewportRect.width / 2;

      // Identify which snap target is closest to the center of the view:
      let closest = null;
      let closestDistance = Infinity;

      allSnapTargets.forEach((target) => {
        const targetRect = target.getBoundingClientRect();
        const targetCenter = targetRect.left + targetRect.width / 2;
        const distance = Math.abs(viewportCenter - targetCenter);

        // Only consider targets that are visible within the view:
        if (targetRect.right >= viewportRect.left && targetRect.left <= viewportRect.right) {
          if (distance < closestDistance) {
            closest = target;
            closestDistance = distance;
          };
        };
      });

      return closest || allSnapTargets[0];
    };

    function scrollToSnapTarget(direction) {
      const current = getCurrentSnapTarget();

      if (!current) {
        return;
      };

      const currentIndex = allSnapTargets.indexOf(current);
      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < allSnapTargets.length) {
        const target = allSnapTargets[nextIndex];

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      };
    };

    /* ======================
    
        Step 4) Add event listeners to the navigation buttons.

    ====================== */

    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');

    prev.addEventListener('click', () => scrollToSnapTarget(-1));
    next.addEventListener('click', () => scrollToSnapTarget(1));

    /* ======================
    
        Step 4) Implement click-and-hold navigation functionality.

    ====================== */

    const scrollDelay = 300;
    const scrollInterval = 300;

    let scrollTimer = null;

    function startScroll(direction) {
      if (scrollTimer) {
        return;
      };

      const initialTimeout = setTimeout(() => {
        scrollToSnapTarget(direction);

        scrollTimer = setInterval(() => {
          scrollToSnapTarget(direction);
        }, scrollInterval);
      }, scrollDelay);
      
      scrollTimer = initialTimeout;
    };

    function stopScroll() {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
        scrollTimer = null;
      }
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