function insertListenerToDom(response){
  function MenuOpenCloseErgoTimer (dDelay, fActionFunction){
    if (typeof this.delayTimer == "number"){
      clearTimeout (this.delayTimer);
      this.delayTimer = '';
    }
    this.delayTimer = setTimeout (function() { fActionFunction (); }, dDelay);
  }

  let popper = insertPopper();
  document.body.appendChild(popper);
  let popperInstance ;

  function onMouseenter(dom) {

    let course_id = parseRow(dom.target.parentNode);
    let haveData =  response.hasOwnProperty(course_id) ? (Object.values(response[course_id]).filter(course => course.average != null ).length != 0 ) : response.hasOwnProperty(course_id);
    if(!haveData) return 0;

    MenuOpenCloseErgoTimer (0,function () {
      document.querySelector('.popper').querySelectorAll('.swiper-container').forEach(e => e.parentNode.removeChild(e));
      popper.removeAttribute("hidden");

      let swiperContainer = document.createElement('div'),
          swiperWrapper = document.createElement('div'),
          swiperPagination =document.createElement('div'),
          swiperButtonNext= document.createElement('button'),
          swiperButtonPrev= document.createElement('button');

      swiperContainer.className = "swiper-container";
      swiperWrapper.className = "swiper-wrapper";
      swiperPagination.className = "swiper-pagination";
      swiperButtonNext.className = "swiper-button-next";
      swiperButtonPrev.className = "swiper-button-prev";
      swiperButtonNext.style.cssText += "border: 0;background-color: transparent;";
      swiperButtonPrev.style.cssText += "border: 0;background-color: transparent;";

      const pieChartColor = {
        "A+": 'rgba(54, 162, 235, 0.6)',
        "A" : 'rgba(54, 162, 235, 0.6)',
        "A-": 'rgba(54, 162, 235, 0.6)',
        "B+": 'rgba(75, 192, 192, 0.6)',
        "B" : 'rgba(75, 192, 192, 0.6)',
        "B-": 'rgba(75, 192, 192, 0.6)',
        "C+": 'rgba(255, 206, 86, 0.6)',
        "C" : 'rgba(255, 206, 86, 0.6)',
        "C-": 'rgba(255, 206, 86, 0.6)',
        "D" : 'rgba(255, 99, 132, 0.6)',
        "E" : 'rgba(255, 99, 132, 0.6)',
        "X" : 'rgba(255, 99, 132, 0.6)',
        "unknown": 'rgba(0, 0, 0, 0.2)',
      };

      for(let key in response[course_id])
      {
        if(response[course_id][key].average != null){
          let distribution = response[course_id][key].distribution;
          let data = {
            datasets: [{
              data: Object.values(distribution),
              backgroundColor: Object.keys(distribution).map(color => pieChartColor[color]),
              borderWidth: 0,
            }],
            labels: Object.keys(distribution)
          };
          let pieChart = insertPieChart(data,key);
          swiperWrapper.appendChild(pieChart);
        }
      }

      swiperContainer.appendChild(swiperWrapper);
      swiperContainer.appendChild(swiperPagination);
      swiperContainer.appendChild(swiperButtonNext);
      swiperContainer.appendChild(swiperButtonPrev);
      popper.appendChild(swiperContainer);

      const swiperConfig = {
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
      };
      const popperConfig = {
        placement: 'left',
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, 20],
          },
        }],
      };
      new Swiper('.swiper-container', swiperConfig);
      popperInstance = Popper.createPopper(dom.target,document.querySelector(".popper"), popperConfig);
    });
  }

  function onMousemove(target) {
    try {
      if (typeof(eval(popperInstance.update())) == "function") {
        popperInstance.update();
        return true;
      }
    } catch(e) {
    }
  }

  function onMouseleave(target) {
    MenuOpenCloseErgoTimer (300,function () {
      popper.setAttribute("hidden", "");
      document.querySelector('.popper').querySelectorAll('.swiper-container').forEach(e => e.parentNode.removeChild(e));
    });
  }

  function pOnMouseenter(target) {
    MenuOpenCloseErgoTimer (0,function () {
      popper.removeAttribute("hidden");
    });
  }

  let rows = document.querySelectorAll('tr[align="center"]:not([bgcolor="#DDEDFF"])');
  for (let row of rows) {
    var target = row.children[18];
    target.addEventListener("mouseenter", onMouseenter);
    target.addEventListener("mouseleave", onMouseleave);
    target.addEventListener("mousemove", onMousemove);
  }
  popper.addEventListener("mouseenter", pOnMouseenter);
  popper.addEventListener("mouseleave", onMouseleave);
}
