new Glider(document.querySelector('.gli2'), {
    // Mobile-first defaults
    slidesToShow: 1,
    slidesToScroll: 1,
    scrollLock: true,
    dots: '.dots2',
    draggable : true,
    arrows: {
      prev: '.glider-prev2',
      next: '.glider-next2'
    },
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 460,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 2,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25
        }
      },
      {
        // screens greater than >= 775px
        breakpoint: 769,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 3,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25
        }
      },
      {
        // screens greater than >= 1024px
        breakpoint: 1265,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          itemWidth: 150,
          duration: 0.25
        }
      }
    ]
  });