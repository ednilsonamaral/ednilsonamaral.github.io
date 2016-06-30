$(document).ready(function() {
    //function toggleSidebar() {
        //$(".wrapper").toggleClass("move-to-bottom");
        //$("#nav-toggle").toggleClass("active");
    //}

    $("#nav-toggle").on("click tap", function() {
        $(".wrapper").toggleClass("move-to-bottom");
        $("#nav-toggle").toggleClass("active");
        $("nav ul").toggleClass("menu-list");
        //toggleSidebar();
    });
});
