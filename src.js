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
    const snapAmount = parseInt(slider.getAttribute('data-snapAmount')) || 1;
    const newList = Array.from(track.children);

    const snapElements = newList.filter((element) => {
      return element.classList.contains(snapTarget)
    });

    for (let i = 0; i < snapElements.length; i++) {
      if (i % snapAmount === 0) {
        snapElements[i].classList.add('snap-target');
      };
    };

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



    /* Step 2: Apply snapping */
    // const snapItems = items.filter((child) => {
    //   return child.classList.contains(snapTarget)
    // });
  
    // snapItems.forEach((item) => {
    //   item.classList.add('snap-target');
    // });


    // for (let i = items.length - 1; i > 0; i--) {

    //   if (i % snapAmount === 0) {
    //           console.log('hi')
    //     const spacer = document.createElement('li');
        
    //     spacer.className = 'spacer';
    //     spacer.setAttribute('aria-hidden', 'true');
    //     spacer.setAttribute('role', 'presentation');
    //     track.insertBefore(spacer, items[i]);
    //   };
    // };



// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.snappy-slider .track').forEach((track) => {
//     const items = Array.from(track.children);

//     for (let i = items.length - 1; i > 0; i--) {
//       const spacer = document.createElement('li');

//       spacer.className = 'spacer';
//       spacer.setAttribute('aria-hidden', 'true');
//       spacer.setAttribute('role', 'presentation');

//       track.insertBefore(spacer, items[i]);
//     };
//   });

//   document.querySelectorAll('.snappy-slider').forEach((slider) => {
//     const content = slider.querySelector('.content');
//     const prev = slider.querySelector('.prev');
//     const next = slider.querySelector('.next');
//     const scrollAmount = parseInt(slider.getAttribute('data-scrollSpeed')) || 300;

//     prev.addEventListener('click', () => {
//       content.scrollBy({
//         left: -scrollAmount,
//         behavior: 'smooth'
//       });
//     });

//     next.addEventListener('click', () => {
//       content.scrollBy({
//         left: scrollAmount,
//         behavior: 'smooth'
//       });
//     });
//   });
// });


