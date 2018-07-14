function setScrollListeners() {
  var about = document.getElementById("about-button");
  var current = document.getElementById("current-button");
  var faq = document.getElementById("faq-button");
  var title = document.getElementById("big-name");
  var offset = document.getElementById("top-bar").offsetHeight;
  about.addEventListener("click", function() {
    window.scroll({
      top: document.getElementById("main-about").offsetTop - offset,
      behavior: "smooth"});
  });
  current.addEventListener("click", function() {
    window.scroll({
      top: document.getElementById("current-status").offsetTop - offset,
      behavior: "smooth"});
  });
  faq.addEventListener("click", function() {
    window.scroll({
      top: document.getElementById("FAQ").offsetTop - offset,
      behavior: "smooth"});
  });
  title.addEventListener("click", function() {
    window.scroll({
      top: 0,
      behavior: "smooth"});
  });
}
