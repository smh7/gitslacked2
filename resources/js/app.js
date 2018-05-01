
$("document").ready(function(){

    $("#searchContainer").hide();

    $("#newCard").on("click", function(){
        $(".repoCards").hide();
        $("#searchContainer").show();
        // Need User, Repo, and Branch from GitHub (maybe have branch default to Master?)
    }); // end of newCard click event






}); // end of document.ready
// Test Data
let avatar_urlTest = 'https://avatars1.githubusercontent.com/u/36715261?v=4';
let usernameTest = 'Testy McTest';
let emailTest = 'r@t.com';
let repo_linkTest = 'https://github.com/adamlacasse';


// Initialize Firebase
const config = {
    apiKey: "AIzaSyDqM96DQL3V6Hc94P1uBAGyWiML-moreWM",
    authDomain: "gitslacked2.firebaseapp.com",
    databaseURL: "https://gitslacked2.firebaseio.com",
    projectId: "gitslacked2",
    storageBucket: "gitslacked2.appspot.com",
    messagingSenderId: "515555071574"
  };
  firebase.initializeApp(config);

  const database = firebase.database();

  // HTML UI elements
  // test push
//   database.ref().push({
//   user: "smh7",
//   repo: "trains",
//   branch: "master"
// }
// );
console.log("made it to here");

    // Firebase watcher + initial loader
    database.ref().on("child_added", function(childSnapshot) {
      
      const user = childSnapshot.val().user,
            repo = childSnapshot.val().repo,
            branch = childSnapshot.val().branch;
      
      // Instantiate UserBranchRepoCard object
      const userRepoBranchCard = new UserRepoBranchCard(user, repo, branch);
      
      //----------Need to add call to gitconnect.js ---------//
      //
      //---------Need to populate data specific to what we get back from calls --//
      // userRepoBranchCard.everything
      // Need to customize card fields specific to what we want to show

      // building out the card and adding it to the page
      const cardSection = document.getElementById('card-space');
      const card = document.createElement('div');
      card.innerHTML = `
      <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${avatar_urlTest}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${userRepoBranchCard.user}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
      <div class="card-body">
        <a href="${repo_linkTest}" target="_blank" class="card-link">Repo link</a>
        <a href="#" class="card-link" target="_blank">Another link</a>
      </div>
    </div>
      `
      cardSection.append(card);
            
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

function UserRepoBranchCard(user, repo, branch) {
  this.user = user;
  this.repo = repo;
  this.branch = branch;
  console.log("greetings from inside the constructor");
};

function UI() {};

UI.prototype.addUserRepoBranchCardToPage = function(userRepoBranchCard) {
  database.ref().push({
      user: "smh7",
      repo: "trains",
      branch: "master"
    });
  const cardSection = document.getElementById('card-space');
  const card = document.createElement('div');
  div.innerHTML = `
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${avatar_urlTest}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${usernameTest}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
  <div class="card-body">
    <a href="${repo_linkTest}" class="card-link">Repo link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
  `
}



