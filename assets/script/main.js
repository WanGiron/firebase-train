 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBHtREsa-JFG8UQShDDUmppqMfVq108nY0",
    authDomain: "other-data-base.firebaseapp.com",
    databaseURL: "https://other-data-base.firebaseio.com",
    projectId: "other-data-base",
    storageBucket: "other-data-base.appspot.com",
    messagingSenderId: "341171663788"
  };
  firebase.initializeApp(config);

// Global variables
var trainName = $("#trainNameVal").val();
var destination = $("#destinationVal").val();
var firstTrain = $("#trainTime").val();
var frequency = $("#frequencyVal").val();
var database = firebase.database();


// adding values to data base
$("#submitBtn").on('click', function(event){
    event.preventDefault();
// getting firstTime train
    var frequency = $("#frequencyVal").val().trim();
    var frequencyTime = moment(frequency, "mm").format("mm");

// current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
// getting first time train
    var firstTrain = $("#trainTime").val().trim();
    var timeToMinutes = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(timeToMinutes);

// Difference between the times
    var diffTime = moment().diff(moment(timeToMinutes), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

// Minute Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

// Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


// pushing values to database
    database.ref('schedule').push({
    train: $("#trainNameVal").val(),
    destination: $("#destinationVal").val(),
    frequencyTrainTime: $("#frequencyVal").val(),
    nextArrival: moment(nextTrain).format("HH:mm"),
    trainMinutesAway: minutesAway 
 });
})

database.ref('schedule').on("child_added", function(snapshot) {

// generate train entry
      var pTag = $("<p>");
      pTag.addClass("pClass");
      pTag.append(snapshot.val().train + "<br>");
      $("#trainN").append(pTag);

// generate destination entry
      var pTag2 = $("<p>");
      pTag2.addClass("pClass");
      pTag2.append(snapshot.val().destination + "<br>");
      $("#destin").append(pTag2);

// generate frequency train entry
      var pTag3 = $("<p>");
      pTag3.addClass("pClass");
      pTag3.append(snapshot.val().frequencyTrainTime + "mins" + "<br>");
      $("#frequent").append(pTag3);

// generate next arrival train entry
      var pTag4 = $("<p>");
      pTag4.addClass("pClass");
      pTag4.append(snapshot.val().nextArrival + "<br>");
      $("#arrival").append(pTag4);

// generate frequency train entry
      var pTag5 = $("<p>");
      pTag5.addClass("pClass");
      pTag5.append(snapshot.val().trainMinutesAway + "mins" + "<br>");
      $("#timeLeft").append(pTag5);
    },
)