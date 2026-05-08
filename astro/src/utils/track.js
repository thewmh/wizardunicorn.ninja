document.addEventListener('click', function(event) {
  const element = event.target;
  const component = element.closest('[data-component]') || element;
  const clickData = {
      page: document.location.pathname,
      component: component.getAttribute('data-component'),
      elementTag: element.tagName,
      elementClass: element.className,
      elementId: element.id,
      x: event.pageX,
      y: event.pageY,
      timestamp: new Date().toISOString()
  };
  console.log('Click event:', clickData);
});

window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const scrollData = {
      scrollPosition: scrollPosition,
      viewportHeight: window.innerHeight,
      timestamp: new Date().toISOString()
  };
  console.log('Scroll event:', scrollData);
});

let startTime = new Date().getTime();

window.addEventListener('beforeunload', function() {
    const endTime = new Date().getTime();
    const timeSpent = endTime - startTime;

    const timeData = {
        timeSpentMilliseconds: timeSpent,
        timestamp: new Date().toISOString()
    };
    console.log('Time spent on page:', timeData);
});

let sectionStartTime = null;

const trackTimeInSection = (section) => {

    if (section) {
        section.addEventListener('mouseenter', function() {
            sectionStartTime = new Date().getTime();
        });

        section.addEventListener('mouseleave', function() {
            const sectionEndTime = new Date().getTime();
            const timeSpentInSection = sectionEndTime - sectionStartTime;
            
            const timeInSectionData = {
                page: document.location.pathname,
                section: section.getAttribute('data-component'),
                timeSpentMilliseconds: timeSpentInSection,
                timestamp: new Date().toISOString()
            };
            console.log('Time spent in section:', timeInSectionData);
        });
    } else {
        console.warn(`Section "${section}" not found.`);
    }
};

// Example: Tracking two sections with ids 'section1' and 'section2'
const sections = document.getElementsByTagName('section');

Array.from(sections).forEach(section => {
  trackTimeInSection(section);
});
// trackTimeInSection('blog-posts');
// trackTimeInSection('section2');
