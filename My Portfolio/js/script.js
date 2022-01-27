/*---------------------NAV SECTION TAB---------------------------*/

(()=>{
  const hamburger_btn = document.querySelector('.hamburger_btn'),
  nav_menu = document.querySelector('.nav_menu'),
  close_nav_btn = nav_menu.querySelector('.close_nav_menu');

  hamburger_btn.addEventListener('click', show_nav_menu);
  close_nav_btn.addEventListener('click', hide_nav_menu);
  function show_nav_menu() {
    nav_menu.classList.add('open');
    body_scrolling_toggle();
  };
  function hide_nav_menu() {
    nav_menu.classList.remove('open');
    fade_out_effect();
    body_scrolling_toggle();
  };
  function fade_out_effect() {
    document.querySelector(".fade_out_effect").classList.add('active');
    setTimeout(() => {
      document.querySelector('.fade_out_effect').classList.remove('active');
    }, 300);
  }

  //event handler
  document.addEventListener('click', (event)=>{
    if (event.target.classList.contains('link_item')) {
      if (event.target.hash !=='') {
        event.preventDefault();
        const hash = event.target.hash;
        //deactivate and activate sections 
        document.querySelector('.section.active').classList.add('hide');
        document.querySelector('.section.active').classList.remove('active');
        document.querySelector(hash).classList.add('active');
        document.querySelector(hash).classList.remove('hide');
        //deactivate existing nav_menu link_item
        nav_menu.querySelector('.active').classList.add('outer_shadow', 'hover_shadow');
        nav_menu.querySelector('.active').classList.remove('active', 'inner_shadow');
        //if clicked link_item is contained in the the navigation menu
        if (nav_menu.classList.contains('open')) {
          //activate new nav_menu link_item
          event.target.classList.add('active', 'inner_shadow');
          event.target.classList.remove('outer_shadow', 'hover_shadow');
          //hide nav_menu
          hide_nav_menu();
        } else {
          let nav_items = nav_menu.querySelectorAll('.link_item');
          nav_items.forEach((item)=>{
            if (hash === item.hash) {
              item.target.classList.add('active', 'inner_shadow');
              item.target.classList.remove('outer_shadow', 'hover_shadow');
            };
          });
          fade_out_effect();
        }
        window.location.hash = hash;
      }
    }
  })
})();


/*---------------------ABOUTS SECTION TAB---------------------------*/

(() =>{
  const about = document.querySelector(".about_section"),
  tabs_container = document.querySelector(".about_tabs");
  tabs_container.addEventListener("click", (event) => {
      if (event.target.classList.contains("tab_item") && !event.target.classList.contains('active')) {
        const target = event.target.getAttribute('data-target');
        tabs_container.querySelector('.active').classList.remove('active', 'outer_shadow');
        event.target.classList.add('active', 'outer_shadow');
        about.querySelector('.tab_content.active').classList.remove('active');
        about.querySelector(target).classList.add('active');
      }
  })
  
})();

