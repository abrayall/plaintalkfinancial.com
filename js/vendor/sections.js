// // ------------------------------------------------------------------
// // Base JS
// // ------------------------------------------------------------------

// // ------------------------------------------------------------------
// // Scroll Reveal
// // Creation Date: 6/22/2021
// // Last Updated: 8/27/2021
// // Description: Javascript to check if an element is visible.  If 
// // visible scrolling down or up, add visible class to enables the css
// // animation on the section.
// // ------------------------------------------------------------------
if (!('IntersectionObserver' in window) || !('IntersectionObserverEntry' in window) || !('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
  //On load, scroll, or resize.  Do this.
  ["load", "resize", "scroll"].forEach(function (evt) {
    window.addEventListener(evt, scrollRevealElement('.dev-scrollIn'));
  });
}
else {
  //Intersection Observer Scroll Reveal
  //Intersection Observer options
  var scrollOptions = {
    rootMargin: '-100px 0px'    
  };

  //Find all sections to do a scroll in effect
  var targets = document.querySelectorAll('.dev-scrollIn');

  //Observe the targets
  var scrollReveal = function (target) {
    var scrollObserver = new IntersectionObserver( function(entries,observer) {
        entries.forEach(function callbackFN(entry) {
            //Once visible
            if(entry.isIntersecting){
                entry.target.classList.add('visible'); //Add visible class to section
                observer.disconnect(); //Stop observing that section
            }
        })
    }, scrollOptions);

    scrollObserver.observe(target);
  }

  targets.forEach(scrollReveal);
}

//Older Browser Support - Scroll Reveal
function scrollRevealElement(section){
  var elements = document.querySelectorAll(section);
  if(elements.length == 1){
    var element = document.querySelector(section);
      if(checkVisible(element)){
          element.classList.add('visible');
      }
  }
  if(elements.length > 1){
    var i = 0;
    for(i = 0; i < elements.length; ++i){
      if(checkVisible(elements[i])){
        elements[i].classList.add('visible');
      }
    }
  }
}

function checkVisible(element) {
  var elementBuffer = 75;
  var bottom = window.innerHeight; //window bottom is set to be the height of the window
  var dimensions = element.getBoundingClientRect(); //dimensions of element
  var elementTop = dimensions.top;
  var elementBottom = element.clientHeight + elementTop; 
  if(elementTop >= 0 && elementTop <= bottom - elementBuffer || elementBottom >= elementBuffer && elementBottom <= bottom){
    return 1; //element is visible
  }
  else {
    return 0;
  }
}

// // ------------------------------------------------------------------
// // Box Sections
// // ------------------------------------------------------------------

// // ------------------------------------------------------------------
// // Clickable box Section
// // Creation Date: 6/18/2021
// // Last Updated: 10/4/2022
// // Description: Used with any box section.  Takes the "Learn more" btn
// // link and wraps it around box section.  Hides the "Learn more" btn.
// // ------------------------------------------------------------------
$('.dev-boxes-Clickable-Base .box').each(function(){
  var link = $(this).find('.c-box__btn').attr('href');
  if(link){
    var target = $(this).find('.c-box__btn').attr('target') || '_self';
    $(this).wrapInner('<a href="'+ link +'" class="wrappedBoxLink" target="' + target + '"/>');
  }
});

// // ------------------------------------------------------------------
// // Clickable box Section with background Full width and images
// // Creation Date: 6/18/2021
// // Last Updated: 4/20/2021
// // Description: Used with any box section and the clickable base. 
// // Boxes have a background around them.  Full width boxes
// // ------------------------------------------------------------------
$('.dev-boxes-Clickable-FullImages .box.Image').each(function(){
  var imageSrc = $(this).find('.c-box-image img').attr('src');
  if(imageSrc){
    $(this).css('background-image', 'url(' + imageSrc + ')');
    $(this).find('.c-box-image').hide();
  }
});

// // ------------------------------------------------------------------
// // Vertical Tab Content
// // Creation Date: 3/23/2021
// // Last Updated: 3/23/2021
// // Description: Tab section that filters through an image and text on click.
// // Only 1 section like this will appear per page.  Put .dev-boxes-TabContents
// // in a 2-4 box section.  You can do multiple box sections.  All box items will
// // be combined into the first section.  Deletes the other sections.  
// // ------------------------------------------------------------------

//Allow only one of these tab sections to exist per page
//Setup left and right structure
$('.dev-boxes-TabContents .o-grid__collapse').first().prepend('<div class="tabNavigation"></div>');

//Insert All boxes into container
$('.dev-boxes-TabContents .o-grid__collapse').first().append($('.dev-boxes-TabContents .box'));

//Determine how many sections of these there are.
var numTabSections = $('.dev-boxes-TabContents').length;
if(numTabSections > 1){
  var itr = 1;
  for(itr = 1; itr < numTabSections; ++itr){
    $('.dev-boxes-TabContents').eq(itr).remove();
  }
}

//Dynamically create tab nav
$('.dev-boxes-TabContents .box').each(function(){
  var tabName = $(this).find('.c-box__title').text();
  $('.dev-boxes-TabContents .tabNavigation').append('<div class="tabNavItem"><p>'+ tabName +'</p></div>');
});

//On click function
$('.dev-boxes-TabContents .tabNavigation .tabNavItem').click(function(){
  //Remove all selected classes
  $('.dev-boxes-TabContents .tabNavigation .tabNavItem').removeClass('currentTab');
  $('.dev-boxes-TabContents .box').removeClass('selectedBox');

  //Get index of item clicked
  var index = $('.dev-boxes-TabContents .tabNavigation .tabNavItem').index(this);

  //Activate selected items
  $(this).addClass('currentTab');
  $('.dev-boxes-TabContents .box').eq(index).addClass('selectedBox');
});

//Click first item
$('.dev-boxes-TabContents .tabNavigation .tabNavItem').eq(0).addClass('currentTab');
$('.dev-boxes-TabContents .box').eq(0).addClass('selectedBox');

// // ------------------------------------------------------------------
// // Flip Cards
// // Creation Date: 4/28/2021
// // Last Updated: 4/28/2021
// // Description: Use a box section.
// // Card flips from back to front on hover. 
// // Change the image quality to original so you can fit the whole image
// // Give the section the dev-flipCards class
// // ------------------------------------------------------------------

$('.dev-boxes-FlipCards .box, .dev-boxes-FlipCards-lightOverlay .box, .dev-boxes-FlipCards-noOverlay .box').each(function(){
  $(this).find('.c-section-boxes__inner-box').append('<div class="flipCardFront"></div><div class="flipCardBack"></div>');
  if($(this).hasClass('Image')){
    var flipcardImg = $(this).find('.c-section-boxes__inner-box img').attr('src');
    $(this).find('.c-section-boxes__inner-box .flipCardFront').css('background-image', 'url(' + flipcardImg + ')');
  }

  if($(this).hasClass('Icon')){
    $(this).find('.c-section-boxes__inner-box .c-box__icon').appendTo($(this).find('.c-section-boxes__inner-box .flipCardFront'));
  }
  
  $(this).find('.c-section-boxes__inner-box .c-box__title').appendTo($(this).find('.c-section-boxes__inner-box .flipCardFront'));
  $(this).find('.c-section-boxes__inner-box .c-box__title').clone().appendTo($(this).find('.c-section-boxes__inner-box .flipCardBack'));
  $(this).find('.c-section-boxes__inner-box .c-box__paragraph').appendTo($(this).find('.c-section-boxes__inner-box .flipCardBack'));
  $(this).find('.c-section-boxes__inner-box .c-btn').appendTo($(this).find('.c-section-boxes__inner-box .flipCardBack'));
});

$('.dev-boxes-FlipCards .box, .dev-boxes-FlipCards-lightOverlay .box, .dev-boxes-FlipCards-noOverlay .box').click(function(){
  $(this).parent().find('.clickFlip').not(this).removeClass('clickFlip');
  $(this).toggleClass('clickFlip');
});


// // ------------------------------------------------------------------
// // Boxes with Text intro and then regular boxes
// // Creation Date: 6/18/2021
// // Last Updated: 6/18/2021
// // Description: Using a box section, this section has intro text and 
// // regular boxes.  First box is just text.  The other boxes are normal
// // ------------------------------------------------------------------

$('.dev-boxes-ContentBoxes .box .c-section-boxes__inner-box').each(function(){
  $(this).addClass('content-box');
  $(this).find('.c-btn').append('<i class="fa fa-plus"/>');
});
$('.dev-boxes-ContentBoxes-Special .box .c-section-boxes__inner-box').first().removeClass('content-box');

// // ------------------------------------------------------------------
// // Boxes with Text intro and then regular boxes
// // Creation Date: 6/18/2021
// // Last Updated: 1/31/2022
// // Description: Using a box section, this section has intro text and 
// // regular boxes.  First box is just text.  The other boxes are normal
// // Used on Burbank hero section
// // ------------------------------------------------------------------

//Burbank Hero section
$('.dev-boxes-ImgAndBoxes .box').each(function(){
  $(this).find('.c-box-image img').prependTo($(this).find('.c-section-boxes__inner-box'));
  $(this).find('.c-box-image').remove();
});

// // ------------------------------------------------------------------
// // Testimonial Rotator
// // Created: 7/6/2022
// // Last Updated: 1/31/2023
// // Description: An image to the right and an overlapping text rotator
// // ------------------------------------------------------------------

//Check to see if the section exists
if($('.dev-boxes-RotatorBase').length){
  //Check to see if we need to add any additional boxes to main rotator
  if($('.dev-boxes-RotatorBase-Additional').length){
    $('.dev-boxes-RotatorBase-Additional .box').removeAttr('id');
    $('.dev-boxes-RotatorBase-Additional .box').appendTo('.dev-boxes-RotatorBase .o-grid__collapse');
    $('.dev-boxes-RotatorBase-Additional').remove();
  }

  let slideMin = 2;

  if($('.dev-boxes-RotatorBase .box').length >= slideMin){
    const rotatorBase = new CustomRotator('.dev-boxes-RotatorBase', slideMin, 7000);

    rotatorBase.setup();
    rotatorBase.runRotator();
  }
}

//Custom Rotator Constructor
function CustomRotator(rotatorClassSelector, minSlideNum = 2, time = 7000){
  this.rotatorSelector = rotatorClassSelector;
  this.minNum = minSlideNum;
  this.intervalTime = time;
  this.slides = document.querySelectorAll(this.rotatorSelector + ' .box');
  this.slideNum = this.slides.length;
  this.currentSlide = 0;
  this.prevSlide = 0;
  this.nextSlide = 0;
  this.left = null;
  this.right = null;
  this.play= null;
  this.pause = null;
  this.timer = null;

  this.setup = function(){
    if(this.slideNum >= this.minNum){
      this.currentSlide = 0;
      this.prevSlide = this.slideNum - 1;
      this.nextSlide = 1;

      //Setup Rotator
      this.slides[this.prevSlide].classList.add('prevSlide');
      this.slides[this.currentSlide].classList.add('currentSlide');
      this.slides[this.nextSlide].classList.add('nextSlide');

      //Setup Navigation
      document.querySelector( this.rotatorSelector + ' .o-grid__collapse').insertAdjacentHTML('afterend', '<div class="rotatorNav"><i class="fa fa-chevron-left leftArrow-Rotator" aria-hidden="true"></i><i class="fa fa-play hiddenIcon playBtn-Rotator" aria-hidden="true"></i><i class="fa fa-pause pauseBtn-Rotator" aria-hidden="true"></i><i class="fa fa-chevron-right rightArrow-Rotator" aria-hidden="true"></i></div>');

      //Activate arrows to move left and right
      this.left = document.querySelector(this.rotatorSelector  + ' .leftArrow-Rotator'); //left button
      this.right = document.querySelector(this.rotatorSelector  + ' .rightArrow-Rotator'); //right button
      this.left.addEventListener('click', this.leftButton);
      this.right.addEventListener('click', this.rightButton);

      //Activate Pause and Play
      this.pause = document.querySelector(this.rotatorSelector  + ' .pauseBtn-Rotator'); //pause button
      this.play = document.querySelector(this.rotatorSelector  + ' .playBtn-Rotator'); //play button
      this.pause.addEventListener('click', this.pauseRotator);
      this.play.addEventListener('click', this.runRotator);
    }
  }

  this.runRotator = function () {
    //Set time and interval
    this.timer = setInterval(this.iterateUp, this.intervalTime);
    this.play.classList.add('hiddenIcon');
    this.pause.classList.remove('hiddenIcon');
  }.bind(this);

  this.pauseRotator = function () {
    clearInterval(this.timer);
    this.pause.classList.add('hiddenIcon');
    this.play.classList.remove('hiddenIcon');
  }.bind(this);

  //Function to increment through slides
  this.iterateUp = function() {
    this.slides[this.prevSlide].classList.remove('prevSlide');
    this.slides[this.nextSlide].classList.remove('nextSlide');
    this.slides[this.currentSlide].classList.remove('currentSlide'); //remove from current slide 
    this.currentSlide++; //increment currentSlide
    this.prevSlide++; //increment prevSlide
    this.nextSlide++; //increment nextSlide
    if (this.currentSlide >= this.slideNum) { //if the last slide
      this.currentSlide = 0;
    }
    if (this.prevSlide >= this.slideNum) { //if the last slide
      this.prevSlide = 0;
    }
    if (this.nextSlide >= this.slideNum) { //if the last slide
      this.nextSlide = 0;
    }
    this.slides[this.prevSlide].classList.add('prevSlide');
    this.slides[this.currentSlide].classList.add('currentSlide');
    this.slides[this.nextSlide].classList.add('nextSlide');
  }.bind(this);

  //Function to decrement through slides
  this.iterateDown = function() {
    this.slides[this.prevSlide].classList.remove('prevSlide');
    this.slides[this.nextSlide].classList.remove('nextSlide');
    this.slides[this.currentSlide].classList.remove('currentSlide'); //remove from current slide 
    if (this.currentSlide <= 0) { //if the last slide
      this.currentSlide = this.slideNum;
    }
    if (this.prevSlide <= 0) { //if the last slide
      this.prevSlide = this.slideNum;
    }
    if (this.nextSlide <= 0) { //if the last slide
      this.nextSlide = this.slideNum;
    }
    this.currentSlide--; //decrement currentSlide
    this.prevSlide--; //decrement prevSlide
    this.nextSlide--; //decrement nextSlide
    this.slides[this.currentSlide].classList.add('currentSlide');
    this.slides[this.prevSlide].classList.add('prevSlide');
    this.slides[this.currentSlide].classList.add('currentSlide');
    this.slides[this.nextSlide].classList.add('nextSlide');
  }.bind(this);

  //Function to go decrement slides when clicked on left arrow
  this.leftButton= function() {
    if(this.play.classList.contains("hiddenIcon")){
      clearInterval(this.timer);
      this.iterateDown();
      this.timer = setInterval(this.iterateUp, this.intervalTime);
    }
    else {
      this.iterateDown();
    }
  }.bind(this);

  //Function to go increment slides when clicked on right arrow
  this.rightButton = function() {
    if(this.play.classList.contains("hiddenIcon")){
      clearInterval(this.timer);
      this.iterateUp();
      this.timer = setInterval(this.iterateUp, this.intervalTime);
    }
    else {
      this.iterateUp();
    }
  }.bind(this);
};

//Client Stories
$('.dev-boxes-Stories .box').each(function(){
  $(this).find('.c-section-boxes__inner-box .c-box__title, .c-section-boxes__inner-box .c-box__paragraph, .c-section-boxes__inner-box .c-btn').wrapAll('<div class="boxContent" />');
});

// // ------------------------------------------------------------------
// // 3D Image Box Rotator
// // Creation Date: 5/26/2021
// // Last Updated: 1/31/2023
// // Description: Using a box section, this code tranforms it into a rotator.
// // Only one per page.  A minimum of 3 boxes.  No max.  To add additional
// // boxes to the rotator, put "boxes-Rotator3D-Additional" as the section class.
// // Automatically rotates.  Has arrows and a play and a pause button.
// // Use with image boxes.  
// // ------------------------------------------------------------------
//Check to see if the section exists
if($('.dev-boxes-Rotator3D').length){
  //Check to see if we need to add any additional boxes to main rotator
  if($('.dev-boxes-Rotator3D-Additional').length){
    $('.dev-boxes-Rotator3D-Additional .box').removeAttr('id');
    $('.dev-boxes-Rotator3D-Additional .box').appendTo('.dev-boxes-Rotator3D .o-grid__collapse');
    $('.dev-boxes-Rotator3D-Additional').remove();
  }

  let slideMin = 3;

  if($('.dev-boxes-Rotator3D .box').length >= slideMin){
    const rotatorBase = new CustomRotator('.dev-boxes-Rotator3D', slideMin, 7000);
    rotatorBase.setup();
    $('.dev-boxes-Rotator3D .rotatorNav').addClass('rotator3DNav');
    rotatorBase.runRotator();
  }
}


// // ------------------------------------------------------------------
// // Homepage Fancy Boxes
// // Creation Date: 4/28/2021
// // Last Updated: 4/28/2021
// // Description: Use section boxes and add class "fancy-boxes".
// // Please use with the accompanied javascript in the javascript file
// // ------------------------------------------------------------------
$(function () {
  $('.dev-fancy-boxes .c-grid__collapse--Boxes').prepend('<div class="fancy-wrapper" />');
  $('.dev-fancy-boxes .fancy-wrapper').append('<div class="fancy-img-container" />');
  $('<div class="fancy-accordion" />').insertAfter('.dev-fancy-boxes .fancy-img-container');
  var $initImg = $('.dev-fancy-boxes .box:first .c-box-image img').attr("src");
  // $('.dev-fancy-boxes .fancy-wrapper .fancy-img-container').css('background-image', 'url(' + $initImg + ')');
  $('.dev-fancy-boxes .box').each(function( e ) {
    var $title = $(this).find('.c-box__title').text();
    var $desc = $(this).find('.c-box__paragraph').text();
    var $btnText = $(this).find('.c-btn').text();
    var $btnLink = $(this).find('.c-btn').attr("href");
    var $img = $(this).find('img').attr("src");
    var $header = '<div class="fancy-title"><h2>'+ $title +'</h2></div>';
    var $body = '<div class="fancy-body">'+ $desc +'</div>';
    $('.dev-fancy-boxes .fancy-accordion').append('<div class="fancy-accordion-item fancy-item-'+ e +'" />');
    $('.fancy-item-'+ e).attr('data-img', $img);
    $('.fancy-item-'+ e).attr('data-id', e);
    $('.fancy-item-'+ e).html($header + '<div class="fancy-item-container"><div class="fancy-content" /></div>');
    $('.fancy-item-'+ e + " .fancy-content").html($body);
    $('.fancy-item-'+ e + " .fancy-content").append('<div class="fancy-btn"><a href="'+ $btnLink +'" class="">'+ $btnText +'</a></div>');
    $('<div class="fancy-img fancy-img-'+ e +'" style="background-image: url('+$img+');" />').appendTo('.fancy-img-container');
    $('.fancy-img-0').addClass("inframe");
    $(this).remove();
  });
  var h = $('.fancy-img-container').height() / $('.fancy-accordion-item').length;
  $('.dev-fancy-boxes .fancy-title').css("height", h+"px");

  //Click function
  $('.dev-fancy-boxes .fancy-title').click(function(){
    var $oldImg = $('.fancy-img.inframe').css('background-image');
    $('.dev-fancy-boxes .fancy-wrapper .fancy-img-container').css('background-image', $oldImg);
    var i = $(this).parent().attr('data-id');
    $('.fancy-img-container').eq(i).addClass("inframe");
    var displayedImg = $(this).parent().attr('data-img');
    if( $(this).parent().hasClass("active") ) {
      $(this).parent().removeClass("active");
      $('.dev-fancy-boxes .fancy-item-container').css("height", "0");
    } else {
      $('.dev-fancy-boxes .fancy-accordion-item').removeClass("active");
      $('.dev-fancy-boxes .fancy-item-container').css("height", "0");
      $(this).parent().addClass("active");
      var $cHeight = $(this).parent().find(".fancy-content").outerHeight();
      $(this).parent().find(".fancy-item-container").css("height", $cHeight);
    }
    $('.fancy-img').removeClass("inframe");
    $('.fancy-img-'+ i).addClass("inframe");
  });
});

// // ------------------------------------------------------------------
// // Selection Boxes
// // Creation Date: 9/20/2021
// // Last Updated: 9/20/2021 
// // ------------------------------------------------------------------

//Pre-setup
$('.dev-boxes-Selection .o-grid__collapse').first().prepend('<div class="tabNavigation"></div>');
$('.dev-boxes-Selection .o-grid__collapse').first().append($('.dev-boxes-Selection .box'));

//Determine how many sections of these there are.
var numTabSections = $('.dev-boxes-Selection').length;
if(numTabSections > 1){
  var itr = 1;
  for(itr = 1; itr < numTabSections; ++itr){
    $('.dev-boxes-Selection').eq(itr).remove();
  }
}

//Setup
$('.dev-boxes-Selection .box').each(function(){
  var tabName = $(this).find('.c-box__title').text();
  var tabContent = $(this).find('.c-box__title, .c-box__paragraph, .c-btn');
  $('.dev-boxes-Selection .tabNavigation').append('<div class="tabNavItem"><h3>'+ tabName +'</h3></div>');
  $(this).prepend('<div class="MobiletabNavItem"><h3>'+ tabName +'</h3></div>');
  $(tabContent).wrapAll('<div class="ContentWrapper"><div class="ContentInner"></div></div>');
});

// Add Toggles To Mobile Headers
var TabIcon = '<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>'
$('.dev-boxes-Selection .MobiletabNavItem').append('<div class="toggle">'+ TabIcon +'</div>');

 // Click Functions - Desktop
$('.dev-boxes-Selection .tabNavigation .tabNavItem').click(function(){
  //Remove all selected classes
  $('.dev-boxes-Selection .tabNavigation .tabNavItem').removeClass('active');
  $('.dev-boxes-Selection .box').removeClass('active');

  //Get index of item clicked
  var index = $('.dev-boxes-Selection .tabNavigation .tabNavItem').index(this);

  //Activate selected items
  $(this).addClass('active');
  $('.dev-boxes-Selection .box').eq(index).addClass('active');
});

 // Click Functions - Mobile
$('.dev-boxes-Selection .MobiletabNavItem').click(function(){
  $('.dev-boxes-Selection .box').removeClass('active');
  $(this).parent().toggleClass('active');
});

//Click first item
$('.dev-boxes-Selection .tabNavigation .tabNavItem').eq(0).addClass('active');
$('.dev-boxes-Selection .box').eq(0).addClass('active');



// // ------------------------------------------------------------------
// // Hover Boxes
// // Creation Date: 9/20/2021
// // Last Updated: 7/6/2022 
// // ------------------------------------------------------------------
$('.dev-boxes-HoverArrow .box').each(function(){
  var HoverTitle = $(this).find('.c-section-boxes__inner-box .c-box__title');
  var HoverText = $(this).find('.c-section-boxes__inner-box .c-box__paragraph');
  var HoverIcon = '<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>'

  $(this).find('.c-section-boxes__inner-box').append('<div class="ElevatorFront"></div>');
  $(HoverIcon).appendTo($(this).find('.c-section-boxes__inner-box .ElevatorFront'));
  $(HoverTitle).appendTo($(this).find('.c-section-boxes__inner-box .ElevatorFront'));
  $(HoverText).appendTo($(this).find('.c-section-boxes__inner-box .ElevatorFront'));
});

// // ------------------------------------------------------------------
// // Side by Side Image Text Sections
// // ------------------------------------------------------------------

// // ------------------------------------------------------------------
// // Fullwidth Image/Text Section
// // Creation Date: 2/18/2021
// // Last Updated: 4/20/2022
// // Description: Section needs to be an image text section (it applies to left and right)
// // The image is turned into a background image with javascript.  On mobile, it does the regular image.
// // Section can be as long as you want it.  Smallest is the size of the max section height.
// // ------------------------------------------------------------------
$('.dev-imgText-Fullsize, .dev-imgText-Fullsize-WithinContainer').each(function(){
  var imageSrc = $(this).find('.c-sxs__image img').attr('src');
  if(imageSrc){
    $($(this).find('.c-sxs__image')).css('background-image', 'url(' + imageSrc + ')');
    $(this).find('.c-image__crop').hide();
  }
});

$('.dev-imgText-Fullsize-WithFade').each(function(){
  var imageSrc = $(this).find('.c-sxs__image img').attr('src');
  if(imageSrc){
    $(this).css('background-image', 'url(' + imageSrc + ')');
    $(this).find('.c-image__crop').hide();
  }
});

// // ------------------------------------------------------------------
// // Super Sections
// // ------------------------------------------------------------------

// // ------------------------------------------------------------------
// // Supersection Fadein background
// // Creation Date: 3/31/2021
// // Last Updated: 4/12/2022
// // Description: Main section with the background image should have the class
// // name "backgroundFade-Base" added to th Custom CSS Settings.  This image will
// // create the fade in effect.  Only 1 per page.  Base is at the bottom of the other sections
// // Must be used with accompanying javascript.  
// // ------------------------------------------------------------------
if($('.dev-backgroundFade-Base').length){ //Only work if there is a base
  $('.dev-backgroundFade-Addition').wrapAll('<div class="superSection backgroundImage" />'); //Wrap all additions in supersection
  $('.dev-backgroundFade-Base').appendTo('.superSection.backgroundImage'); //Add base to super section
  $('.superSection.backgroundImage').prepend('<div class="backgroundImageEffect"></div>'); //Add image background to section
  var background = $('.superSection.backgroundImage .dev-backgroundFade-Base').css('background-image');
  $('.superSection.backgroundImage .dev-backgroundFade-Base').css('background-image', 'none');
  $('.superSection.backgroundImage .backgroundImageEffect').css('background-image', background);//Set background image for section
}

//Plain Up and Down Super section
$('.dev-superBackground').wrapAll('<div class="superSection superBackground superBackground1" />'); //Wrap all in supersection
$('.dev-superBackground2').wrapAll('<div class="superSection superBackground superBackground2" />'); //Wrap all in supersection
$('.dev-superBackground3').wrapAll('<div class="superSection superBackground superBackground3" />'); //Wrap all in supersection

$('.superSection.superBackground').each(function(){ 
  $(this).wrapInner('<div class="overlay superOverlay" />');
  $(this).find('.superOverlay').wrapInner('<div class="o-container superContainer" />');
  var background = $(this).find('.dev-backgroundImg').css('background-image');
  if(background){
    $(this).css('background-image', background);
    $(this).find('.dev-backgroundImg').css('background-image', 'none');
  }
});

//Side by side Super section
//Put into a super section
$('.dev-sideBySide-SuperSection').wrapAll('<div class="sideBySide-SuperSection"></div>');
$('.sideBySide-SuperSection').wrapInner('<div class="overlay superOverlay" />');
$('.sideBySide-SuperSection .superOverlay').wrapInner('<div class="o-container superContainer" />');
var superBackgroundImg = $('.sideBySide-SuperSection .dev-superBackground').css('background-image');
$('.sideBySide-SuperSection .dev-superBackground').css('background-image', 'none');
$('.sideBySide-SuperSection').css('background-image', superBackgroundImg);

//Yosemite hero

$('.dev-hero-Yosemite').wrapAll('<div class="superContainer-Yosemite" />');
$('.superContainer-Yosemite').wrapInner('<div class="overlay superOverlay" />');
$('.superContainer-Yosemite .superOverlay').wrapInner('<div class="o-container superContainer" />');
var superBackgroundImg = $('.superContainer-Yosemite .dev-hero-Yosemite-Background').css('background-image');
$('.superContainer-Yosemite .dev-hero-Yosemite-Background').css('background-image', 'none');
$('.superContainer-Yosemite').css('background-image', superBackgroundImg);

// // ------------------------------------------------------------------
// // Rotator Sections
// // ------------------------------------------------------------------

// // ------------------------------------------------------------------
// // Side By Side Quote Rotator Text Sections
// // Creation Date: 6/18/2021
// // Last Updated: 6/18/2021
// // Description: Takes a small rotator and a text section and combines
// // them into a section so the quote and text are on the same row.  
// // ------------------------------------------------------------------
var sxsQuoteNum = $('.dev-rotatorSideBySide-Quote').length; //Find number of side by side quote text sections there are
var textSectionNum = $('.dev-rotatorSideBySide-Text').length; //Find number of side by side text sections there are

//Go through and match sections to each other, one at a time.
var itr = 0;
for(itr = 0; itr < sxsQuoteNum; ++itr){
  if(textSectionNum > itr){
    $('.dev-rotatorSideBySide-Quote').eq(itr).wrap('<div class="dev-SideBySide-QuoteTextSuper" />');
    $('.dev-rotatorSideBySide-Text').eq(itr).appendTo($('.dev-SideBySide-QuoteTextSuper').eq(itr));
    //Check to see if the section needs to be reversed
    if($('.dev-rotatorSideBySide-Quote').eq(itr).hasClass('dev-reverseQuoteText') || $('.dev-rotatorSideBySide-Text').eq(itr).hasClass('dev-reverseQuoteText')){
      $('.dev-SideBySide-QuoteTextSuper').eq(itr).addClass('reverseQuoteText');
    }
    //Check to see if the section needs to be fullsized.
    if($('.dev-rotatorSideBySide-Quote').eq(itr).hasClass('dev-fullQuoteText') || $('.dev-rotatorSideBySide-Text').eq(itr).hasClass('dev-fullQuoteText')){
      $('.dev-SideBySide-QuoteTextSuper').eq(itr).addClass('fullQuoteText');
    }
  }
}

$('.dev-SideBySide-QuoteTextSuper').wrapInner('<div class="o-container superContainer" />');

//Check on which way the text box is
$('.dev-rotator-SxS-ImgText').each(function(){
  if($(this).find('.c-rotator-summary__box.c-rb-position--left').length){
    $(this).addClass('dev-reverseRotator');
  }
});

// // ------------------------------------------------------------------
// // Misc Sections
// // ------------------------------------------------------------------

// // ------------------------------------------------------------------
// // Accordion
// // Creation Date: 2/12/2021
// // Last Updated: 4/16/2021
// // Description: Use a Rich text editor or HTML section for this accordion.
// // Please use with the accompanied javascript in the javascript file
// // ------------------------------------------------------------------

$(function () {
  $('.accordion > li.accordionItem:eq(0) .accordionHeader').addClass('active').next().slideDown(); //Optional first one is open
  $('.accordion .accordionHeader').click(function (j) {
    var dropDown = $(this).closest('li.accordionItem').find('.accordionContent');
    $(this).closest('.accordion').find('.accordionContent').not(dropDown).slideUp();

    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).closest('.accordion').find('.accordionHeader.active').removeClass('active');
      $(this).addClass('active');
    }
    dropDown.stop(false, true).slideToggle();
    j.preventDefault();
  });
});

