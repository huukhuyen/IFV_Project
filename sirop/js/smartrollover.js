/* vim:set ts=2 sw=2 sts=2 ai si nu et ft=javascript ff=dos:

  Last Change: 05-April-2010 09:26:12.
  Author: Technical team.
  Copyright: (C)Anchor Group K.K.

  URL: http://www.anchor-gr.jp/labo.html
  EMAIL: info@anchor-gr.jp

  Filename: smartrollover.js

 ---------------------------------------------------------*/
function smartRollover() {
if(document.getElementsByTagName) {
var images = document.getElementsByTagName("img");

for(var i=0; i < images.length; i++) {
if(images[i].getAttribute("src").match("_off."))
{
images[i].onmouseover = function() {
this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));
}
images[i].onmouseout = function() {
this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));
}
}
}
}
}

if(window.addEventListener) {
window.addEventListener("load", smartRollover, false);
}
else if(window.attachEvent) {
window.attachEvent("onload", smartRollover);
}