/*---------------------PORTFOLIO FILTER AND POPUP---------------------------*/
function body_scrolling_toggle() {
  document.body.classList.toggle('hidden_scrolling');
}
(()=>{
  const filter_container = document.querySelector(".portfolio_filter"),
        portfolio_items_container = document.querySelector(".portfolio_items"),
        portfolio_items = document.querySelectorAll('.portfolio_item'),
        popup = document.querySelector('.portfolio_pp'),
        previous_btn = popup.querySelector('.pp_prev'),
        next_btn = popup.querySelector('.pp_next'),
        close_btn = popup.querySelector('.pp_close'),
        project_details_container = popup.querySelector('.pp_details'),
        project_details_btn = popup.querySelector('.pp_project_details_btn');

  let item_index, slide_index, screenshots;
  
  /*filter portfolo items*/

  filter_container.addEventListener('click', (event)=>{
    if (event.target.classList.contains('filter_item') && !event.target.classList.contains('active')) {
      //for deactivating previously viewed filter item
      filter_container.querySelector('.active').classList.remove('outer_shadow','active');
      //for activating new filter item
      event.target.classList.add('active', 'outer_shadow');
      const target = event.target.getAttribute('data-target');
      portfolio_items.forEach((item)=>{
        if (target === item.getAttribute('data-category') || target === 'all') {
          item.classList.remove('hide');          
          item.classList.add('show');
        }else {
          item.classList.remove('show');
          item.classList.add('hide');
        }
      })
    }
  })

  portfolio_items_container.addEventListener('click', (event)=>{
    if (event.target.closest('.inner_portfolio_item')) {
      const portfolio_item = event.target.closest('.inner_portfolio_item').parentElement;
      item_index = Array.from(portfolio_item.parentElement.children).indexOf(portfolio_item);
      screenshots = portfolio_items[item_index].querySelector('.portfolio_img img').getAttribute('data-screenshots');
      screenshots = screenshots.split(',');
      if (screenshots.length === 1) {
        previous_btn.style.display = 'none';
        next_btn.style.display = 'none';
      }else {
        previous_btn.style.display = 'block';
        next_btn.style.display = 'block';
      }
      slide_index = 0;
      toggle_popup();
      popup_slideshow();
      popup_details();
    }
  })

  close_btn.addEventListener('click', ()=>{
    toggle_popup();
    if (project_details_container.classList.contains('active')) {
      popup_details_toggle();
    }
  })

  function toggle_popup() {
    popup.classList.toggle('open');
    body_scrolling_toggle();
  }
  
  //popup slideshow
  function popup_slideshow () {
    const img_source = screenshots[slide_index];
    const popup_img = popup.querySelector('.pp_img');
    //Wexfort Building 1, Ikola Road, Agbomola Bus Stop Odunsi, Ipaja, Lagos.
    popup.querySelector('.pp_loader').classList.add('active');
    popup_img.src = img_source;
    popup_img.onload = () => {
      popup.querySelector('.pp_loader').classList.remove('active');
    }
    popup.querySelector('.pp_counter').innerHTML = `${slide_index+1} of ${screenshots.length}`;
  }

  //next slide
  next_btn.addEventListener('click', ()=>{
    if (slide_index === screenshots.length-1) {
      slide_index = 0;
    }else {
      slide_index++;
    }
    popup_slideshow();
  });

  //previous slide
  previous_btn.addEventListener('click', ()=>{
    if (slide_index === 0) {
      slide_index = screenshots.length;
    }else {
      slide_index--;
    }
    popup_slideshow();
  });
  //Popup details section
  project_details_btn.addEventListener('click', ()=>{
    popup_details_toggle();
  });
  function popup_details() {
    if (!portfolio_items[item_index].querySelector('.portfolio_item_details')) {
      project_details_btn.style.display ='none';
      return;
    }
    project_details_btn.style.display ='block';
    //get the project details
    const details = portfolio_items[item_index].querySelector('.portfolio_item_details').innerHTML;
    //set the project details
    popup.querySelector('.pp_project_details').innerHTML = details;
    //get the project title
    const title = portfolio_items[item_index].querySelector('.portfolio_item_title').innerHTML;
    //set the project title
    popup.querySelector('.pp_title h2').innerHTML = title;
    //get the project category
    const category = portfolio_items[item_index].getAttribute('data-category');
    //set the project category
    popup.querySelector('.pp_project_category').innerHTML = category.split('-').join(' ');
    console.log(popup);
  }
  function popup_details_toggle() {
    if (project_details_container.classList.contains('active')) {
      project_details_btn.querySelector('i').classList.remove('fa-minus');
      project_details_btn.querySelector('i').classList.add('fa-plus');
      project_details_container.classList.remove('active');
      project_details_container.style.maxHeight = 0 + "px";
    } else {
      project_details_btn.querySelector('i').classList.remove('fa-plus');
      project_details_btn.querySelector('i').classList.add('fa-minus');
      project_details_container.classList.add('active');
      project_details_container.style.maxHeight = `${project_details_container.scrollHeight}px`;
      popup.scrollTo(0, project_details_container.offsetTop);
    }
  }
})();


/*---------------testimonial slider---------------*/
(()=>{
  const slider_container = document.querySelector('.testimonial_slider_container'),
  slides = slider_container.querySelectorAll('.testimonial_item');
  slide_width =slider_container.offsetWidth;
  previous_btn = document.querySelector('.testimonial_slider_nav .prev');
  next_btn = document.querySelector('.testimonial_slider_nav .next');
  active_slide = slider_container.querySelector('.testimonial_item.active');
  let slide_index = Array.from(active_slide.parentElement.children).indexOf(active_slide);
  console.log(slide_index);

  //set width of all slides
  slides.forEach((slide)=>{
    slide.style.width = `${slide_width}px`;
  });
  //set width of slide container 
  slider_container.style.width = `${slide_width * slides.length}px`;
  next_btn.addEventListener('click', ()=>{
    if (slide_index >= 0 && slide_index < slides.length-1) {
      slide_index++;
    } else {
      return;
    };
    slider();
    console.log(slide_index);
  });
  previous_btn.addEventListener('click', ()=>{
    if (slide_index > 0 && slide_index <= slides.length-1) {
      slide_index--;
    } else {
      return;
    };
    console.log(slide_index);
    slider();
  });
  function slider() {
    //remove active and deactivate active slide
    slider_container.querySelector('.testimonial_item.active').classList.remove("active");
    //add active and activate new slides
    slides[slide_index].classList.add('active');
    slider_container.style.marginLeft =  `${-(slide_width * slide_index)}px`;
  }
  slider();
})();

// hide all sections exept active section

(()=>{
  const sections = document.querySelectorAll('.section');
  sections.forEach((section)=>{
    if (!section.classList.contains('active')) {
      section.classList.add('hide');
    };
  });
})();

window.addEventListener('load', ()=>{
  document.querySelector('.preloader').classList.add('fade_out');
  setTimeout(() => {
    document.querySelector('.preloader').style.display = 'none';
  }, 1000);
});