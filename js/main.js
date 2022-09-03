$(document).ready(function (){

    // offset the header top by the navbar height
    
    // let nav_height = $(".navbar").outerHeight();
    // alert(nav_height);
    // $("header").css("top", nav_height);


    // use jQuery to scroll to selected section
    $(".navbar a").click(function () {
        // console.log("#" + $(this).data("value"));
        const section_offset = $("#" + $(this).data("value")).offset().top;
        const nav_height = $(".navbar").outerHeight();

        $("body,html").animate(
            {
                scrollTop: section_offset-nav_height,
            },
            1000
        );
    });

    $(".carousel-item").attr("data-bs-interval", 5000);

});