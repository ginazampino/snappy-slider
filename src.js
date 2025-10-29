document.addEventListener('DOMContentLoaded', () => {

    /* 
    
        HTML structure for reference:
        =============================

        === 1) FOR CONTENT/SPACERS:

        <section class="snappy-slider">
            <div class="viewport">
                <ul class="track">
                    <li class="content">
                    <li class="spacer">


        === 2) FOR GROUPS:

        <section class="snappy-slider">
            <div class="viewport">
                <ul class="track">
                    <li class="group">
                        <ul class="content">
                    <li class="spacer">

    */

    document.querySelectorAll('.snappy-slider').forEach((slider) => {

        /* ======== 

            STEP 1: Insert spacers 

                    Add spacers between every <li> element in a slider. Note that 
                    spacers are NOT automatically assigned snapping behavior, and 
                    they don't interfere with the layout of the slider. They're safe 
                    to leave in place, as-is, when not in use.

        ======== */

        const track = slider.querySelector('.track');
        const originalList = Array.from(track.children);

        for (let i = originalList.length - 1; i > 0; i--) {
            const spacer = document.createElement('li');

            spacer.className = 'spacer';

            /* NOTE: Prevent potential a11y/SEO issues: */
            spacer.setAttribute('aria-hidden', 'true');
            spacer.setAttribute('role', 'presentation');

            track.insertBefore(spacer, originalList[i]);
        };

        /* ======== 

            STEP 2: Add snapping

                    Snapping behavior is assigned to elements whose class names
                    match the value of the "data-snapTarget" HTML attribute.

                    Options:

                    1) "content" - When the "content" class is defined as the snap target,
                                   each <li> element in the slider <ul> track will be given
                                   snapping behavior. By default, this means that the slider
                                   will snap to the center of each <li> on scroll.

                                   NOTE: Every slider has "content" <li> elements.

                    2) "spacer"  - When the "spacer" class is defined as the snap target,
                                   each spacer <li> element (added in step 1) will be assigned
                                   snapping behavior. This means that the slider will snap
                                   between a pair of "content" <li> elements.

                                   NOTE: Every slider has "spacer" <li> elements.

                    3) "group"   - When the "group" class is defined as the snap target,
                                   each "group" <li> element will be assigned snapping behavior.
                                   Each group will contain a <ul> of its own, so the slider
                                   will appear to snap between a collection of <li> elements,
                                   as if it were turning a page.

                                   NOTE: Know that "group" elements are not expected to be 
                                         in every slider. If you want to snap by group, you 
                                         must add them yourself with.

        ======== */

        const snapTarget = slider.getAttribute('data-snapTarget');
        
        track.querySelectorAll('.' + snapTarget).forEach((element) => element.classList.add('snap-target'));

        /* ======== 

            STEP 3: Set up controls 

        ======== */

        const viewport = slider.querySelector('.viewport');
        const scrollSpeed = parseInt(slider.getAttribute('data-scrollSpeed')) || 300;
        const prev = slider.querySelector('.prev');
        const next = slider.querySelector('.next');

        /* 3a. Click events: */

        prev.addEventListener('click', () => {
            viewport.scrollBy({
                left: -scrollSpeed,
                behavior: 'smooth'
            });
        });

        next.addEventListener('click', () => {
            viewport.scrollBy({
                left: scrollSpeed,
                behavior: 'smooth'
            });
        });

        /* 3b. Hold events: */

        let scrollTimer = null;

        function startHold(direction) {
            /* NOTE: Disable snapping while holding: */
            viewport.classList.add('disable-snap');

            /* NOTE: Scroll by small, incremental steps: */
            scrollTimer = setInterval(() => {
                viewport.scrollLeft += direction * 16;
            }, 16); /* NOTE: Smaller number, faster movement. */
        };

        function stopHold() {
            clearInterval(scrollTimer);
            scrollTimer = null;

            /* NOTE: Re-enable snapping: */
            viewport.classList.remove('disable-snap');
        };

        /* 3c. Event guards: */

        function addGuards(button, direction) {
            let holdTimeout;
            let holding = false;

            button.addEventListener('mousedown', () => {
                holding = false;
                holdTimeout = setTimeout(() => {
                    holding = true;
                    startHold(direction);
                }, 150); /* NOTE: Hold delay in milliseconds */
            });

            button.addEventListener('mouseup', () => {
                clearTimeout(holdTimeout);

                if (holding) {
                    stopHold();
                } else {
                    viewport.scrollBy({
                        left: direction * scrollSpeed,
                        behavior: 'smooth'
                    });
                };
            });
            
            button.addEventListener('mouseleave', stopHold);
        };

        /* 3d. Final step */

        addGuards(prev, -1);
        addGuards(next, 1);
    });
});