// // ------------------------------------------------------------------
// // Improved Accordion with option to expand first tab
// // Creation Date: 2/12/2021
// // Last Updated: 4/4/2023
// // Description: Use a Rich text editor or HTML section for this accordion.
// // Please use with the accompanied javascript in the javascript file
// // ------------------------------------------------------------------
$('.accordion-Accessible.openFirstTab').each(function(){
  //Check to see if reduced animation or not
  const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  if (!!isReduced) {
    $(this).find('li.accordionItem:eq(0) .accordionHeader').addClass('active');
  }
  else {
    $(this).find('li.accordionItem:eq(0) .accordionHeader').addClass('active').next().show();
  }
});

$(function () {
  $('.accordion-Accessible:not(.singleDropdown) .accordionHeader').click(function (j) {
    var dropDown = $(this).closest('li.accordionItem').find('.accordionContent').first();
    
    //Check to see if reduced animation or not
    const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (!!isReduced) {
    }
    else {
      $(this).closest('.accordion-Accessible:not(.singleDropdown)').find('.accordionContent').not(dropDown).slideUp();
    }

    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).closest('.accordion-Accessible:not(.singleDropdown)').find('.accordionHeader.active').removeClass('active');
      $(this).addClass('active');
    }

    //Check to see if reduced animation or not
    if (!!isReduced) {
    }
    else {
      dropDown.stop(false, true).slideToggle();
    }
    j.preventDefault();
  });
});

