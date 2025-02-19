const header = document.querySelector('header');
const paddingHeader = document.querySelector('.padding-header');
const headerImg = document.querySelector('.headerImg');
const scrollThreshold = 120;
window.addEventListener('scroll', function () {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('fixed-header');
        paddingHeader.classList.add("padding-h");
        headerImg.classList.add("big_logo");
    } else {
        header.classList.remove('fixed-header');
        paddingHeader.classList.remove("padding-h")
        headerImg.classList.remove("big_logo");
    }
});