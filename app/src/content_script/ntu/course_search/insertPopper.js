function insertPopper(response){

  console.log("response",response);

  let rows = document.querySelectorAll('tr[align="center"]:not([bgcolor="#DDEDFF"])');

  var offsetTopModifier = function(data) {
    data.offsets.popper.left -= 20
    return data;
  }

  var popper = document.createElement('div');
  popper.className = "popper";
  popper.style = "position: absolute;background: #F5F5F5;color: black;width: 400px;height: 200px;border-radius: 20px;box-shadow: 0 0 2px rgba(0,0,0,0.5);padding: 10px;text-align: center;";
  //popper.innerHTML = 'The text must be readble completely';
  popper.style.cssText +="margin-right: 10px;";
  popper.setAttribute("hidden","")
  var popper__arrow = document.createElement('div');
  popper__arrow.className = "popper__arrow";
  popper__arrow.style = "width: 0;height: 0;border-style: solid;position: absolute;margin: 5px;";
  popper__arrow.style.cssText += "border-width: 10px 0 10px 10px;border-color: transparent transparent transparent #D3D3D3;right: -10px;top: calc(50% - 15px);margin-left: 0;margin-right: 0;"
  popper.appendChild(popper__arrow);

  document.body.appendChild(popper);

  let pieOptions = {
    radiusBackground: {
      color: '#d1d1d1' // Set your color per instance if you like
    },
    //cutoutPercentage: 30,
    segmentShowStroke : true,
    animateScale : true,
    events: true,
    animation: {
      duration: 200,
      easing: "easeOutElastic",
      onComplete: function () {
        var ctx = this.chart.ctx;
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        console.log("dataset1",this.data.datasets);
        this.data.datasets.forEach(function (dataset) {
          for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                label = model.label,
                mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
                start_angle = model.startAngle,
                end_angle = model.endAngle,
                mid_angle = start_angle + (end_angle - start_angle)/2;

            var x = mid_radius * Math.cos(mid_angle);
            var y = mid_radius * Math.sin(mid_angle);

            ctx.fillStyle = '#fff';
            if (i == 3){ // Darker text color for lighter background
              ctx.fillStyle = '#444';
            }
            var percent = String(Math.round(dataset.data[i]/total*100)) + "%";
            //Don't Display If Legend is hide or value is 0
            if(dataset.data[i] != 0 && Object.values(dataset._meta)[0].data[i].hidden != true) {
              //ctx.fillText(dataset.data[i], model.x + x, model.y + y);
              // Display percent in another line, line break doesn't work for fillText
              ctx.fillText(percent, model.x + x, model.y + y + 0);
              ctx.fillText(label, model.x + x, model.y + y + 15);
            }
          }
        });
      }
    }
  };

  function show() {
   popper.removeAttribute("hidden");
   instance.update();
  }

  function hide() {
   popper.setAttribute("hidden", "");
  }

  function MenuOpenCloseErgoTimer (dDelay, fActionFunction, node){
      if (typeof this.delayTimer == "number"){
          clearTimeout (this.delayTimer);
          this.delayTimer = '';
      }
      if (node)
          this.delayTimer = setTimeout (function() { fActionFunction (node); }, dDelay);
      else
          this.delayTimer = setTimeout (function() { fActionFunction (); }, dDelay);
  }


var instance ;
  function onMouseenter(dom) {
    MenuOpenCloseErgoTimer (0,function (node) {
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

   //console.log("swiper-button",document.querySelector('.swiper-button'));
   const bottomLeftConfig = {
   placement: 'left',
   modifiers: [
     {
       name: 'offset',
       options: {
         offset: [0, 20],
       },
     },
   ],
  };
  let idx = {"課號": 2, "班次": 3};
  let td = dom.target.parentNode.children;
  let course_number = td[idx["課號"]].textContent.trim();
  let class_id = td[idx["班次"]].textContent.trim();
  let course_id = course_number + (class_id ? '-' + class_id : "");

  const bgColor = {
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

  console.log(course_id,response[course_id]);
  let data = {};
  for(var key in response[course_id])
  {
    console.log(key,response[course_id][key].average );
    if(response[course_id][key].average != null){
      let distribution = response[course_id][key].distribution;
      console.log("distribution",distribution);
      console.log(Object.keys(distribution),Object.values(distribution)  );
      data = {
        datasets: [{
          data: Object.values(distribution),
          backgroundColor: Object.keys(distribution).map(color => bgColor[color]),
          borderWidth: 0,
            //hoverBackgroundColor: ["#96b7b9","#718283","#5c6b6d"]
        }],
          // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: Object.keys(distribution)
      };



        let canvas = document.createElement("CANVAS")
        canvas.className = "swiper-slide";
        let countries = canvas.getContext("2d");
        let myPieChart = new Chart(countries,{
          type: 'doughnut',
          data: data,
          options: pieOptions
        });
        swiperWrapper.appendChild(canvas);
    }
  }

  //console.log(swiperPagination.style.cssText);

  swiperContainer.appendChild(swiperWrapper);
  swiperContainer.appendChild(swiperPagination);
  swiperContainer.appendChild(swiperButtonNext);
  swiperContainer.appendChild(swiperButtonPrev);


  popper.appendChild(swiperContainer);

  var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        loop: true
    });

  instance = Popper.createPopper(dom.target,document.querySelector(".popper"), bottomLeftConfig);

  });
   //show();
  }

  function onMousemove(target) {
    instance.update();
  }

  function onMouseleave(target) {
   MenuOpenCloseErgoTimer (300,function () {
     hide();
     document.querySelector('.popper').querySelectorAll('.swiper-container').forEach(e => e.parentNode.removeChild(e));
     //.remove();
   });
  }

  function pOnMouseleave(target) {
   MenuOpenCloseErgoTimer (300,function () {
     hide();
     document.querySelector('.popper').querySelectorAll('.swiper-container').forEach(e => e.parentNode.removeChild(e));
     //.remove();
   });
  }

  function pOnMouseenter(target) {
   MenuOpenCloseErgoTimer (0,function () {
     popper.removeAttribute("hidden");
     instance.update();
   });
  }

  for (let row of rows) {
    var target = row.children[18];
    //console.log(target);
    target.addEventListener("mouseenter", onMouseenter);
    target.addEventListener("mouseleave", onMouseleave);
    target.addEventListener("mousemove", onMousemove);
  }
  popper.addEventListener("mouseenter", pOnMouseenter);
  popper.addEventListener("mouseleave", pOnMouseleave);
}
