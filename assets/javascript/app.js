// Initialize Firebase
var config = {
    apiKey: "AIzaSyD-KpSGyr4-NWrCLFUOMU_1osYBJ1McHTs",
    authDomain: "time-railz-train-scheduler.firebaseapp.com",
    databaseURL: "https://time-railz-train-scheduler.firebaseio.com",
    projectId: "time-railz-train-scheduler",
    storageBucket: "time-railz-train-scheduler.appspot.com",
    messagingSenderId: "1098841836940"
};
firebase.initializeApp(config);

// Firebase global var
var database = firebase.database();

// Capture submit button click
$("#add-train").on("click", function (event) {
    // prevent form submit
    event.preventDefault();
    // Grab form inputs
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    // C-Logged ^^^^

    // Make inputs a temp object for train data
    var newTrain = {
        newTrainName: trainName,
        city: destination,
        firstArrival: firstTrainTime,
        freq: frequency
    };

    // Add new train data to Firebase DB
    database.ref().push(newTrain);
    // *** Confirmed ^
    alert("Your train was successfully added to the schedule.");
    //Clear form fields
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
});


// EVENT HANDLER
database.ref().on("child_added", function (childSnapshot) {
      // Store everything into a variable.
  trainName = childSnapshot.val().newTrainName;
  destination = childSnapshot.val().city;
  firstTrainTime = childSnapshot.val().firstArrival;
  frequency = childSnapshot.val().freq;

    // Create a new row
    newRow = $("<tr>").append(
        $("<td>").text(newTrain),
  );

  // Append new row to table
  $("#train-table > tbody").append(newTrain)
});