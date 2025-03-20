
document.addEventListener("DOMContentLoaded", function() {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    images[i].setAttribute('loading', 'lazy');
  }
});




class LightBoxImage extends HTMLElement {
  get dialog() {
    const attr = this.getAttribute("dialog-id");
    return document.getElementById(attr);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.image = this.querySelector("img");
    this.shadowRoot.innerHTML = this.setupToggle();
    this.toggle = this.shadowRoot.querySelector("button");
    this.toggle.addEventListener("click", this);
    this.dialog.addEventListener("click", this);
    this.dialog.addEventListener("cancel", this);
  }

  setupToggle() {
    return `
      <style>
        button {
          all: unset;
          outline: revert;
          display: grid;
          grid-template-areas: "box";
        }
        button > * {
          grid-area: box;
        }
        img {
          max-width: 100%;
          height: auto;
          visibility: hidden;
        }
      </style>
      <button aria-label="Open lightbox">
        ${this.image.outerHTML}
        <div>
          <slot></slot>
        </div>
      </button>
    `;
  }

  handleEvent(e) {
    this[`on${e.type}`](e);
  }

  onclick(e) {
    if (e.currentTarget === this.toggle) {
      this.moveImage(() => this.moveImageToTarget());
    }

    if (e.currentTarget === this.dialog) {
      this.dialogCallback(e);
    }
  }

  // Handle "escape" key dialog event
  oncancel(e) {
    this.dialogCallback(e);
  }

  dialogCallback(e) {
    if (this.dialog.contains(this.image)) {
      e.preventDefault();
      this.moveImage(() => this.moveImageBack());
    }
  }

  moveImage(fn) {
    if (!document.startViewTransition) {
      fn();
    } else {
      this.handleViewTransition(fn);
    }
  }

  async handleViewTransition(fn) {
    this.image.style.viewTransitionName = "active-lightbox-image";

    const transition = document.startViewTransition(() => fn());

    try {
      await transition.finished;
    } finally {
      this.image.style.removeProperty("view-transition-name");
    }
  }

  moveImageToTarget() {
    this.dialog.append(this.image);
    this.dialog.showModal();
  }

  moveImageBack(e) {
    this.append(this.image);
    this.dialog.close();
  }
}

customElements.define("lightbox-image", LightBoxImage);
   

// JavaScript Document
// Claudio Gomboli . the EGGS LAB
// 2012 / 8 / 29
// Responsive animated gallery

$('.portfolio').each(function(index)
{
    $(this).attr('id', 'img' + (index + 1));
});
    
$('.portfolio').each(function(){
  $('#navi').append('<div class="circle"></div>');
});
  
$('.circle').each(function(index)
{
    $(this).attr('id', 'circle' + (index + 1));
});   
   
$('.portfolio').click(function(){
if($(this).hasClass('opened')){
    $(this).removeClass('opened');
    $(".portfolio").fadeIn("fast");
    $(this).find('.ombra').fadeOut();
    $("#navi div").removeClass("activenav");
}
else{
	var indexi = $("#maincontent .portfolio").index(this) + 1;
    $(this).addClass('opened'); 
    $(".portfolio").not(this).fadeOut("fast");
    $(this).find('.ombra').fadeIn();
    $("#circle" + indexi).addClass('activenav'); 
}
});	

//navi buttons
$("#navi div").click(function() {
if($(this).hasClass("activenav")){
	return false;
}
		
	$("#navi div").removeClass("activenav");
	$(".portfolio").removeClass('opened');
	$(".portfolio").show();
        $('.ombra').hide();
		
	var index = $("#navi div").index(this) + 1;
	$("#img" + index).addClass('opened'); 
    $(".portfolio").not("#img" + index).fadeOut("fast");
    $("#img" + index).find('.ombra').fadeIn();
        
    $(this).addClass("activenav");
});