$(function () {
  $('.accordionGrid .accordion-Accessible.singleDropdown .accordionHeader').click(function (j) {
      if ($(this).parent().parent().hasClass('singleDropdown')) {
        var dropDown = $(this).closest('li.accordionItem').find('.accordionContent').first() ;

        //Check to see if reduced animation or not
        const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
        if (!!isReduced) {
        }
        else {
          $(this).closest('.accordionGrid').find('.accordion-Accessible.singleDropdown li.accordionItem .accordionContent').not(dropDown).slideUp();
        }

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordionGrid').find('.accordion-Accessible.singleDropdown li.accordionItem .accordionHeader.active').removeClass('active');
            $(this).addClass('active');
        }
        //Check to see if reduced animation or not
        if (!!isReduced) {
        }
        else {
          dropDown.stop(false, true).slideToggle();
        }
        j.preventDefault();
      }
  });
});


// // ------------------------------------------------------------------
// // Parallax Sections
// // Creation Date: 8/27/2021
// // Last Updated: 8/27/2021
// // Description: Use on any section.  Overwrites overlay but takes background
// // image and parallaxes it.
// // ------------------------------------------------------------------
  // $('.dev-parallax-MobileIOS .overlay').append('<div class="parallax-section" />');
  // $('.parallax-section').append('<div class="parallax-child-section"><div class="backgroundParallax" /></div>');
  // $('.backgroundParallax').css('background-image', $('.dev-parallax-MobileIOS').css('background-image'));
  // $('.dev-parallax-MobileIOS').css('background-image', 'none');

$('.dev-parallax-MobileIOS').each(function(){
  $(this).find('.overlay').append('<div class="parallax-section" />');
  $(this).find('.parallax-section').append('<div class="parallax-child-section"><div class="backgroundParallax" /></div>');
  $(this).find('.backgroundParallax').css('background-image', $(this).css('background-image'));
  $(this).css('background-image', 'none');
});


// // ------------------------------------------------------------------
// // Form Placeholder
// // Creation Date: 7/11/2022
// // Last Updated: 7/11/2022
// // Description: Adds a placeholder to the input section.
// // ------------------------------------------------------------------
$('.dev-form-Placeholder .c-leadGen-form__input').each(function(){
  $(this).find('input').attr('placeholder', $(this).find('label').text());
  $(this).find('label').hide();
});

$('.dev-form-Placeholder .formGroup').each(function(){
  $(this).find('input').attr('placeholder', $(this).find('label').text());
  $(this).find('label').hide();
});

$('.dev-form-Placeholder .formArea').each(function(){
  $(this).find('textArea').attr('placeholder', $(this).find('label').text());
  $(this).find('label').hide();
});

//Text CTA
$('.dev-text-CTA').each(function(){
  $(this).find('.box-copy').wrapAll('<div class="copyContainer" />');
  $(this).find('h2').prependTo('.copyContainer');
});

//Text CTA
$('.dev-text-Essential-CTA').each(function(){
  $(this).find('h2').wrapAll('<div class="copyContainer" />');
  $(this).find('.c-btn').clone().appendTo('.copyContainer');
});

// // ------------------------------------------------------------------
// // Add Horizonal Line
$('<div class="horizontalLine"></div>').insertAfter('.dev-EnableHorizontalLine h2');

//Swoosh at the bottom of section
var bannerSVG = '<svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;"><path d="M00.00,125 C150,0.00 200,200 500.00,100 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill: #fff;"></path></svg>'
$('.dev-swoosh').append('<div class="bannercurve">' + bannerSVG + '</div>');

//Arrow Pointers
$('<div class="pointerone"></div><div class="pointertwo"></div>').prependTo('.dev-arrowSlideinHeadline .overlay');


//Vertical Line
// Rotator Section Line
$('<div class="VerticalLine-Rotator"></div>').prependTo('.dev-EnableRotatorLine .c-rotator-summary__box');

// Text Section Line
$('<div class="VerticalLine"></div>').appendTo('.dev-EnableVerticalLine .o-container');


