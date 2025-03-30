   




   
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
   
   
    //Shuffle Carousel
    const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let intervalId;

carouselItems[currentSlide].classList.add('active');

intervalId = setInterval(() => {
  carouselItems[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % carouselItems.length;
  carouselItems[currentSlide].classList.add('active');
}, 3000);

prevBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  carouselItems[currentSlide].classList.remove('active');
  currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
  carouselItems[currentSlide].classList.add('active');
  setTimeout(() => {
    intervalId = setInterval(() => {
      carouselItems[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % carouselItems.length;
      carouselItems[currentSlide].classList.add('active');
    }, 3000);
  }, 1000);
});

nextBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  carouselItems[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % carouselItems.length;
  carouselItems[currentSlide].classList.add('active');
  setTimeout(() => {
    intervalId = setInterval(() => {
      carouselItems[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % carouselItems.length;
      carouselItems[currentSlide].classList.add('active');
    }, 3000);
  }, 1000);
});


document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });
  
  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');
  
  listView.addEventListener('click', function () {
    gridView.classList.remove('active');
    listView.classList.add('active');
    projectsList.classList.remove('jsGridView');
    projectsList.classList.add('jsListView');
  });
  
  gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    listView.classList.remove('active');
    projectsList.classList.remove('jsListView');
    projectsList.classList.add('jsGridView');
  });
  
  document.querySelector('.messages-btn').addEventListener('click', function () {
    document.querySelector('.messages-section').classList.add('show');
  });
  
  document.querySelector('.messages-close').addEventListener('click', function() {
    document.querySelector('.messages-section').classList.remove('show');
  });
});



// Animate cards on scroll
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in-view');
    }
  });
}, {
  threshold: 0.5,
});

cards.forEach((card) => {
  observer.observe(card);
});

        
    function toggleMenu() {
        var menuContent = document.getElementById("menuContent");
        if (menuContent.style.display === "block") {
            menuContent.style.display = "none";
        } else {
            menuContent.style.display = "block";
        }
    }

    function localSearch() {
        var input, filter, sections, paragraphs, i, j, txtValue;
        input = document.getElementById('searchBar');
        filter = input.value.toLowerCase();
        sections = document.querySelectorAll('section');
        for (i = 0; i < sections.length; i++) {
            paragraphs = sections[i].getElementsByTagName('p');
            for (j = 0; j < paragraphs.length; j++) {
                txtValue = paragraphs[j].textContent || paragraphs[j].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    paragraphs[j].style.display = "";
                    paragraphs[j].innerHTML = txtValue.replace(new RegExp(filter, "gi"), match => `<span class="highlight">${match}</span>`);
                } else {
                    paragraphs[j].style.display = "none";
                }
            }
        }
    }
    
        // typewriter
    const typedText = document.querySelector('.typed-text');
const text = 'GLOBAL PARLIAMENTARY FINANCE CAMPAIGN FOR MABIRIZI EMMANUEL';
let index = 0;

function typeWriter() {
  typedText.textContent += text[index];
  index++;
  if (index === text.length) {
    clearInterval(intevalId);
  }
}
const intevalId = setInterval(typeWriter, 210);

  //To Top button function
var backBtn = document.querySelector(".back-btn");
window.addEventListener("scroll", function() {
if (this.pageYOffset > 100) {
backBtn.classList.add("active");
} else {
backBtn.classList.remove("active");
}
});
backBtn.addEventListener("click", function() {
window.scrollTo({
top: 0,
behavior: 'smooth'
})
});
//Time
     function showTime() {
      let date = new Date();
      let h = date.getHours(); 
      let m = date.getMinutes(); 
      let s = date.getSeconds(); 
      let session = "AM";

      if(h == 0){
        h = 12;
      }

      if(h > 12){
        h = h - 12;
        session = "PM";
      }

      h = (h < 10) ? "0" + h : h;
      m = (m < 10) ? "0" + m : m;
      s = (s < 10) ? "0" + s : s;

      let time = h + ":" + m + ":" + s + " " + session;
      document.getElementById("clock").innerText = time;
      document.getElementById("clock").textContent = time;

      setTimeout(showTime, 1000);
    }
    

    showTime();
    //Greetimgs
    const greetingElement = document.getElementById('greeting');
    function updateGreeting() {
      const currentHour = new Date().getHours();
      let greeting;
      if (currentHour >= 0 && currentHour < 6) {
        greeting = 'Good night!'+" ";
      } else if (currentHour >= 6 && currentHour < 12) {
        greeting = 'Good morning!'+" ";
      } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good afternoon!'+" ";
      } else {
        greeting = 'Good evening!'+" ";
      }
      greetingElement.textContent = greeting;
    }
    updateGreeting();
    setInterval(updateGreeting, 3600000);
    const tim = new Date();
        const date =document.getElementById('date').innerHTML=
"Date Today is:"+" "+tim;
    
    // PDF Viewer Functions
    function openPDF(pdfUrl) {
      const pdfFrame = document.getElementById('pdfFrame');
      pdfFrame.src = pdfUrl;
      document.getElementById('overlay').classList.add('show');
      document.getElementById('pdfViewer').classList.add('show');
    }

    function closePDF() {
      const pdfFrame = document.getElementById('pdfFrame');
      pdfFrame.src = ""; // Clear iframe source for performance
      document.getElementById('overlay').classList.remove('show');
      document.getElementById('pdfViewer').classList.remove('show');
    }

    // Social Media Share Functions
    function shareToTwitter() {
      const url = "https://mabiriziemmanuel.com";
      const text = "Check out our platform!";
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    }

    function shareToFacebook() {
      const url = "https://mabiriziemmanuel.com";
      window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    }

    function shareToWhatsApp() {
      const url = "https://mabiriziemmanuel.com";
      const text = "Check out our platform!";
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    }

    function shareToTelegram() {
      const url = "https://mabiriziemmanuel.com";
      const text = "Check out our platform!";
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
    }

    // Share Content from Preview
    function toggleDropdown() {
  const dropdown = document.getElementById("shareDropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function shareToWhatsApp() {
  const url = "https://mabiriziemmanuel.com";
  const text = "Check out this amazing platform!";
  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
}

function shareToTwitter() {
  const url = "https://mabiriziemmanuel.com";
  const text = "Check out this amazing platform!";
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
}

function shareToFacebook() {
  const url = "https://mabiriziemmanuel.com";
  window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
}

function shareToTelegram() {
  const url = "https://mabiriziemmanuel.com";
  const text = "Check out this amazing platform!";
  window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
}
function shareContent(platform) {
  const url = "https://mabiriziemmanuel.com";
  const text = "Check out this amazing platform!";
  const image = "https://mabiriziemmanuel.github.io/profile-pic.jpg"; // Hosted image URL

  let shareURL = "";

  switch (platform) {
    case 'WhatsApp':
      shareURL = `https://wa.me/?text=${encodeURIComponent(text)}%0A${encodeURIComponent(url)}%0A${encodeURIComponent(image)}`;
      break;
    case 'Twitter':
      shareURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      break;
    case 'Facebook':
      shareURL = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case 'Telegram':
      shareURL = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      break;
  }

  window.open(shareURL, "_blank");
}