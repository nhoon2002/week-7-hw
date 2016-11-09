//Initialize Firebase
var config = {
  apiKey: "AIzaSyDnE8O14I4Tm0hdG0WIL1ZAXZRGKEnr2yc",
  authDomain: "fir-tester-5e288.firebaseapp.com",
  databaseURL: "https://fir-tester-5e288.firebaseio.com",
  storageBucket: "fir-tester-5e288.appspot.com",
  messagingSenderId: "1022221600483"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();


$('#addTrainBtn').on('click', function() {

   var inputName = $('#trainNameInput').val().trim();
   var inputDest = $('#destinationInput').val().trim();
   var inputFirst = $('#firstInput').val().trim();
   var inputFreq = $('#frequencyInput').val().trim();


   //Local variable to hold data
   var newTrain = {
      name: inputName,
      destination: inputDest,
      first: inputFirst,
      frequency: inputFreq
   }

   database.ref().push(newTrain);
   console.log(inputName, inputDest, inputFirst, inputFreq);

   $('#trainNameInput').val('');
   $('#destinationInput').val('');
   $('#firstInput').val('');
   $('#frequencyInput').val('');

   //Prevents reload
   return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

   console.log(childSnapshot.val());

   var inputName = childSnapshot.val().name;
   var inputDest = childSnapshot.val().destination;
   var inputFirst = childSnapshot.val().first;
   var inputFreq = childSnapshot.val().frequency;

   console.log(inputName, inputDest, inputFirst, inputFreq);

   //Maths
   // TODO: Need: next arrival (hh:mm) and minutes away.
   var tFrequency = inputFreq;
   var firstTime = inputFirst; // Time is 3:30 AM

   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
   console.log(firstTimeConverted);

   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);

   // Time apart (remainder)
   var tRemainder = diffTime % tFrequency;
   console.log(tRemainder);

   // Minute Until Train
   var tMinutesTillTrain = tFrequency - tRemainder;
   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes")
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

   $("#trainTable > tbody").append("<tr><td>" + inputName + "</td><td>" + inputDest + "</td><td>" + inputFreq + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