//Chico
// // ------------------------------------------------------------------
// // Boxes Hero
// // Creation Date: 9/20/2021
// // Last Updated: 9/20/2021
// // ------------------------------------------------------------------
if($('.dev-Boxes-Hero').length){

  //Pre-setup
  
    //Insert All boxes into container
    $('.dev-Boxes-Hero .box').prependTo('.dev-Boxes-Hero:first .o-grid__collapse');
  
    //Determine how many sections of these there are.
    var numSelectionSections = $('.dev-Boxes-Hero').length;
    if(numSelectionSections > 1){
      var itr = 1;
      for(itr = 1; itr < numSelectionSections; ++itr){
        $('.dev-Boxes-Hero').eq(itr).remove();
      }
    }
  
    // Setup
    $('.dev-Boxes-Hero .o-grid__collapse').first().prepend('<div class="tabNavigation"></div>');
  
    $('.dev-Boxes-Hero .box').each(function(){
      $(this).find('.c-section-boxes__inner-box').append('<div class="Content"><div class="Inner"></div></div>');
      $(this).find('.c-box-image').removeAttr('href');
  
      var RotatorContent = $(this).find('.c-box__title, .c-box__paragraph, .c-btn');
      $(RotatorContent).appendTo($(this).find('.c-section-boxes__inner-box .Inner'));
      $(this).parent().find('.tabNavigation').append('<div class="tabNavItem"><i class="fa fa-circle-o" aria-hidden="true"></i></div>');
    });
  
    
    if($('.dev-Boxes-Hero .box.c-box-text__align--Left').length){
      $('.dev-Boxes-Hero').addClass('LeftAligned');
    }
  
  // Rotator Slide Configuration
  $('.dev-Boxes-Hero .box:first').addClass('visible');
  
    var slides = document.querySelectorAll('.dev-Boxes-Hero .box');
    var currentSlide = 0;
    var slideInterval = setInterval(nextSlide,10000);
    var pauseButton = document.querySelector('.dev-Boxes-Hero .fa-pause.pause');
    var playing = true;
  
    function nextSlide(){
      $('.dev-Boxes-Hero .box').removeClass('visible'); 
      slides[currentSlide].classList.remove('visible'); 
      currentSlide = (currentSlide+1)%slides.length;
      slides[currentSlide].classList.add('visible'); 
    }
  
    function pauseSlideshow(){
      // pauseButton.classList.remove('fa-pause');
      // pauseButton.classList.add('fa-play');
      playing = false;
      clearInterval(slideInterval);
    }
  
    function playSlideshow(){
      // pauseButton.classList.remove('fa-play');
      // pauseButton.classList.add('fa-pause');
      playing = true;
      slideInterval = setInterval(nextSlide,10000);
    }
  
    function Check(){
      if(playing){ 
        
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide,10000);
       }
    }
  
    // pauseButton.onclick = function(){
    //   if(playing){ pauseSlideshow(); }
    //   else{ playSlideshow(); }
    // };
  
  
    // Click Functions
    $('.dev-Boxes-Hero .tabNavigation .tabNavItem').click(function(){
      $('.dev-Boxes-Hero .box').removeClass('visible');
      Check();
  
      //Get index of item clicked
      var index = $('.dev-Boxes-Hero .tabNavigation .tabNavItem').index(this);
  
      //Activate selected items
      $(this).addClass('visible');
      $('.dev-Boxes-Hero .box').eq(index).addClass('visible');
    });
  
    // End
  }

// ------------------------------------------------------------------
// Elevator Boxes
// Created: 8/16/2021
// Last Updated: 11/17/2022
// ------------------------------------------------------------------
$('.dev-ElevatorBoxes .box').each(function(){
  var titleName = $(this).find('h2').text();
          
    $(this).find('.c-section-boxes__inner-box').append('<div class="ElevatorFront"></div><div class="ElevatorBack"></div>');
    var flipcardImg = $(this).find('.c-section-boxes__inner-box img').attr('src');
    $(this).find('.c-section-boxes__inner-box .ElevatorFront').css('background-image', 'url(' + flipcardImg + ')');
    $(this).find('.c-section-boxes__inner-box .c-box__title').appendTo($(this).find('.c-section-boxes__inner-box .ElevatorFront'));
    $(this).find('.c-section-boxes__inner-box .ElevatorBack').append('<h2 class="c-box__title">'+ titleName +'</h2>');
    $(this).find('.c-section-boxes__inner-box .c-box__paragraph').appendTo($(this).find('.c-section-boxes__inner-box .ElevatorBack'));
    $(this).find('.c-section-boxes__inner-box .c-btn').appendTo($(this).find('.c-section-boxes__inner-box .ElevatorBack'));
  });

// ------------------------------------------------------------------
// Elevator Team
// Created: 8/16/2021
// Last Updated: 9/23/2021
// ------------------------------------------------------------------
$('.dev-ElevatorTeam .c-team-section__member').each(function(){

  var TeamName = $(this).find('h4').text();
  var TeamLink = $(this).find('h4 a').attr('href');
  var TeamTxT = $(this).find('.c-team-member__info');

  $(this).wrap('<a class="MemberLink" />');
  $(this).parent().attr('href', TeamLink);
  $(this).find('a[href*="tel:"]').text('Call Me');
  $(this).find('a[href*="mailto:"]').text('Email Me');
  $(this).find('.c-team-grid__section--developer').append('<div class="ElevatorFront"></div><div class="ElevatorBack"></div>');
  $(this).find('.ElevatorFront').append('<h3 class="NameFront">'+ TeamName +'</h3>');
  $(TeamTxT).appendTo($(this).find('.ElevatorBack'));
});
  
  

//LaJolla Rotator
$('.dev-rotator-LaJolla .c-rotator-summary__box .c-btn').wrap('<div class="rotatorBtns" />');

//hero social section
$('footer .c-socialMedia').clone().appendTo('.dev-heroText-Aurora');

//Combine service boxes
if($('.dev-servicesBox').length > 1){
  $('.dev-servicesBox').wrapAll('<div class="servicesBoxesContainer" />');
  $('.servicesBoxesContainer').wrapInner('<div class="overlay superOverlay" />');
  $('.servicesBoxesContainer .superOverlay').wrapInner('<div class="o-container superContainer" />');
  $('.servicesBoxesContainer .superContainer').wrapInner('<div class="superGrid" />');
}

//Team Member Pop Up
$('.dev-teamPopup .c-fmg-divider').remove();
$('.dev-teamPopup .c-team-list__section--developer').each(function(){
    $(this).find('.c-team-member__info').children().not('.c-team-list__summary').wrapAll('<div class="memberDetails" />');
    if($.trim($($(this).find('.c-team-list__summary')).html())!=''){
        $('<p class="teamPopUpBtnContainer"><a class="c-btn teamPopUpBtn">View Bio</a></p>').insertBefore($(this).find('.c-team-list__summary'));
    }
    $(this).find('.c-team-member__portrait a').removeAttr('href');
    $(this).find('.c-team-member__info h4 a').removeAttr('href');
});
 
$(".dev-teamPopup .teamPopUpBtn").click(function() {
    var bioDetailsImg = '<div class="bioDetails">' + $(this).parent().parent().parent().find('.c-team-member__portrait').html() + $(this).parent().parent().find('.memberDetails').html() + '</div>'
    $.fancybox.open('<div class="teamBioPopUp" ><div class="bioContainer">'+ bioDetailsImg + '<div class="teamSummary">' + $(this).parent().parent().parent().find('.c-team-list__summary').html() + '</div></div></div>');
});


// // ------------------------------------------------------------------
// // Team Member Popup Section designed by ToT
// // Creation Date: 10/24/2022
// // Last Updated: 10/24/2022
// // Description: Team member section that does a popup and line animation
// // on hover.  Originally designed by ToT.  Team member section should be 
// // list view with full bio.    
// // ------------------------------------------------------------------

// -----------------------------------------------
// Add Modal Element
// Last Modified: 10-17-2022
// -----------------------------------------------

function setupModal(){
  const FindBody = document.querySelector('body');
  let CreateModalWrapper = document.createElement("section");
  let CreateModalContent = document.createElement("div");
  let CreateModalClose = document.createElement("span");

  // Create Modal Close Button
  CreateModalClose.innerHTML = '<i class="fa fa-times-circle" aria-label="Close Modal" />';
  CreateModalClose.classList.add("dev-ModalClose");

  // Add Event Listener To Close Modal And Remove Inner Contents Once Complete
  CreateModalClose.addEventListener('click', function handleClick(event) {
      // Constant Variables 
      const FindModalWrapper = document.querySelector(".dev-ModalWrapper");
      FindModalInner = document.querySelector(".dev-ModalInner");
      FindModalWrapper.classList.remove("visible");
      FindModalInner?.remove();
  });

  // Move Close Modal Into Place
  CreateModalContent.insertAdjacentElement("afterbegin", CreateModalClose);

  // Create Inner Modal Content
  CreateModalContent.classList.add("dev-ModalContainer");
  CreateModalWrapper.insertAdjacentElement("afterbegin", CreateModalContent);
  CreateModalWrapper.classList.add("dev-ModalToolbox", "dev-ModalWrapper");

  FindBody.insertAdjacentElement("afterbegin", CreateModalWrapper);
}

// -----------------------------------------------
// Team Member Modal
// Last Modified: 10-17-2022
// -----------------------------------------------
let FindModalMembers = document.querySelectorAll(".dev-team-totPopup .c-team-list__section--developer");

if(FindModalMembers.length > 0){
  setupModal();

  // Constant Variables 
  const FindModalWrapper = document.querySelector(".dev-ModalWrapper");
  const FindModalContainer = document.querySelector(".dev-ModalWrapper .dev-ModalContainer");
  
  FindModalMembers.forEach((ModalMember, index) => {
      
      let FindMemberContainer = ModalMember.querySelector('.row');
      let FindContactInfo = ModalMember.querySelectorAll('.c-team-member__info a[href*="tel:"], .c-team-member__info a[href*="mailto:"], .c-team-info__social a');
      let FindTeamBio = ModalMember.querySelector('.c-team-list__summary');
      let FindLinksToRemove = ModalMember.querySelectorAll('h4 a, .c-team-member__portrait a');
      
      // Remove Any Unnecessary HyperLinks
      FindLinksToRemove.forEach((Link, index) => {
          Link.removeAttribute("href");
      });
      
      // Combine Contact Information
      let CreateContactArea = document.createElement("div");
      CreateContactArea.classList.add("ContactInfo");
      
      FindContactInfo.forEach((Info, index) => {
          Info.classList.add("c-social-media--link");
          Info.parentNode.remove();
          CreateContactArea?.insertAdjacentElement("beforeend", Info);
      });

      FindTeamBio.insertAdjacentElement("beforebegin", CreateContactArea);
      
      // Clone Team Member Info Into Modal And Open Modal
      ModalMember.addEventListener('click', function handleClick(event) { 
          let CloneTeamInfo = FindMemberContainer.cloneNode(true);
          CloneTeamInfo.classList.add("dev-ModalInner", "dev-team-totPopup");
          FindModalContainer?.insertAdjacentElement("afterbegin", CloneTeamInfo);
          FindModalWrapper?.classList.add("visible");
      });
  });
}

// // ------------------------------------------------------------------
// // Rotator Adjustments for the small rotator
// // Creation Date: 11/4/2022
// // Last Updated: 11/4/2022
// // Description: Small rotator adjustments
// // ------------------------------------------------------------------

$('.dev-rotator-SmallAdjustment').each(function(){
  $(this).find('.c-rotator-dots__container .c-rotator-orientation--right').parent().addClass('rightSide');
});

//CTA Form
//Combine Form & Text Sections
if($('.dev-ctaForm').length > 1){
  $('.dev-ctaForm').wrapAll('<div class="ctaFormContainer" />');
  $('.ctaFormContainer').wrapInner('<div class="overlay superOverlay" />');
  $('.ctaFormContainer .superOverlay').wrapInner('<div class="o-container superContainer" />');
  $('.ctaFormContainer .superContainer').wrapInner('<div class="superGrid" />'); 
}

// // ------------------------------------------------------------------
// // Gallery images with popup feature (fancybox)
// // Creation Date: 12/21/2022
// // Last Updated: 12/21/2022
// // ------------------------------------------------------------------
$('.dev-interactiveGallery img').each(function(){
  let galleryImgSrc = $(this).attr('src');
  $(this).wrap('<button data-fancybox="gallery" href="' + galleryImgSrc + '" class="galleryBtn" />');
});

// Fancybox Config
$('.dev-interactiveGallery .galleryBtn [data-fancybox="gallery"]').fancybox({
  buttons: [
    "slideShow",
    "thumbs",
    "zoom",
    "fullScreen",
    "share",
    "close"
  ],
  loop: true,
  protect: true
});

//Niche Content Boxes
$('.dev-boxes-Niche .box').each(function(){
  $('<hr />').insertBefore($(this).find('.c-btn'));
});

