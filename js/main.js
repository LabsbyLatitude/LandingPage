// add a custom playing property to video elements
// https://stackoverflow.com/questions/6877403/how-to-tell-if-a-video-element-is-currently-playing
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        // return !!(this.currentTime >= 0 && !this.paused && !this.ended && this.readyState > 2);
        return !!(!this.paused);
    }
})

$(document).ready(function () {
    
    // offset the header top by the navbar height
    
    // let nav_height = $(".navbar").outerHeight();
    // alert(nav_height);
    // $("header").css("top", nav_height);

    // Set click handler for nav bar links
    $(".navbar a, .hero a").click(function () {
        
        // get the name of the link, and thus it's corresponding page
        // section
        const section_name = $(this).data("value");
        
        // for donation link, skip for now
        if (section_name === 'donate') {
            
        }
        // otherwise use jQuery to scroll to selected section
        else {

            // console.log("#" + $(this).data("value"));
            const section_offset = $("#" + section_name).offset().top;
            const nav_height = $(".navbar").outerHeight();
    
            $("body,html").animate(
                {
                    scrollTop: section_offset - nav_height,
                },
                1000
            );
        }
                    
    });

    $(".carousel-item").attr("data-bs-interval", 5000);


    // Play/Pause feature videos when within a middle horizontal band/region of the
    // screen whenever the window scrolls
    $(window).scroll(function () {
        // get all feature videos
        // let videos = document.getElementsByClassName("f-vid");
        // loop over each and check location on screen
        // for(let video of videos){ console.log(video.id); }

        $(".f-vid video").each(playVideoHandler);
    });

    // play video when hovered over
    $(".f-vid video").mouseenter(function (event) {
        // change box shadow color
        // $(this).animate({
        //     "box-shadow": "0px 0px 15px 1px rgba(116, 28, 135, .6)"
        // }, 100);
        $(this).css("box-shadow", "0px 0px 15px 1px rgba(116, 28, 135, .6)");

        // if (!this.playing)
        this.play();
    });
    
    // pause video on mouse leave if it's outside of the viewport play region
    $(".f-vid video").mouseleave(playVideoHandler);

    /**
     * Play or pause the video html element this function is called in the context
     * of depending on whether the it's within a center region of the viewport.
     */
    function playVideoHandler() {
        let viewportHeight = window.innerHeight; // height of window in pixels
        let scrollTop = $(document).scrollTop(); // get scroll position of window

        // define viewport play range. include offset for navbar.
        let topLimit = 0 + $(".navbar").outerHeight();
        let topLimit2 = viewportHeight / 3 + $(".navbar").outerHeight();
        let bottomLimit = viewportHeight * 3 / 4;
        let bottomLimit2 = viewportHeight * 2 / 3;

        let boundingRect = this.getBoundingClientRect();
        let videoTop = boundingRect.top; // top edge of video
        let videoCenter = boundingRect.top + boundingRect.height / 2; // center of video

        // play if video is within center region of screen

        // if(videoCenter >= topLimit2 && videoCenter < bottomLimit2){ 
        if (videoTop >= topLimit && videoTop < bottomLimit) {
            // change box shadow color
            // $(this).animate({
            //     "box-shadow": "0px 0px 15px 1px rgba(116, 28, 135, .6)"
            // }, 100);
            $(this).css("box-shadow", "0px 0px 15px 1px rgba(116, 28, 135, .6)");

            this.play();
        }
        else {
            // reset box-shadow to original value defined in css file
            // $(this).animate({
            //     box-shadow: "" 
            // }, 100);
            $(this).css("box-shadow", "");
            
            this.pause();
        }

        // console.log(`mouseleave: video [${this.id}] top: ${videoTop} top/vh: ${videoTop/viewportHeight}`);
    }

});