function insertListenerToDom(courseInfo, dom) {
  function menuOpenCloseErgoTimer(delay, actionFunction) {
    clearTimeout(this.delayTimer || 0);
    this.delayTimer = setTimeout(actionFunction, delay);
  }

  let popper = insertPopper();
  dom.body.appendChild(popper);
  let popperInstance = {};
  let swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  for (let row of getAllRows(dom)) {
    var target = row.lastElementChild;
    target.addEventListener("mouseenter", (mouseEvent) => {
      let course_id = parseRow(mouseEvent.target.parentNode);
      let filtered_yearsem_info = Object.entries(courseInfo[course_id]).filter(key_value => key_value[1].average);
      if (filtered_yearsem_info.length == 0) return;
      menuOpenCloseErgoTimer(0, () => {
        let selected = Object.fromEntries(filtered_yearsem_info);

        popper.querySelectorAll('.swiper-container').forEach(e => e.parentNode.removeChild(e));
        popper.removeAttribute("hidden");

        let swiperContainer = dom.createElement('div'),
            swiperWrapper = dom.createElement('div'),
            swiperPagination = dom.createElement('div'),
            swiperButtonNext = dom.createElement('button'),
            swiperButtonPrev = dom.createElement('button');

        swiperContainer.className = "swiper-container";
        swiperWrapper.className = "swiper-wrapper";
        swiperPagination.className = "swiper-pagination";
        swiperButtonNext.className = "swiper-button-next";
        swiperButtonPrev.className = "swiper-button-prev";
        swiperButtonNext.style.cssText += "border: 0;background-color: transparent;";
        swiperButtonPrev.style.cssText += "border: 0;background-color: transparent;";

        for (let [course, info] of filtered_yearsem_info) {
          console.log(course, info);
          let distribution = info.distribution;
          let data = {
            datasets: [{
              data: Object.values(distribution),
              backgroundColor: Object.keys(distribution).map(color => {
                return {
                  "A+": 'rgba(54, 162, 235, 0.8)',
                  "A" : 'rgba(54, 162, 235, 0.5)',
                  "A-": 'rgba(54, 162, 235, 0.3)',
                  "B+": 'rgba(75, 192, 192, 0.8)',
                  "B" : 'rgba(75, 192, 192, 0.5)',
                  "B-": 'rgba(75, 192, 192, 0.3)',
                  "C+": 'rgba(255, 206, 86, 0.8)',
                  "C" : 'rgba(255, 206, 86, 0.5)',
                  "C-": 'rgba(255, 206, 86, 0.3)',
                  "D" : 'rgba(255, 99, 132, 0.8)',
                  "F" : 'rgba(255, 99, 132, 0.5)',
                  "X" : 'rgba(255, 99, 132, 0.3)',
                  "unknown": 'rgba(0, 0, 0, 0.2)',
              }[color]}),
              borderWidth: 0,
            }],
            labels: Object.keys(distribution)
          };
          swiperWrapper.appendChild(insertPieChart(data, course, course_id));
        }

        swiperContainer.appendChild(swiperWrapper);
        swiperContainer.appendChild(swiperPagination);
        swiperContainer.appendChild(swiperButtonNext);
        swiperContainer.appendChild(swiperButtonPrev);
        popper.appendChild(swiperContainer);

        popperInstance = Popper.createPopper(mouseEvent.target, popper, {
          placement: 'left',
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 20],
            },
          }],
        });
      });
    });
    target.addEventListener("mouseleave", (mouseEvent) => {
      menuOpenCloseErgoTimer (300, () => {
        popper.setAttribute("hidden", "");
        mouseEvent.target.querySelectorAll('.swiper-container').forEach(e => e.parentNode.removeChild(e));
      });
    });
    target.addEventListener("mousemove", (mouseEvent) => {
      try {
        if (typeof(eval(popperInstance.update())) == "function") {
          popperInstance.update();
          return true;
        }
      } catch(e) {}
    });
  }
  popper.addEventListener("mouseenter", (mouseEvent) => {
    menuOpenCloseErgoTimer(0, () => {
      popper.removeAttribute("hidden");
    });
  });
  popper.addEventListener("mouseleave", (mouseEvent) => {
    menuOpenCloseErgoTimer(300, () => {
      popper.setAttribute("hidden", "");
      mouseEvent.target.querySelectorAll('.swiper-container').forEach(e => e.parentNode.removeChild(e));
    });
  });
}
