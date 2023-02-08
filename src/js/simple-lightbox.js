//// Funcs

const isArr = (arr) => {
  return Array.isArray(arr);
};

const isObj = (obj) => {
  return obj && typeof obj === "object" && obj.constructor === Object;
};

const isStr = (str) => {
  return typeof str === "string";
};

const isDomElem = (elem) => {
  return elem instanceof HTMLElement;
};

const createArr = (items) => {
  return Array.prototype.slice.call(items);
};

const createElem = (elem, insert, classes = [], attrs = [], content) => {
  if (!elem && !insert) return null;

  const newElem = document.createElement(elem);

  // Add classes
  if (isArr(classes) && classes.length > 0) {
    newElem.classList.add(...classes);
  }

  // Add attrs
  if (isArr(attrs) && attrs.length > 0) {
    attrs
      .filter((item) => isObj(item))
      .forEach((item) => {
        return newElem.setAttribute(
          Object.keys(item)[0],
          Object.values(item)[0]
        );
      });
  }

  // Add innerHtml
  if (isStr(content)) {
    newElem.innerHTML = content;
  }

  // Check that insert is a DOM element
  const domElem = document.querySelector(insert);

  if (!isDomElem(domElem)) {
    console.error("DOM Element doesn't exist");
  }

  return domElem.insertAdjacentElement("beforeend", newElem);
};

const deleteElem = () => {
  const close = document.querySelector(".close");
  const overlay = document.querySelector(".overlay");
  const img = document.querySelector(".disabled");

  if (isDomElem(close) && isDomElem(overlay)) {
    close.addEventListener("click", (e) => {
      overlay.classList.add("overlay--close");

      overlay.addEventListener("transitionend", (e) => {
        if (e.propertyName === "visibility") {
          // Enable imgs again
          if (isDomElem(img)) {
            lightboxes.forEach((item) => item.classList.remove("disabled"));
          }

          overlay.remove();
        }
      });
    });
  }
};

//// Logic

const lightboxes = createArr(
  document.querySelectorAll("img[data-simple-lightbox]")
);

if (isArr(lightboxes) && lightboxes.length > 0) {
  lightboxes.forEach((item) => {
    item.addEventListener("click", (e) => {
      const path = e.target.getAttribute("src");
      const caption = e.target.getAttribute("title");

      //// Disabled
      lightboxes.forEach((item) => item.classList.add("disabled"));

      //// Create

      // Overlay
      createElem("overlay", "body", ["overlay", "simple-lightbox"]);

      // Figure
      createElem("figure", ".overlay", ["overlay__image"]);

      // Img
      createElem("img", ".overlay__image", [], [{ src: path }]);

      // Caption
      createElem("figcaption", ".overlay__image", ["caption"], [], caption);

      // Close
      createElem("span", ".overlay__image", ["close"], [], "x");

      // Delete Func
      deleteElem();
    });
  });
}
