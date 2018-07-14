function setScrollListeners() {
  var offset = document.getElementById("top-bar").offsetHeight;
  document.getElementById("about-button").addEventListener("click", function() {
    window.scroll({
      top: document.getElementById("main-about").offsetTop - offset,
      behavior: "smooth"});
  });
  document.getElementById("current-button").addEventListener("click", function() {
    window.scroll({
      top: document.getElementById("current-status").offsetTop - offset,
      behavior: "smooth"});
  });
  document.getElementById("faq-button").addEventListener("click", function() {
    window.scroll({
      top: document.getElementById("FAQ").offsetTop - offset,
      behavior: "smooth"});
  });
  document.getElementById("big-name").addEventListener("click", function() {
    window.scroll({
      top: 0,
      behavior: "smooth"});
  });
  document.getElementById("contact-button").addEventListener("click", function(){
    window.scroll({
      top: document.getElementById("contact-section").offsetTop - offset,
      behavior: "smooth"});
  });
}
