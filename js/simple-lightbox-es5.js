"use strict";

var $lightboxes = document.querySelectorAll("img[data-simple-lightbox]");

if ($lightboxes) {
  $lightboxes.forEach(function (lightbox) {
    lightbox.addEventListener("click", function (e) {
      var _$overlay$classList;

      // create
      var imgPath = e.target.getAttribute("src");
      var $figure = document.createElement("figure");
      var $img = document.createElement("img");
      var $body = document.querySelector("body");
      var $overlay = document.createElement("div");
      var $close = document.createElement("span");
      var caption = e.target.getAttribute("title");
      var lightboxId = Math.floor(Math.random() * 1000000); // config

      var classes = ["overlay", "simple-lightbox"];

      (_$overlay$classList = $overlay.classList).add.apply(_$overlay$classList, classes);

      $close.innerHTML = "x";
      $close.classList.add("close");

      if (lightboxId) {
        $close.setAttribute("id", "close-" + lightboxId);
        $overlay.setAttribute("id", "lightbox-" + lightboxId);
      }

      if (imgPath) {
        $img.setAttribute("src", imgPath);
      }

      var $figCaption = document.createElement("figcaption");
      $figCaption.innerHTML = caption;
      $figCaption.classList.add("caption"); // insert

      $figure.insertAdjacentElement("beforeend", $img);

      if (caption) {
        $figure.insertAdjacentElement("beforeend", $figCaption);
      }

      $figure.insertAdjacentElement("beforeend", $close);
      $overlay.insertAdjacentElement("beforeend", $figure);
      $body.insertAdjacentElement("beforeend", $overlay); // close

      document.querySelector("#lightbox-" + lightboxId).addEventListener("click", function (e) {
        if (e.target.tagName !== "IMG") {
          document.querySelector("#lightbox-" + lightboxId).remove();
        }
      });
    });
  });
}