//Combine Sections together
function combineSections (sectionClassName, combineBoxes = false) {
  //Check to see if there is more than 1 section to combine and then continue
  if($('.' + sectionClassName).length > 1){
    //If the class name is the same as combine boxes
    if(combineBoxes){
      if($('.' + sectionClassName).hasClass('section_Form')){
        $('.' + sectionClassName + ' form').appendTo($('.' + sectionClassName).first().find('.o-grid__collapse'));
        $('.' + sectionClassName).not('section:first').remove();
      }
      else if($('.' + sectionClassName).hasClass('dev-ds_form')) {
        $('.' + sectionClassName + ' form').appendTo($('.' + sectionClassName).first().find('.o-grid__collapse'));
        $('.' + sectionClassName).not('section:first').remove();
      }
      else{
        $('.' + sectionClassName + ' .box').appendTo($('.' + sectionClassName).first().find('.o-grid__collapse'));
        $('.' + sectionClassName).not('section:first').remove();
      }
    }
    //Proceed to combining the rest of the sections together
    $($('.' + sectionClassName).not('section:first')).appendTo($('.' + sectionClassName).first().find('.o-container'));
  }
}

// // ------------------------------------------------------------------
// // Custom Footer Navigation
// // Creation Date: 6/15/2023
// // Last Updated: 6/15/2023
// // Creates a custom footer from an object that includes:
// // numCols, logo object (new logo and placement of it), nav object (copy or custom with nav object links),
// // content in each section
// // ------------------------------------------------------------------
/* Footer Object example
const footerNavConfig = {
  customFooterObj: {
    logoUrl: 'https://s3.amazonaws.com/static.contentres.com/media/InlineContent/originalSize/afeeb5d7-45ef-404b-a1e1-7ba3797beca6.png',
    customFooterObjHTML: '<p>Hi</p>'
  },
  customFooterNavObj: {
    copyNav: true,
    customFooterNavConfig: [
      {
        navColHeader: 'Nav1',
        footerNavItems: [
          {
            navText: 'Here',
            navUrl: 'https://www.fmgwebsites.com/174372fe-6b48-486a-b84c-4167709cddb1/here'
          },
          {
            navText: 'There',
            navUrl: 'https://www.fmgwebsites.com/174372fe-6b48-486a-b84c-4167709cddb1/there'
          }
        ]
      },
      {
        navColHeader: 'Nav2',
        footerNavItems: [
          {
            navText: 'Here',
            navUrl: 'https://www.fmgwebsites.com/174372fe-6b48-486a-b84c-4167709cddb1/here'
          },
          {
            navText: 'There',
            navUrl: 'https://www.fmgwebsites.com/174372fe-6b48-486a-b84c-4167709cddb1/there'
          }
        ]
      }
    ]
  },
  customFooterHTML: '<p>This is just extra</p>'
};
custom_FooterNavigation(footerNavConfig);
End Footer object example */

function footerNavConfigCheck(footerNavConfig) {
  //Checks to see if footerNavConfig was entered in correctly
  if (typeof footerNavConfig === 'undefined' || typeof footerNavConfig === null ) {
      return false;
  } else {
    return true;
  }
}

function cloneLogo() {
  const findLogo = document.querySelector('.c-header .c-template__logo .c-logo--link');
  if(findLogo != null){
    const logoCopy = findLogo.cloneNode(true);
    logoCopy.children[0].id = 'agentLogoCopy';
    return logoCopy;
  }
}

function cloneContactInfo() {
  const findContactInfo = document.querySelector('footer .c-footer__contact .contact');
  if(findContactInfo != null){
    const ContactCopy = findContactInfo.cloneNode(true);
    return ContactCopy;
  }
}

function custom_FooterNavigation(footerNavConfig){
  if(footerNavConfigCheck){
    //Add the customFooterObj and the navobj together
    if(Object.keys(footerNavConfig).includes('customFooterObj') || Object.keys(footerNavConfig).includes('customFooterNavObj') || Object.keys(footerNavConfig).includes('customFooterHTML')){
      document.querySelector(".footer-container").insertAdjacentHTML('afterbegin', '<div class="footerExtention"><div class="o-container c-footer__container"><div class="o-grid__collapse"><div class="v-flex row custom_Footer"></div></div></div></div>');
      
      if((footerNavConfig.customFooterObj !== undefined && Object.keys(footerNavConfig.customFooterObj).includes('customFooterObjHTML')) || (footerNavConfig.customFooterObj !== undefined && Object.keys(footerNavConfig.customFooterObj).includes('logoUrl'))){
        document.querySelector(".custom_Footer").insertAdjacentHTML('beforeend', '<div class="custom_FooterObj flexSection w-Adjustable" />');
        
        //Add logo to footer
        if(Object.keys(footerNavConfig.customFooterObj).includes('logoUrl')){
          if(footerNavConfig.customFooterObj.logoUrl == 'copy'){
            const footerLogo = cloneLogo();
            document.querySelector(".custom_Footer .custom_FooterObj").insertAdjacentHTML('beforeend', footerLogo.outerHTML);
          }
          else {
            const footerLogo = cloneLogo();
            footerLogo.children[0].src = footerNavConfig.customFooterObj.logoUrl;
            document.querySelector(".custom_Footer .custom_FooterObj").insertAdjacentHTML('beforeend', footerLogo.outerHTML);           
          }
        }
        //Add contact info to footer
        if(Object.keys(footerNavConfig.customFooterObj).includes('contactInfo')){
          if(footerNavConfig.customFooterObj.contactInfo == 'yes'){
            const footerContact = cloneContactInfo();
            document.querySelector(".custom_Footer .custom_FooterObj").insertAdjacentHTML('beforeend', footerContact.outerHTML);
          }
        }
        //Add Additional HTML to footer
        if(Object.keys(footerNavConfig.customFooterObj).includes('customFooterObjHTML')){
          document.querySelector(".custom_Footer .custom_FooterObj").insertAdjacentHTML('beforeend', footerNavConfig.customFooterObj.customFooterObjHTML);
        }
      }
      if(Object.keys(footerNavConfig).includes('customFooterNavObj') && footerNavConfig.customFooterNavObj !== undefined){
        document.querySelector(".custom_Footer").insertAdjacentHTML('beforeend', '<div class="custom_FooterNav flexSection w-Adjustable v-flex row" />');        
        if(Object.keys(footerNavConfig.customFooterNavObj).includes('copyNav')){
          if(footerNavConfig.customFooterNavObj.copyNav == true){
            //copy the main navigation
            document.querySelector(".custom_Footer .custom_FooterNav").insertAdjacentHTML('beforeend', '<div class="v-flex row default_FooterNavigationConfig" />');
            default_FooterNavigation();
          }
        }
        if(Object.keys(footerNavConfig.customFooterNavObj).includes('customFooterNavConfig') && footerNavConfig.customFooterNavObj.customFooterNavConfig !== undefined){
          //This is an array of nav col objects that contain an array of nav item objects and a nav col title
          document.querySelector(".custom_Footer .custom_FooterNav").insertAdjacentHTML('beforeend', '<div class="v-flex row custom_FooterNavigationConfig" />');
          footerNavConfig.customFooterNavObj.customFooterNavConfig.forEach(function (navCol, navColItr) {
            if(Object.keys(navCol).includes('navColHeader') || Object.keys(navCol).includes('footerNavItems')) {
              document.querySelector(".custom_Footer .custom_FooterNav .custom_FooterNavigationConfig").insertAdjacentHTML('beforeend', '<div id="footerNavCol' + navColItr + '" class="footerNavCol flexSection w-Adjustable" />');
              document.querySelector('.custom_Footer #footerNavCol' + navColItr).insertAdjacentHTML('beforeend', '<ul class="footerNavColItems" />');
              if(Object.keys(navCol).includes('navColHeader')){
                const navHeader = navCol.navColHeader;
                document.querySelector('.custom_Footer #footerNavCol' + navColItr + " .footerNavColItems").insertAdjacentHTML('beforeend', '<li class="footerNavColHeader">' + navHeader + '</li>');
              }
              if(Object.keys(navCol).includes('footerNavItems') && navCol.footerNavItems !== undefined){
                navCol.footerNavItems.forEach(navItem=>{
                  if(Object.keys(navItem).includes('navText') && Object.keys(navItem).includes('navUrl')){
                    const navItemTarget = navItem?.target || '_self';
                    document.querySelector('.custom_Footer #footerNavCol' + navColItr + " .footerNavColItems").insertAdjacentHTML('beforeend', '<li class="footerNavItem"><a href="' + navItem.navUrl + '" target="' + navItemTarget + '">' + navItem.navText + '</a></li>');
                  }
                });
              }
            }         
          });
        }  
      }
      if(footerNavConfig.customFooterHTML !== undefined && Object.keys(footerNavConfig).includes('customFooterHTML')){
        document.querySelector(".custom_Footer").insertAdjacentHTML('beforeend', '<div class="custom_FooterHTML flexSection w-Adjustable" />');
        document.querySelector(".custom_Footer .custom_FooterHTML").insertAdjacentHTML('beforeend', footerNavConfig.customFooterHTML);
      }
    }
    else{
      throw Error('Missing Required Fields: Footer Configuration Object is empty');
    }
  }
  else{
    throw Error('Missing Required Field: Footer Configuration Object');
  }
}

// Default footer navigation function
function default_FooterNavigation(){
  // Footer Navigation Creation
  const FindTopNav = document.querySelectorAll(".c-header .c-topnav__menu-item") || document.querySelectorAll("#mainNav .c-topnav__menu-item");
  const FindNavWrapper = document.querySelector(".default_FooterNavigationConfig");
  let count = "";

  Array.from(FindTopNav).forEach(function(CreateNav, index) {
    if(getComputedStyle(CreateNav).getPropertyValue('display') != 'none'){ //Only add columns if the top nav is displayed
      let BuildNavGrid = document.createElement("div");
      BuildNavGrid.setAttribute("class", "flexSection c-bottom-nav");
      
      let BuildNavList = document.createElement("ul");
      let DuplicateNav = CreateNav.cloneNode(true);
      let FindSubNav = DuplicateNav.querySelectorAll(".c-topnav__submenu");
    
      BuildNavList.setAttribute("class", "c-bottom-nav__menu");
      DuplicateNav.setAttribute("class", "c-bottom-nav__menu-item");
      
      let FindTopNavLink = DuplicateNav.querySelectorAll(".c-topnav__menu-text");
      Array.from(FindTopNavLink).forEach(function(topLink) {
        topLink.setAttribute("class", "c-bottom-nav__menu-text c-bottom-nav__title");
      });
      
      // Remove drop down toggle
      let findToggle = DuplicateNav.querySelector('.js-dropdown__toggle');
      findToggle?.remove();
      
      // Move completed items
      BuildNavList.appendChild(DuplicateNav);
      BuildNavGrid.appendChild(BuildNavList);
      FindNavWrapper.appendChild(BuildNavGrid);
      
      // Set classes for subnav
      Array.from(FindSubNav).forEach(function(SubNav) {
        SubNav.setAttribute("class", "c-bottom-nav__submenu");
          let FindSubItems = DuplicateNav.querySelectorAll(".c-topnav__submenu-item");
          Array.from(FindSubItems).forEach(function(SubItem) {
            SubItem.setAttribute("class", "c-bottom-nav__submenu-item");
          });
      });
      
      // Update count
      count = index++
    }
  });

  // Add column number to the nav wrapper
  FindNavWrapper.classList.add('col' + count +'');
}

if($('.dev-contact-AddressMap').length){
  let contactSocial = $('.contact .c-socialMedia').clone().addClass('c-contactSocial');
  $('.dev-contact-AddressMap .v-grid .gridSection:nth-of-type(1) .sectionContent').append(contactSocial);
}

$('.dev-teamMember-LargePortraits2x2 .c-team-section__member').each(function(){
  let teamLink = $(this).find('a[href*="team"]').first().attr('href');
  $(this).find('.c-team-member__info').prepend('<div class="teamMemberArrowButtonContainer" />');
  $(this).find('.teamMemberArrowButtonContainer').append('<a href="' + teamLink + '" class="teamMemberArrowButton"/>');
});

