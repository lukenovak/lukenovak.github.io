function setScrollListeners() {
  var about = document.getElementById("about-button");
  var current = document.getElementById("current-button");
  var faq = document.getElementById("faq-button");
  about.addEventListener("click", function() {
    window.scroll({
      top: document.getElementById("main-about").offsetTop - 75,
      behavior: "smooth"});
  });
  current.addEventListener("click", function() {
    window.scroll({
      top: document.getElementById("current-status").offsetTop - 75,
      behavior: "smooth"});
  });
  faq.addEventListener("click", function() {
    window.scroll({
      top: document.getElementById("FAQ").offsetTop - 75,
      behavior: "smooth"});
  });
}
