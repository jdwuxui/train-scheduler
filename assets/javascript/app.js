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
    var trainNameText = $("#train-name-input").val().trim();
    var destinationText = $("#destination-input").val().trim();
    var firstTrainTimeText = $("#first-time-input").val().trim();
    var frequencyText = $("#frequency-input").val().trim();
    // C-Logged ^^^^

    // Make inputs a temp object for train data
    var newTrainToAdd = {
        newTrainName: trainNameText,
        city: destinationText,
        firstArrival: firstTrainTimeText,
        freq: frequencyText
    };

    // Add new train data to Firebase DB
    database.ref().push(newTrainToAdd);
    // *** Confirmed ^
    alert("Your train was successfully added to the schedule.");
    //Clear form fields
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-time-input").val("");
});

// EVENT HANDLER
database.ref().on("child_added", function (childSnapshot) {
    // Store form field inputs
    var trainNameText = childSnapshot.val().newTrainName;
    var destinationText = childSnapshot.val().city;
    var firstTrainTimeText = childSnapshot.val().firstArrival;
    var frequencyText = childSnapshot.val().freq;

    // Create a new row
    var newTrainToAdd = $("<tr>").append(
        $("<td>").text(trainNameText),
        $("<td>").text(destinationText),
        $("<td>").text(frequencyText),
        $("<td>").text(firstTrainTimeText),
    );

    // Append row to table
    $("#train-table > tbody").append(newTrainToAdd)
});