//Section Combiner 
//12/13/23
function combiningSectionsFunction(uniqueClassName, combineSectionBoxes = false){
  //Check to see if there is more than 1 section to combine and then continue
  let targetSections = $(uniqueClassName);
  if(targetSections.length >= 2){
    //If the class name is the same as combine boxes then just combine sections
    if(combineSectionBoxes){
      $(uniqueClassName + ' .box').appendTo($(uniqueClassName).first().find('.o-grid__collapse'));
      $(targetSections).not('section:first').remove();
    }
    else {
      let newClassName = uniqueClassName.replace(".", "");
      $(targetSections).wrapAll('<section class="section combinedSuperSections ' + newClassName + '-Combined"/>'); //unique className for super section

      //Wrap inside a superSection
      $('.combinedSuperSections.' + newClassName + '-Combined').wrapInner('<div class="o-grid__collapse primaryGrid"/>');
      $('.combinedSuperSections.' + newClassName + '-Combined').wrapInner('<div class="o-container primaryContainer" />');
      $('.combinedSuperSections.' + newClassName + '-Combined').wrapInner('<div class="overlay primaryOverlay"/>');
      
      //Check for a background section.  If not designated, take the background of first section
      let backgroundAvailable;
      $(targetSections).each(function(){
        if($(this).hasClass('dev-combineSectionsBackground')){
          backgroundAvailable = true;
        }
      });
      if(backgroundAvailable){
        $('.combinedSuperSections.' + newClassName + '-Combined').css('background', $('.combinedSuperSections.' + newClassName + '-Combined .dev-combineSectionsBackground').css('background'));
        $('.combinedSuperSections.' + newClassName + '-Combined .dev-combineSectionsBackground').css('background', '');
        $('.combinedSuperSections.' + newClassName + '-Combined .primaryOverlay').css('background', $('.combinedSuperSections.' + newClassName + '-Combined .dev-combineSectionsBackground .overlay').css('background'));
        $('.combinedSuperSections.' + newClassName + '-Combined .dev-combineSectionsBackground .overlay').css('background', '');
        $('.combinedSuperSections.' + newClassName + '-Combined .dev-combineSectionsBackground').removeClass('dev-combineSectionsBackground');
        $('.combinedSuperSections.' + newClassName + '-Combined').addClass('dev-combineSectionsBackground');
      }
      else {
        $('.combinedSuperSections.' + newClassName + '-Combined').css('background', $('.combinedSuperSections.' + newClassName + '-Combined .section').first().css('background'));
        $('.combinedSuperSections.' + newClassName + '-Combined .section').first().css('background', '');
        $('.combinedSuperSections.' + newClassName + '-Combined .primaryOverlay').css('background', $('.combinedSuperSections.' + newClassName + '-Combined .section .overlay').first().css('background'));
        $('.combinedSuperSections.' + newClassName + '-Combined .section .overlay').first().css('background', '');
      } 
    
      //Take the section effects of the sections if applicable
      if($('.combinedSuperSections.' + newClassName + '-Combined .section[class*=dev-sectionEffect]').length){
        let removeClassName;
        $('.combinedSuperSections.' + newClassName + '-Combined .section[class*=dev-sectionEffect]').each(function(){
          let sectionClasses = Array.from(this.classList);
          sectionClasses.forEach(function(className){
            if(className.includes('dev-sectionEffect')){
              removeClassName = className;
              $('.combinedSuperSections.' + newClassName + '-Combined').addClass(className);
            }
          });
        });
        $('.combinedSuperSections.' + newClassName + '-Combined .section[class*=dev-sectionEffect]').removeClass(removeClassName);
      }
      if($('.combinedSuperSections.' + newClassName + '-Combined .section[class*=dev-sectionOrientation]').length){
        let removeClassName;
        $('.combinedSuperSections.' + newClassName + '-Combined .section[class*=dev-sectionOrientation]').each(function(){
          let sectionClasses = Array.from(this.classList);
          sectionClasses.forEach(function(className){
            if(className.includes('dev-sectionOrientation')){
              removeClassName = className;
              $('.combinedSuperSections.' + newClassName + '-Combined').addClass(className);
            }
          });
        });
        $('.combinedSuperSections.' + newClassName + '-Combined .section[class*=dev-sectionOrientation]').removeClass(removeClassName);
      }
      if($('.combinedSuperSections.' + newClassName + '-Combined .section[class*=dev-overlay]').length){
        let removeClassName;
        $('.combinedSuperSections.' + newClassName + '-Combined .section[class*=dev-overlay]').each(function(){
          let sectionClasses = Array.from(this.classList);
          sectionClasses.forEach(function(className){
            if(className.includes('dev-overlay')){
              removeClassName = className;
              $('.combinedSuperSections.' + newClassName + '-Combined').addClass(className);
            }
          });
        });
        $('.combinedSuperSections.' + newClassName + '-Combined .section[class*=dev-overlay]').removeClass(removeClassName);
      }
    }
  }
}

// 11/8/2023 -- Hybrid Hamburger Menu
const HybridHamburgerMenu = {
  init: function( params ) {
      // Set Properties from Params
      this.setProperties( params );
      
      // See if Modern Header Nav was Found
      if( this.modernHeaderNavContainer === null ) {
          console.warn('Modern header nav not found - Hybrid menu requires modern header without additions');
          return;
      }
      
      // Remove Home Menu Item if Specified
      if( !this.hasHomeMenuItem ) this.removeHomeMenuItem();
      
      // Move Auxiliary Menu Open Out of Naviation Flow
      if( this.navOpenPositionAbsolute ) this.setNavOpenPositionAbsolute();
    
      // Create And Append Menu
      this.appendAuxiliaryMenu();  

      // Append Items to Auxiliary Nav
      this.appendItemsToMenu();
      
      // Add Open / Close Event Listeners
      this.auxiliaryOpenBtn.addEventListener('click', () => { this.openAuxiliaryMenu() });
      this.auxiliaryCloseBtn.addEventListener('click', () => { this.closeAuxiliaryMenu() });
      
      return this; // Return reference to object
  },
  setProperties: function({ hasHomeMenuItem = false, itemsOutsideAuxiliaryMenu = 5, hasDecorativeImage = false, headerBtns = [], navOpenPositionAbsolute = false }) {
      // Param Properties
      this.hasHomeMenuItem = hasHomeMenuItem;
      this.itemsOutsideAuxiliaryMenu = itemsOutsideAuxiliaryMenu;
      this.hasDecorativeImage = hasDecorativeImage;
      this.headerBtns = headerBtns;
      this.navOpenPositionAbsolute = navOpenPositionAbsolute;
      
      // Internal Properties
      this.modernHeaderNavContainer = document.querySelector('.c-header-modern:not(.c-header-modern--withtwolocations):not(.c-header-modern--withcontactinfo) .c-topnav__container');
      this.auxiliaryMenu = this.createAuxiliaryMenu();
      this.auxiliaryOpenBtn = this.createAuxiliaryMenuOpenBtn();
      this.auxiliaryCloseBtn = this.auxiliaryMenu.querySelector('.auxiliary-close');
      this.auxiliaryContainer = this.auxiliaryMenu.querySelector('.auxiliary__container');
  },
  createAuxiliaryMenu: function() {
      const auxiliaryMenuObj = document.createElement('div');
      auxiliaryMenuObj.classList.add('auxiliary-menu');
      
      auxiliaryMenuObj.insertAdjacentHTML('afterbegin', `
          <nav class="menu-wrap">
              <button class="auxiliary-close">
                <span class="line">&#160;</span>
                <span class="line">&#160;</span>
              </button>
              <ul class="c-topnav__container auxiliary__container" />
          </nav>
      `);
      
      if( this.hasDecorativeImage ) this.appendDecorativeImage( auxiliaryMenuObj );
      
      return auxiliaryMenuObj;
  },
  createAuxiliaryMenuOpenBtn: function() {
      const auxiliaryOpenBtnObj = document.createElement('button');
      auxiliaryOpenBtnObj.classList.add('auxiliary-open');
      auxiliaryOpenBtnObj.insertAdjacentHTML('afterbegin', `
          <span class="line">&#160;</span>
          <span class="line">&#160;</span>
          <span class="line">&#160;</span>
      `);
      return auxiliaryOpenBtnObj;
  },
  appendAuxiliaryMenu: function() {
      // Add Unique Class to Header
      document.querySelector('.c-header')?.classList.add('hybrid-menu');

      // Append Auxiliary Menu
      this.modernHeaderNavContainer.insertAdjacentElement('afterend', this.auxiliaryMenu);
      
      // Append Auxiliary Menu Hamburger Open Button
      const headerInner = document.querySelector('.c-header__inner');
      headerInner?.appendChild( this.auxiliaryOpenBtn );
  },
  appendItemsToMenu: function() {
      const menuItems = this.modernHeaderNavContainer.querySelectorAll('.c-topnav__menu-item');
      menuItems.forEach( ( menuItem, index ) => {
          if( index >= this.itemsOutsideAuxiliaryMenu ) {
              this.auxiliaryContainer.appendChild( menuItem );
          } else {
              if( this.isHeaderButton( menuItem ) ) menuItem.classList.add('navBtn');
          }
      });
  },
  removeHomeMenuItem: function() {
      const menuItems = this.modernHeaderNavContainer.querySelectorAll('.c-topnav__menu-item');
      menuItems[0].remove();
  },
  openAuxiliaryMenu: function() {
      this.auxiliaryMenu.classList.add('open');
      this.hideBodyScrollbar();
  },
  closeAuxiliaryMenu: function() {
      this.auxiliaryMenu.classList.remove('open');
      this.revealBodyScrollbar();
  },
  appendDecorativeImage: function( auxiliaryMenuObj ) {
      auxiliaryMenuObj.classList.add('has-decorative-img');
      auxiliaryMenuObj.insertAdjacentHTML('afterbegin', `
          <div class="decorative-img" />
      `);
  },
  isHeaderButton: function( menuItem ) {
      const menuItemText = menuItem.textContent;
      return this.headerBtns.indexOf( menuItemText ) >= 0 ? true : false;
  },
  hideBodyScrollbar: function() {
      document.body.style.overflow = 'hidden';
  },
  revealBodyScrollbar: function() {
      document.body.style.overflow = 'auto';
  },
  setNavOpenPositionAbsolute: function() {
      document.querySelector('.c-header')?.classList.add('menu-open-out-of-flow');
  }
}

// ---------------------------
// Script Additions 2-23-26
// ---------------------------

// Text Wrap Content
if (document.querySelectorAll(".dev-default-Text-WrapContent").length > 0) {
  $('.dev-default-Text-WrapContent').each(function(){
    $(this).find('h2:first, .box-copy').wrapAll('<div class="default-ContentContainer" />');
    $(this).find('.c-btn').wrapAll('<div class="default-BtnContainer" />');
  });
}

// Basic Card Wrap
if (document.querySelectorAll(".dev-default-Box-WrapContent").length > 0) {
  $('.dev-default-Box-WrapContent .box').each(function(){
  $(this).find('.c-box__icon, .c-box-image__container, .c-box-image').wrapAll('<div class="default-ImageContainer" />');
  $(this).find('.c-section-boxes__inner-box').append('<div class="default-ContentWrapper"><div class="default-ContentContainer"></div></div>');
  $(this).find('.c-box__title, .c-box__paragraph, .c-btn').appendTo($(this).find('.default-ContentContainer'));
  });
}

// Add View Bio Button to Team Members
if (document.querySelectorAll(".dev-default-Team-EnableBioBtn").length > 0) {
      let BtnText = "Read Bio";
      $('.dev-default-Team-EnableBioBtn .c-team-list__section--developer, .dev-default-Team-EnableBioBtn .c-team-grid__section--developer').each(function(){
      var TeamLink = $(this).find('h4 a').attr('href');
      $(this).find('.c-team-member__info').append('<div class="default-TeamBioButton"><div class="default-BtnContainer"><a href="'+ TeamLink +'" class="c-btn">' + BtnText +'</a></div></div>');
    });
}

// Disable Box Hyperlink
if (document.querySelectorAll(".dev-default-Boxes-DisableHyperlink").length > 0) {
  $('.dev-default-Boxes-DisableHyperlink .c-box__icon a, .dev-default-Boxes-DisableHyperlink .c-box-image__container, .dev-default-Boxes-DisableHyperlink .c-box-image a').removeAttr('href');
}

