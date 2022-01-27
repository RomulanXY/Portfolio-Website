const style_switcher_toggler = document.querySelector('.style_switcher_toggler');
style_switcher_toggler.addEventListener('click', ()=>{
    document.querySelector('.style_switcher').classList.toggle('open');
});
window.addEventListener('scroll', ()=>{
    if (document.querySelector('.style_switcher').classList.contains('open')) {
        document.querySelector('.style_switcher').classList.remove('open');
    };
});

const alternate_styles = document.querySelectorAll('.alternate_style')
function setActiveStyle(color) {
    localStorage.setItem('color', color);
    changeColor();
};
function changeColor() {
    alternate_styles.forEach((style) => {
        if (localStorage.getItem("color") === style.getAttribute('title')) {
            style.removeAttribute('disabled');
        }else {
            style.setAttribute('disabled', 'true');
        };
    });
};
if(localStorage.getItem('color') !== null){
    changeColor();
};

/*----------------------LIGHT AND DARK THEMES---------------------------*/

const day_night = document.querySelector('.day_night');
day_night.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    }else{
        localStorage.setItem('theme', 'light');
    };
});

function themeMode(params) {
    if (localStorage.getItem('theme') !== null) {
        if (localStorage.getItem('theme')==='light'){
           document.body.classList.remove('dark');
        }else{
            document.body.classList.add('dark');
        };
    };
    updateIcon();
};
themeMode();
function updateIcon() {
    if (document.body.classList.contains('dark')) {
        day_night.querySelector('i').classList.remove('fa-moon');
        day_night.querySelector('i').classList.add('fa-sun');
    }else{
        day_night.querySelector('i').classList.remove('fa-sun');
        day_night.querySelector('i').classList.add('fa-moon');
    };
};