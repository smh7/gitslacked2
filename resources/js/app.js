$("document").ready(function(){

    $("#searchContainer").hide();

    $("#newCard").on("click", function(){
        $(".repoCards").hide();
        $("#searchContainer").show();
        // Need User, Repo, and Branch from GitHub (maybe have branch default to Master?)
    }); // end of newCard click event






}); // end of document.ready