// Side-by-Side Hero Background Catch-all
if (document.querySelectorAll(".dev-default-SxS-FullHero").length > 0) {
   $('.dev-default-SxS-FullHero').each(function(){
    let ImageURL = $(this).find('.c-sxs__image img').attr("src");
    $(this).css('--defaultSectionBackground', 'url(' + ImageURL + ')');
    });
}

// Default Section Combiners
if (document.querySelectorAll(".dev-default-Boxes-CombineSet-One").length > 0) {
    combiningSectionsFunction('.dev-default-Boxes-CombineSet-One', true);
}
if (document.querySelectorAll(".dev-default-Boxes-CombineSet-Two").length > 0) {
    combiningSectionsFunction('.dev-default-Boxes-CombineSet-Two', true);
}
if (document.querySelectorAll(".dev-default-Boxes-CombineSet-Three").length > 0) {
    combiningSectionsFunction('.dev-default-Boxes-CombineSet-Three', true);
}
if (document.querySelectorAll(".dev-default-Section-CombineSet-One").length > 0) {
    combiningSectionsFunction('.dev-default-Section-CombineSet-One');
}
if (document.querySelectorAll(".dev-default-Section-CombineSet-Two").length > 0) {
    combiningSectionsFunction('.dev-default-Section-CombineSet-Two');
}
if (document.querySelectorAll(".dev-default-Section-CombineSet-Three").length > 0) {
    combiningSectionsFunction('.dev-default-Section-CombineSet-Three');
}

// Hide Box Script
if (document.querySelectorAll(".dev-default-EnableHideBox").length > 0) {
  $(document).ready(function() {
  globalRemoveBox();
  });
}
// Add View Bio Button to Team Members
function globalRemoveBox(boxText) {
  boxText = boxText || "box-empty";
  if (document.querySelectorAll(".section_Boxes").length > 0) {
    $('.section_Boxes .box').each(function(){
    if($(this).find('.c-box__title').is(':contains("' + boxText + '")') || $(this).find('p').is(':contains("' + boxText + '")')) {
        $(this).addClass("default-hideBox");
        $(this).remove();
      }
    });
  }
};

/* ------------------------------------------------------------------
   Under Construction Page
------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", function() {
  if (document.querySelector(".dev-global-underConstruction")) {
    if (!document.querySelector('#preview-location')) { // Not the preview site
      if (!document.querySelector('.page-under-construction')) { // Not the under construction page
        if (!!document.querySelector('.homepage') || !!document.querySelector('.subpage.custompage')) { // If it is the homepage or a custom subpage then redirect it
          window.location.replace(FMG.RootLocation +"under-construction");
        }
      }
    }
  }
});

// // ------------------------------------------------------------------
// // NEW: Auto-Chunking Section Combiner (Dynamic Suffix, Box & Effects Support)
// // ------------------------------------------------------------------
function autoCombineAdjacentSections(baseClassName) {
    let baseClassClean = baseClassName.replace('.', '');
    
    let $sections = $('[class*="' + baseClassClean + '"]');
    if ($sections.length === 0) return;

    let groups = [];
    
    // 1. Group the contiguous sections
    $sections.each(function() {
        let $this = $(this);
        let classList = this.className.split(' ');
        let exactCombineClass = classList.find(c => c.startsWith(baseClassClean));
        
        if (!exactCombineClass) return;

        if ($this.prev().hasClass(exactCombineClass)) {
            groups[groups.length - 1].elements.push(this);
        } else {
            groups.push({
                targetClass: exactCombineClass,
                elements: [this]
            });
        }
    });

    // 2. Wrap and Hoist logic
    let clusterCounter = 0;
    groups.forEach((group) => {
        let $group = $(group.elements);
        let exactClass = group.targetClass;
        let isBoxCombine = exactClass.toLowerCase().includes('-boxes');
        
        if ($group.length >= 2) {
            if (isBoxCombine) {
                // Scenario A: Merge Boxes
                $group.find('.box').appendTo($group.first().find('.o-grid__collapse'));
                $group.not(':first').remove();
                $group.first().removeClass(exactClass);
                
            } else {
                // Scenario B: Create Super Wrapper
                
                // We apply the exact class so your CSS works, plus a unique cluster ID just in case
                let uniqueClusterClass = exactClass + '-cluster-' + clusterCounter;
                clusterCounter++;
                
                $group.wrapAll('<section class="section combinedSuperSections ' + exactClass + ' ' + uniqueClusterClass + '" />');
                
                // (which accidentally grabs the first one), we directly select the exact wrapper we just made.
                let $superSection = $group.first().parent();
                
                $superSection.wrapInner('<div class="o-grid__collapse primaryGrid" />');
                $superSection.wrapInner('<div class="o-container primaryContainer" />');
                $superSection.wrapInner('<div class="overlay primaryOverlay" />');
                
                // --- 1. Transfer Background (Only if Inline Styles Exist) ---
                let $bgSource = $group.hasClass('dev-combineSectionsBackground') 
                    ? $group.filter('.dev-combineSectionsBackground').first() 
                    : $group.first();

                let $sourceOverlay = $bgSource.find('.overlay').first();
                let $targetOverlay = $superSection.find('.primaryOverlay');

                // DRY Helper to strictly move only inline backgrounds
                function moveInlineBackground($fromElement, $toElement) {
                    if (!$fromElement || $fromElement.length === 0) return;
                    
                    // Access the raw DOM node to check for inline styles
                    let domNode = $fromElement[0];
                    let hasInlineBg = domNode.style.background || domNode.style.backgroundImage || domNode.style.backgroundColor;

                    if (hasInlineBg) {
                        // Apply inline styles to target
                        if (domNode.style.background) $toElement.css('background', domNode.style.background);
                        if (domNode.style.backgroundImage) $toElement.css('background-image', domNode.style.backgroundImage);
                        if (domNode.style.backgroundColor) $toElement.css('background-color', domNode.style.backgroundColor);
                        
                        // Clear the inline styles from the source element
                        $fromElement.css({
                            'background': '',
                            'background-image': '',
                            'background-color': ''
                        });
                    }
                }

                // Execute the background transfers
                moveInlineBackground($bgSource, $superSection);
                moveInlineBackground($sourceOverlay, $targetOverlay);

                // Handle the Background class swap if present
                if ($group.hasClass('dev-combineSectionsBackground')) {
                    $bgSource.removeClass('dev-combineSectionsBackground');
                    $superSection.addClass('dev-combineSectionsBackground');
                }

                // --- DRY HELPER: Transfer Classes Function ---
                // This replaces the repeated logic for Effects, Orientations, and Overlays
                function transferClasses(classKeyword) {
                    if($group.filter('[class*="' + classKeyword + '"]').length){
                        $group.filter('[class*="' + classKeyword + '"]').each(function(){
                            let classesToRemove = [];
                            let sectionClasses = Array.from(this.classList);
                            
                            sectionClasses.forEach(function(className){
                                if(className.includes(classKeyword)){
                                    classesToRemove.push(className); // Push ALL matching classes to array
                                    $superSection.addClass(className);
                                }
                            });
                            
                            // Remove all gathered classes in one go
                            if (classesToRemove.length > 0) {
                                $(this).removeClass(classesToRemove.join(' '));
                            }
                        });
                    }
                }

                // --- 2, 3, 4. Execute Transfers ---
                transferClasses('dev-sectionEffect');
                transferClasses('dev-sectionOrientation');
                transferClasses('dev-overlay');
                
                // Clean up inner classes so it doesn't duplicate CSS
                $group.removeClass(exactClass);
            }
        }
    });
}

// Run on page load
$(document).ready(function() {
    autoCombineAdjacentSections('.dev-super-combine'); 
});


/**
 * Extracts FAQ data from .dev-customFAQAccordion containers and appends a 
 * separate FAQPage JSON-LD script to the document head.
 */

// Tell the browser to wait until the HTML is fully loaded before running this function
document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelectorAll('.dev-customFAQAccordion').length > 0) {
        console.log('[FAQ Schema] FAQ containers detected. Processing schema generation...');
        appendFAQSchema();
    }
});

function appendFAQSchema() {
    // 1. Find ALL instances of the FAQ container on the page
    const faqContainers = document.querySelectorAll('.dev-customFAQAccordion');
    if (faqContainers.length === 0) return;

    // So we just check if it exists (!accordionContainer means "if it does not exist")
    const accordionContainer = document.querySelector('.dev-customFAQAccordion .accordion-Accessible');
    if (!accordionContainer) return;

    let allFaqItems = [];

    // 2. Loop through every single container found and extract data
    faqContainers.forEach(container => {
        const items = container.querySelectorAll('.accordionItem');
        
        items.forEach(item => {
            const questionStr = item.querySelector('.accordionHeader')?.innerText.trim();
            const answerStr = item.querySelector('.accordionContent')?.innerText.trim();

            if (questionStr && answerStr) {
                allFaqItems.push({
                    "@type": "Question",
                    "name": questionStr,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answerStr
                    }
                });
            }
        });
    });

    // If no valid Q&A pairs were found, stop here
    if (allFaqItems.length === 0) return;

    // 3. Create the payload specifically for the FAQPage
    const faqPayload = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "Frequently Asked Questions",
        "mainEntity": allFaqItems
    };

    // 4. Create a new script tag and append it to the document head
    const newScript = document.createElement('script');
    newScript.type = 'application/ld+json';
    newScript.text = JSON.stringify(faqPayload, null, 2);
    
    document.head.appendChild(newScript);
    console.log(`[FAQ Schema] Appended new schema block with ${allFaqItems.length} items.`);
}

/**
 * Applies CSS classes to navigation items based on URL matches.
 * Handles both relative paths (/contact) and absolute external URLs (https://www.google.com).
 * @param {Object} options 
 * @param {Array} options.urls - Array of URL paths to match
 * @param {String|Array} [options.classNames='navMimicBtn'] - The class or classes to apply
 */
