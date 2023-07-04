import { projects } from "./projects.js";
import { lerp } from "./utils.js";


const content = document.querySelector(".content");
const contentImage = document.querySelector(".content__main__img");
const contentHeader = document.querySelector(".content__header");
const contentText = document.querySelector(".content__text");
const contentClose = document.querySelector(".close");
const container = document.querySelector(".container");
const columns = [...document.querySelectorAll(".column")];


let projectsArray = [];
let animating = true;

class Project{
  constructor (image, idx, title, content){
    this.image = image;
    this.idx = idx;
    this.title = title;
    this.content = content;

    this.active = false;
    this.createItem();
  }

  createItem(){
    this.gridItem = document.createElement('div');
    this.gridItem.classList.add('item');
    this.img = document.createElement('img');
    this.img.src = this.image;
    this.gridItem.appendChild(this.img);
    let i = this.idx % columns.length;
    columns[i].appendChild(this.gridItem);
    this.gridItem.addEventListener('click', this.activate.bind(this))
  }

  activate(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.active = true;
    animating = false;

    for(let i =0; i< projectsArray.length; i++){
      if(projectsArray[i].idx !== this.idx){
        projectsArray[i].gridItem.style.opacity = 0;
      }
    }

    let {left, top, width, height} = this.gridItem.getBoundingClientRect();
    let x = (window.innerWidth / 2) - (left + (width / 2));
    let y = (window.innerHeight / 2) - (top + (height / 2)) - (window.innerHeight * .1);
    if(this.active){
      this.gridItem.style.transform = `translate3d(${x}px, ${y}px, 0) scale(4)`;
      contentHeader.innerHTML = '';
      contentText.innerHTML = '';
      contentImage.src = this.image;

      let header = document.createElement('h1');
      header.textContent = this.title;
      contentHeader.appendChild(header);

      for(let i = 0; i < this.content.length; i++){
        let text = document.createElement('p');
        text.textContent = this.content[i];
        contentText.appendChild(text);
      }

      setTimeout(() => {
        content.classList.add('active');
      }, 500)
    }
  }

  deactivate(){
    this.active = false;
    this.gridItem.style.transform = `translate3d(0px, 0px, 0) scale(1)`;
    this.gridItem.style.opacity = 1;
  }
}

projects.forEach((project, idx) => {
  
  let newProject = new Project(project.image, idx, project.title, project.content);
  projectsArray.push(newProject)
})


contentClose.addEventListener('click', () =>{
  content.classList.remove('active');
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  setTimeout(() => {
    animating = true;
  }, 500)

  for(let i = 0; i < projectsArray.length; i++){
    projectsArray[i].deactivate()
  }

})

let mouseCoordinates = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
}

window.addEventListener('mouseover', (e) =>{
  console.log(e)
  mouseCoordinates.targetX = (e.clientX - (window.innerWidth / 2))
  mouseCoordinates.targetY = (e.clientY - (window.innerHeight / 2))
})

function animate(){
  console.log('outside ifff')
  if(animating){
    console.log('inside ifff')
    mouseCoordinates.x = lerp(mouseCoordinates.x, mouseCoordinates.targetX, .075);
    mouseCoordinates.y = lerp(mouseCoordinates.y, mouseCoordinates.targetY, .075);
    let {x,y} = mouseCoordinates;
    container.style.transform = `translate3d(${-x}px, ${-y}px, 0)`
  }
  window.requestAnimationFrame(animate)
}

animate();



const blobCursor = function() {
    const cursor = document.querySelector('#cursor-blob');
    const link = document.querySelector('.link');
    
    const setCursorPos = (e) => {
      let posX = e.pageX;
      let posY = e.pageY;
      
      cursor.style.top = posY - (cursor.offsetHeight/2) + 'px';
      cursor.style.left = posX - (cursor.offsetWidth/2) + 'px';
    }
    
    document.addEventListener('mousemove', setCursorPos);
    
    const setCursorHover = function() {
      cursor.style.transform = 'scale(2.0)';
    }
    const removeCursorHover = function() {
      cursor.style.transform = '';
    }
    
    link.addEventListener('mouseover', setCursorHover);
    link.addEventListener('mouseleave', removeCursorHover);
  }
  
  blobCursor();


  //update this with your $form selector
  var form_id = "jquery_form";

  var data = {
      "access_token": "ocnhkl8pvs9r0go38iyw4owi"   // Dev's
  };

  function onSuccess() {
      sendButton.val('Send');
      sendButton.prop('disabled', false);
  }

  function onError(error) {
      sendButton.val('Send');
      sendButton.prop('disabled', false);
  }

  var sendButton = $("#" + form_id + " [name='send']");

  function send() {
      sendButton.val('Sending…');
      sendButton.prop('disabled', true);

      var subject = "Notification from personal website!";
      var message = $("#" + form_id + " [name='text']").val();
      var address = $("#" + form_id + " [name='extra_address']").val();
      var email = $("#" + form_id + " [name='extra_email']").val();

      data['subject'] = subject;
      data['text'] = message;
      data['extra_address'] = address;
      data['extra_email'] = email;

      $.post('https://postmail.invotes.com/send',
          data,
          onSuccess
      ).fail(onError);

      return false;
  }

  sendButton.on('click', send);

  var $form = $("#" + form_id);

  $form.submit(function (event) {
      event.preventDefault();
  });


//   gsap.to("#typewriter", {
//     text: "Hello, Welcome to my page.",
//     duration: 3,
//     ease: "power1.in",
//     repeat: 1000,
//     cursor: true,
//     yoyo: true
//   });

  var tl = new TimelineMax({
    paused:true
  });
  // letter animation
  tl.fromTo(".anim-typewriter", 8, {
    width: "0",
  }, {
    width: "15.6em", /* same as CSS .line-1 width */
    ease:  SteppedEase.config(37)
  }, 0);
  // text cursor animation
  tl.fromTo(".anim-typewriter", 0.5, {
    "border-right-color": "#F8CB54"
  }, {
    "border-right-color": "#F8CB54",
    repeat: -1,
    ease:  SteppedEase.config(37)
  }, 0);
  
  tl.play();
  
 

