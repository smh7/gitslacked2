const config = {
  apiKey: "AIzaSyBqragHyUywzh5m-LXkYUs2DjZSapHVRZY",
  authDomain: "train-schedules-a58f9.firebaseapp.com",
  databaseURL: "https://train-schedules-a58f9.firebaseio.com",
  projectId: "train-schedules-a58f9",
  storageBucket: "train-schedules-a58f9.appspot.com",
  messagingSenderId: "419016845213"
};
 // Initialize Firebase
firebase.initializeApp(config);
const database = firebase.database();

// HTML UI elements
const scheduleTbl = document.getElementById('train-list');
// test push
// database.ref().push({
//   TrainName: "Got it yet?",
//   destination: "Portsmouth, NH",
//   firstTrainTime: "0800",
//   frequency: 102
// }
// );

    // Firebase watcher + initial loader
    database.ref().on("child_added", function(childSnapshot) {
      
      const trainName = childSnapshot.val().TrainName,
      destination = childSnapshot.val().destination,
      firstTrainTime = childSnapshot.val().firstTrainTime;
      frequency = childSnapshot.val().frequency;
      
      console.log(trainName);
      // Instantiate Train object
      const train = new Train(trainName, destination, firstTrainTime, frequency);
      console.log("child below");
      console.dir(childSnapshot);
      debugger;
      console.dir(train);
      console.log(train.nextArrival);
      console.log(train.minutesAway);
      // full list of items to the well
      const row = document.createElement('tr');
      

      row.innerHTML = `
      <tr>
      <td>${childSnapshot.val().TrainName}</td> 
      <td>${childSnapshot.val().destination}</td>
      <td>${childSnapshot.val().frequency}</td>
      <td>${train.nextArrival}</td>
      <td>${train.minutesAway}</td>
      </tr>`;
      scheduleTbl.append(row);
            
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

/*
// IIFE - Immediately Invoked Function
(function() {
 
  // Get elements
  const preObject = document.getElementById('object');
  const ulList = document.getElementById('list');
  // const list = document.getElementById('train-list');
  

  // Create references
  const dbRefObject = firebase.database().ref();
  //const dbRefList = dbRefObject.child('train01');
  

  // Synchronize data in realtime with on method
  // Whenever data changes we want to know about it
  // with value and on, we get an update whenever change is made
  // need to reference snap.val() to get the value
  dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3);
    // Create tr element
  //   const row = document.createElement('tr');
  //   var trainName = firebase.database(),ref()
  //   // Insert columns
  //   // Need to calculate nextArrival and minutesAway
  //   row.innerHTML = `
  //   <td>${snap.object.train01.trainName}</td>
  //   <td><a href="#" class="delete">X</a></td>
  // `;

  //   list.appendChild(row);
    
  })
  
  // Synchronize List Changes
  // dbRefList.on('child_added', snap => console.log(snap.val()));
}());
*/



// Train Constructor
function Train(trainName, destination, firstTrainTime, frequency) {
  this.trainName = trainName;
  this.destination = destination;
  this.firstTrainTime = firstTrainTime;
  this.frequency = frequency;
  console.log("greetings from inside constructor");
  // Not sure about the calculated fields
  // First Time (pushed back 1 year to make sure it comes before current time_)
  let firstTimeConverted = moment(this.firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  // Current Time
  let currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
  // Difference between the times
  let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % this.frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = this.frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // this.nextArrival = nextTrain;
  this.nextArrival = moment(nextTrain).local().format("ddd, hh:mm");
  // this.nextArrival = nextArrivalGMT.local().format('ddd, hA');

  
  this.minutesAway = tMinutesTillTrain;
}



// UI Constructor
function UI() {}

// Add Train to List
UI.prototype.addTrainToList = function(train){
  database.ref().push({
    TrainName: train.trainName,
    firstTrainTime: train.firstTrainTime,
    frequency: train.frequency
  });
  const list = document.getElementById('train-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert columns
// Need to calculate nextArrival and minutesAway
  row.innerHTML = `
    <td>${train.trainName}</td>
    <td>${train.destination}</td>
    <td>${train.frequency}</td>
    <td>${train.nextArrival}</td>
    <td>${train.minutesAway}</td>
  `;
  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add Classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#train-schedule-form');
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Train
UI.prototype.deletTrain = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }

}

// Clear Form Fields
UI.prototype.clearFields = function() {
  document.getElementById('train-name-input').value = '';
  document.getElementById('destination-input').value = '';
  document.getElementById('first-train-time-input').value = '';
  document.getElementById('frequency-inputl').value = '';  
  
}

// Event listeners for Add Train
document.getElementById('train-schedule-form').addEventListener('submit', function(e){
  e.preventDefault();

// Get form values
const trainName = document.getElementById('train-name-input').value,
      destination = document.getElementById('destination-input').value,
      firstTrainTime = document.getElementById('first-train-time-input').value;
      frequency = document.getElementById('frequency-input').value;
      
console.log(trainName);
// Instantiate Train object
const train = new Train(trainName, destination, firstTrainTime, frequency);
console.dir(train);

// Instantiate UI
const ui = new UI();

// Validate
if(trainName === '' || destination === '' || firstTrainTime === '' || frequency === '') {
  // Error alert
  ui.showAlert('Please fill in all fields', 'error');
} else {
  // Push Train to database
  
  // Add Train to list
ui.addTrainToList(train);

// Show Success
ui.showAlert('Train Added!', 'success');

// Clear Fields
ui.clearFields();
}

  
});

// Event Delegation - Event Listener for Delete
// Because this is dynamic attach to parent book-list
document.getElementById('train-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  ui.deletTrain(e.target);

  // Show alert
  ui.showAlert('Train Removed', 'success');

  
  e.preventDefault();

});

// database.ref().on("value", function(snapshot) {
//   var trainData = snapshot.val();
//   console.log(trainData);
// });