function setNavMimicBtn({ urls = [], classNames = ['navMimicBtn'] }) {
    const navItems = document.querySelectorAll('#mainNav .c-topnav__menu-item');
    if (!navItems.length || !urls.length) return;
    
    // Helper to strip protocol, www, and trailing slashes for bulletproof matching
    const normalizeUrl = (url) => {
        return (url || '')
            .toLowerCase()
            .replace(/^https?:\/\//, '') // Removes http:// or https://
            .replace(/^www\./, '')       // Removes www.
            .replace(/\/$/, '');         // Removes trailing slash at the very end
    };

    const targetUrls = urls.map(normalizeUrl);

    navItems.forEach(item => {
        const link = item.querySelector('a.c-topnav__menu-text');
        if (!link) return;
        
        const currentUrl = normalizeUrl(link.getAttribute('href'));
        
        // Use endsWith instead of includes to prevent false positives!
        // (e.g. so '/contact' doesn't accidentally trigger on '/contact-us')
        const isMatch = targetUrls.some(url => {
            return currentUrl === url || currentUrl.endsWith(url);
        });
        
        if (isMatch) {
            // Allows passing a single string or an array of multiple classes!
            const classesToAdd = Array.isArray(classNames) ? classNames : [classNames];
            item.classList.add(...classesToAdd);
        }
    });
}

if($('body[class*="dev-global-btn"]').length){
  upgradeFormButtons();
}
/**
 * Upgrades rigid <input type="submit"> tags into flexible <button> tags
 * ONLY if the dev-global-btn LEGO system is active on the page.
 */
function upgradeFormButtons() {
    // 1. Check if the dev-global-btn system is being used anywhere on this page
    const usesGlobalButtons = document.querySelector('[class*="dev-global-btn"]');
    
    // If no global button classes are found, stop the script immediately (saves performance)
    if (!usesGlobalButtons) return;

    // 2. Find all submit inputs that are meant to be styled buttons
    const submitInputs = document.querySelectorAll('input[type="submit"].c-btn, input[type="submit"].submit, input[type="submit"].leadgen-submit');
    
    submitInputs.forEach(input => {
        // Create the new button element
        const btn = document.createElement('button');
        
        // Transfer the essential properties
        btn.type = 'submit';
        btn.innerHTML = input.value || 'Submit'; // Uses the input's value as the button text
        btn.className = input.className;

        if (btn.classList.contains('leadgen-submit')) {
            btn.classList.add('c-btn');
        }
        
        // Transfer IDs or ARIA labels if they exist for accessibility
        if (input.id) btn.id = input.id;
        if (input.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', input.getAttribute('aria-label'));
        }
        
        // Swap the old input out for the new button
        input.parentNode.replaceChild(btn, input);
    });
}

/**
 * Flexible Footer Builder
 */
function buildFlexibleFooter(customConfig = null) {
    const footerGrid = document.querySelector('footer .c-footer__container .o-grid__collapse');
    if (!footerGrid || document.querySelector('.customFooter')) return;

    // Look for a config passed directly, OR a global window configuration!
    const activeConfig = customConfig || window.customFooterConfig || null;

    const PRESETS = {
        'dev-global-AuroraFooter': [
            { className: 'aurora-col-left', title: 'Visit', items: ['address'] },
            { className: 'aurora-col-center', title: '', items: ['logo', 'social', 'email'] },
            { className: 'aurora-col-right', title: 'Connect', items: ['phone', 'fax'] }
        ]
    };

    let activeColumns = null;
    let wrapperClass = '';

    // 1. Scan the body to see if a known layout class is active
    for (const presetClass in PRESETS) {
        if (document.body.classList.contains(presetClass)) {
            activeColumns = PRESETS[presetClass]; 
            wrapperClass = presetClass.replace('dev-global-', '').toLowerCase(); 
            break;
        }
    }

    // 2. Override with custom config if one was found!
    if (activeConfig && activeConfig.columns) {
        activeColumns = activeConfig.columns;
        if (activeConfig.wrapperClass) wrapperClass = activeConfig.wrapperClass;
    }

    if (!activeColumns) return;

    // 3. Scrape ALL matching elements
    const elements = {
        address: Array.from(document.querySelectorAll('footer .contact .moonlight-address_block')),
        logo: Array.from(document.querySelectorAll('img#agentLogo')).map(img => {
            const clone = img.cloneNode(true);
            clone.id = 'agentLogoCopy'; 
            return clone;
        }),
        phone: Array.from(document.querySelectorAll('footer .moonlight-phone')),
        fax: Array.from(document.querySelectorAll('footer .contact .moonlight-fax')),
        social: Array.from(document.querySelectorAll('footer .c-socialMedia')),
        email: Array.from(document.querySelectorAll('footer .contact a[href*="mailto"]')).map(link => link.parentElement)
    };

    // 4. Create the main wrapper
    const customFooter = document.createElement('div');
    customFooter.className = `customFooter ${wrapperClass}`;

    // 5. Build the columns dynamically
    activeColumns.forEach(colConfig => {
        const col = document.createElement('div');
        col.className = `custom-footer-col ${colConfig.className || ''}`;
        
        const fragment = document.createDocumentFragment();
        let hasContent = false;

        colConfig.items.forEach(key => {
            if (elements[key] && elements[key].length > 0) {
                elements[key].forEach(el => {
                    if (el) {
                        fragment.appendChild(el);
                        hasContent = true;
                    }
                });
            }
        });

        // 6. Render column
        if (hasContent) {
            if (colConfig.title) {
                col.insertAdjacentHTML('beforeend', `<h4>${colConfig.title}</h4>`);
            }
            col.appendChild(fragment);
            customFooter.appendChild(col);
        }
    });

    footerGrid.insertBefore(customFooter, footerGrid.firstChild);
}

if($('body[class*="dev-global-AuroraFooter"]').length){
    buildFlexibleFooter();
}


/**
 * Footer Logo Injection: Contact Column
 * Triggers ONLY if body.dev-global-footerLogoLeftInjection exists.
 * Prepends the agent logo to the top of the native FMG contact column.
 */
function injectFooterLogoLeft() {
    // 1. Check if the body class exists to unlock the script
    if (!document.body.classList.contains('dev-global-footerLogoLeftInjection')) return;

    // 2. Find the native FMG contact column and the original logo
    const contactCol = document.querySelector('footer .c-footer__contact .contact');
    const originalLogo = document.querySelector('img#agentLogo');

    // 3. Make sure we haven't already injected it, and that both elements exist
    if (contactCol && originalLogo && !document.querySelector('.custom-footer-logo-injection')) {
        
        // 4. Create a wrapper for the new logo so it is easy to style
        const logoWrapper = document.createElement('div');
        logoWrapper.className = 'custom-footer-logo-injection';
        
        // 5. Clone the logo and change its ID to prevent duplicates
        const clonedLogo = originalLogo.cloneNode(true);
        clonedLogo.id = 'agentLogoCopy';
        
        // 6. Put the cloned logo in the wrapper, and drop it at the top of the column
        logoWrapper.appendChild(clonedLogo);
        contactCol.prepend(logoWrapper);
    }
}

if (document.querySelector('body.dev-global-footerLogoLeftInjection')) {
    injectFooterLogoLeft();
}

// // ------------------------------------------------------------------
// // AUTO-PLACEHOLDER TOGGLE
// // Only runs if the body has the 'dev-global-form-usePlaceholders' class
// // ------------------------------------------------------------------
// // ------------------------------------------------------------------
// // AUTO-PLACEHOLDER ENGINE (WITH SCOPED FORM TARGETING)
// // ------------------------------------------------------------------

$(document).ready(function() {
// 1. Master Activation Switch (Checks body OR specific form wrappers)
    if ($('body').hasClass('dev-global-form-usePlaceholders') || $('.dev-form-usePlaceholders').length > 0) {
        
        // 2. The Default Global Configuration
        const defaultConfig = {
            hideAllLabels: false, 
            fields: {
                "first name": { placeholder: "e.g., Jane" },
                "name": { placeholder: "e.g., Jane Doe" },
                "last name": { placeholder: "e.g., Doe" },
                "email": { placeholder: "e.g., jane@example.com" },
                "phone": { placeholder: "e.g., (555) 012-3456" },
                "address": { placeholder: "e.g., 123 Main St, Suite 100" }
            },
            forms: {} 
        };

        // 3. Official HTML5 Autocomplete Dictionary
        const autocompleteMap = {
            "first name": "given-name",
            "last name": "family-name",
            "name": "name",
            "email": "email",
            "phone": "tel",
            "address": "street-address",
            "company": "organization",
            "zip code": "postal-code",
            "city": "address-level2",
            "state": "address-level1"
        };

        // 4. Deep Merge Helper Function
        function deepMerge(target, source) {
            for (const key in source) {
                if (source[key] instanceof Object && key in target) {
                    Object.assign(source[key], deepMerge(target[key], source[key]));
                }
            }
            return { ...target, ...source };
        }

        // 5. Merge Dev Config with Defaults
        const devConfig = window.customFormConfig || {};
        const globalConfig = deepMerge(defaultConfig, devConfig);

        // 6. Select all forms and process them
        const forms = document.querySelectorAll('form, .contactForm, .requestPrivacyForm');
        
        forms.forEach(form => {
            let formSpecificConfig = JSON.parse(JSON.stringify(globalConfig)); 
            
            // Check for targeted section wrappers
            if (globalConfig.forms) {
                for (const [sectionSelector, targetedRules] of Object.entries(globalConfig.forms)) {
                    if (form.matches(sectionSelector) || form.closest(sectionSelector)) {
                        formSpecificConfig = deepMerge(formSpecificConfig, targetedRules);
                    }
                }
            }

            const finalHideAllLabels = formSpecificConfig.hideAllLabels;

            // 7. Process the Inputs Directly!
            const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], textarea');
            
            inputs.forEach(input => {
                const inputId = input.getAttribute('id');
                if (!inputId) return;

                // Safely find the label attached to this specific input inside this specific form
                const label = form.querySelector(`label[for="${inputId}"]`);
                
                // Fallback: Use label text, OR the input's name attribute
                let rawText = label ? label.textContent : (input.getAttribute('name') || '');
                
                // Clean the string (Removes colons/asterisks, splits CamelCase to standard words)
                let cleanText = rawText.replace(/[:*]/g, '').replace(/([a-z])([A-Z])/g, '$1 $2').trim();
                const lookupKey = cleanText.toLowerCase();

                // --- A. AUTOCOMPLETE INJECTION ---
                if (!input.hasAttribute('autocomplete') && autocompleteMap[lookupKey]) {
                    input.setAttribute('autocomplete', autocompleteMap[lookupKey]);
                }

                // --- B. PLACEHOLDER & LABEL VISIBILITY LOGIC ---
                const fieldRules = formSpecificConfig.fields[lookupKey] || {};
                
                const shouldHideLabel = fieldRules.hasOwnProperty('hideLabel') 
                                        ? fieldRules.hideLabel 
                                        : finalHideAllLabels;

                let finalPlaceholder;
                
                if (input.tagName.toLowerCase() === 'textarea') {
                    if (fieldRules.placeholder) finalPlaceholder = fieldRules.placeholder;
                    else if (shouldHideLabel) finalPlaceholder = cleanText;
                    else finalPlaceholder = "Please type here...";
                } else {
                    finalPlaceholder = fieldRules.placeholder || cleanText;
                }

                // Apply the placeholder
                input.setAttribute('placeholder', finalPlaceholder);
                
                // Apply accessible hiding class to the label
                if (shouldHideLabel && label) {
                    label.classList.add('dev-sr-only');
                }
            });
        });
    }

// 1. Master Activation Switch (Checks body OR specific form wrappers)
    if ($('body').hasClass('dev-global-form-requiredFields') || $('.dev-form-addRequiredFields').length > 0) {

        // 2. The Default Validation Configuration (Empty by design)
        const defaultValidationConfig = {
            fields: {},
            forms: {} 
        };

        // 3. Deep Merge Helper
        function deepMerge(target, source) {
            for (const key in source) {
                if (source[key] instanceof Object && key in target) {
                    Object.assign(source[key], deepMerge(target[key], source[key]));
                }
            }
            return { ...target, ...source };
        }

        // 4. Merge Dev Config with Empty Defaults
        const devConfig = window.customFormValidationConfig || {};
        const globalConfig = deepMerge(defaultValidationConfig, devConfig);

        // 5. Select all forms
        const forms = document.querySelectorAll('form, .contactForm, .requestPrivacyForm');
        
        forms.forEach(form => {
            // Setup config for this specific form
            let config = JSON.parse(JSON.stringify(globalConfig)); 
            
            // Check for targeted section wrappers
            if (globalConfig.forms) {
                for (const [sectionSelector, targetedRules] of Object.entries(globalConfig.forms)) {
                    if (form.matches(sectionSelector) || form.closest(sectionSelector)) {
                        config = deepMerge(config, targetedRules);
                    }
                }
            }

            // 6. Process the Inputs Directly!
            const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="number"], textarea');
            
            inputs.forEach(input => {
                const inputId = input.getAttribute('id');
                if (!inputId) return;

                // Safely find the label attached to this specific input inside this specific form
                const label = form.querySelector(`label[for="${inputId}"]`);
                
                // Fallback: Use label text, OR the input's name attribute
                let rawText = label ? label.textContent : (input.getAttribute('name') || '');
                let cleanText = rawText.replace(/[:*]/g, '').replace(/([a-z])([A-Z])/g, '$1 $2').trim();
                const lookupKey = cleanText.toLowerCase();
                
                // Look up this specific field in our merged config
                const fieldRules = config.fields[lookupKey];

                // 7. Apply Validation Logic ONLY if the developer defined it
                if (fieldRules && fieldRules.required !== undefined) {
                    const wrapper = input.closest('.form-item') || input.parentElement;

                    if (fieldRules.required === true) {
                        input.setAttribute('required', 'required');
                        input.setAttribute('aria-required', 'true');
                        if (wrapper) wrapper.classList.add('dev-is-required');
                    } 
                    else if (fieldRules.required === false) {
                        input.removeAttribute('required');
                        input.setAttribute('aria-required', 'false');
                        if (wrapper) wrapper.classList.remove('dev-is-required');
                    }
                }
            });
        });
    }
});

/**
 * Relocates a CMS section inside another element.
 * * @param {string} sourceSelector - The section you want to move (e.g., the Form)
 * @param {string} targetSelector - Where you want to put it (e.g., inside the Text box)
 * @param {string} position - 'append' (bottom) or 'prepend' (top). Defaults to 'append'.
 */
function moveSection(sourceSelector, targetSelector, position = 'append') {
    const $source = $(sourceSelector);
    const $target = $(targetSelector);

    // Make sure both elements actually exist on the page before doing anything
    if ($source.length && $target.length) {
        
        // Move the element
        if (position === 'prepend') {
            $source.prependTo($target);
        } else {
            $source.appendTo($target);
        }
        
        // Add a class so your CSS knows this section was moved and needs its padding stripped!
        $source.addClass('dev-is-relocated');
    }
}