$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyAymN796PyyZmEVAUPCsFuPj2dBh1xmeYs",
        authDomain: "click-counter-harcam-727a1.firebaseapp.com",
        databaseURL: "https://click-counter-harcam-727a1.firebaseio.com",
        projectId: "click-counter-harcam-727a1",
        storageBucket: "click-counter-harcam-727a1.appspot.com",
        messagingSenderId: "119505640045",
        appId: "1:119505640045:web:682af60e44b2d489"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#save").on("click", function (e) {
        e.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTime = $("#firstTime").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
        });

    });

    database.ref().on("child_added", function (snapshot) {
        var data = snapshot.val();
        if (!data) {
            return;
        }

        var tFrequency = data.frequency;

        // Time is 3:30 AM
        var firstTime = data.firstTime;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
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
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var html = `<tr>
                                      
                                      <td>${data.trainName}</td>
                                      <td>${data.destination}</td>
                                      <td>${data.frequency}</td>
                                      <td>${nextTrain}</td>
                                      <td>${tMinutesTillTrain}</td>
                                    </tr>`;

        $("#trainSection").append(html);
    });

});


