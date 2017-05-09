
var browserHeight = viewport().height;
var scrollImgStyle = null;
var maxTime = 0;
var videoTop = 0;
var videoHeight = 0;
var video = null;

var stopScrollFrac = -0.2;
var startScrollFrac = 0.5;

var fps, fpsInterval, startTime, now, then, elapsed;

function setup() {

	if (video != null)
		return;
	if(useScrollVideo()==false) {
		window.onscroll = "";
		window.onresize = "";
		document.body.onload = "";
		scrollVideoToCenterPosition();
		return;
	}
	video = document.getElementById('video');
	
	video.play();
	video.pause();
	videoTop = findPosY(video);
	videoHeight = parseInt(video.height || video.style.height);
	// video duration in seconds
	maxTime = 3;

	
	var scrollOffset = document.body.scrollTop || window.pageYOffset;
	if (scrollOffset == 0) {
		// don't allow startScrollFrac to be greater than current scroll fraction
		startScrollFrac = Math.min(startScrollFrac, getScrollFraction());
	}
	
	startAnimating(30);
}

function pauseVideo(vid) {
	//vid.pause();
}

// initialize the timer variables and start the animation
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved
function animate() {

    // request another frame
    requestAnimationFrame(animate);

    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
        scrolled();

    }
}

function scrolled() { 

	if(video==null)	
		return;
	
	var scrollOffset = document.body.scrollTop || window.pageYOffset;
	
	// if video within visible scroll area
	if(videoTop+videoHeight>scrollOffset && videoTop<scrollOffset+browserHeight) {
		
		var representiveScrollFrac = getScrollFraction();
		representiveScrollFrac = Math.max(representiveScrollFrac, stopScrollFrac);
		representiveScrollFrac = Math.min(representiveScrollFrac, startScrollFrac);
		representiveScrollFrac = representiveScrollFrac - stopScrollFrac;
		
		var time = (1 - (representiveScrollFrac / (startScrollFrac - stopScrollFrac))) * maxTime;
		
		video.currentTime = time;
		
	} 
}

function getScrollFraction() {
	var scrollOffset = document.body.scrollTop || window.pageYOffset;
	return (videoTop - scrollOffset)  / browserHeight;
}

function browserResized() {
	browserHeight = viewport().height;
	scrolled();
}

function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (1) {
            curtop+=obj.offsetTop;
            if (!obj.offsetParent) {
                break;
            }
            obj=obj.offsetParent;
        }
    } else if (obj.y) {
        curtop+=obj.y;
    }
    return curtop;
}

function scrollVideoToCenterPosition() {
	//most pages have the image in the center position by default, but lets just make sure it's correctly displayed
/*
	var scrollImage = document.getElementById('scrollImg');
	var imageBoxHeight = parseInt(scrollImg.parentNode.style.height);
	var maximumOffset = scrollImg.height-imageBoxHeight;
	scrollImage.style.top = (maximumOffset/-2)+'px';
*/
}

function viewport()
{
	var e = window, a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function useScrollVideo() {
	return true;
}

