var $lightboxes = document.querySelectorAll("img[data-simple-lightbox]");
if($lightboxes){
    $lightboxes.forEach((lightbox) => {
        lightbox.addEventListener("click", (e)=> {
            // create
            let caption = e.target.getAttribute("title");
            const lightboxId = Math.floor(Math.random() * 1000000); 
            let imgPath = e.target.getAttribute("src");
            let $figure = document.createElement("figure");
            let $img = document.createElement("img");
            let $body = document.querySelector("body");
            let $overlay = document.createElement("div");
            let $close = document.createElement("span");
            // config
            let overlayClasses = ["overlay", "simple-lightbox"];
            $overlay.classList.add(...overlayClasses);
            $close.innerHTML = "x";
            $close.classList.add("close");
            if(lightboxId){
                $close.setAttribute("id", "close-" + lightboxId);
                $overlay.setAttribute("id", "lightbox-" + lightboxId);
            }
            if(imgPath){
                $img.setAttribute("src", imgPath);
            }
            let $figCaption = document.createElement("figcaption");
            $figCaption.innerHTML = caption;
            $figCaption.classList.add("caption");
            // insert
            $figure.insertAdjacentElement("beforeend", $img);
            if(caption){
                $figure.insertAdjacentElement("beforeend", $figCaption);
            }
            $figure.insertAdjacentElement("beforeend", $close);
            $overlay.insertAdjacentElement("beforeend", $figure);
            $body.insertAdjacentElement("beforeend", $overlay);
            // close
            let $lightbox = document.querySelector("#lightbox-" + lightboxId);
            $lightbox.addEventListener("click", (e) => {
                if(e.target.tagName !== "IMG"){
                    $lightbox.classList.add("overlay--close");
                    $lightbox.addEventListener("transitionend", (e) => {
                        if(e.propertyName === "visibility"){
                            $lightbox.remove();
                        }
                    });                    
                }
            });
        });
    });
}