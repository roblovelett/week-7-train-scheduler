$(document).ready(function () {

    //Firebase
    var config = {
        apiKey: "AIzaSyD7oxxbtHVq_GWxb4SgYeCnUx4bBqi87nc",
        authDomain: "week-7-train-scheduler.firebaseapp.com",
        databaseURL: "https://week-7-train-scheduler.firebaseio.com",
        storageBucket: "week-7-train-scheduler.appspot.com",
        messagingSenderId: "758783616433"
    };
    firebase.initializeApp(config);

    var db = firebase.database();

    //initial html
    (function () {

        var txt = {
            eng: {
                header: "Current Train Schedule",
                subtitle: "Choo Choo Chee Chee",
                output: {
                    col_01: "Train Name",
                    col_02: "Destination",
                    col_03: "Frequency",
                    col_04: "Next Arrival",
                    col_05: "Minutes Away"
                },
                input: {
                    header: "Add Train",
                    row_03: "First Train Time (HH:mm - military time)",
                    row_04: "Frequency (min)",
                    btn: "Submit"
                }
            }
        };

        $("#header").html(build_html("h1", {}, txt.eng.header) + build_html("p", {}, txt.eng.subtitle));
        $("#output_header").html(build_html("h4", {}, txt.eng.header));
        output_titles(txt.eng.output.col_01, txt.eng.output.col_02, txt.eng.output.col_03, txt.eng.output.col_04, txt.eng.output.col_05);
        $("#input_header").html(build_html("h4", {}, txt.eng.input.header));
        $("#input").html(build_html("form", {
            id: "input_form"
        }, ""));
        new_form("name", txt.eng.output.col_01, "name_input");
        new_form("dest", txt.eng.output.col_02, "dest_input");
        new_form("time", txt.eng.input.row_03, "time_input");
        new_form("freq", txt.eng.input.row_04, "freq_input");
        $("#input_form").append(build_html("button", {
            id: "submit",
            class: "btn btn-primary",
            name: "submit",
            onclick: "return false",
            type: "button"
        }, txt.eng.input.btn));

        function output_titles(txt01, txt02, txt03, txt04, txt05) {
            var txt_array = [txt01, txt02, txt03, txt04, txt05];
            for (i = 0; i < txt_array.length; i++) {
                $("#output_titles").append(build_html(
                    "th", {}, build_html(
                        "strong", {}, txt_array[i]
                    )
                ));
            };
        };

        function new_form(label_for, label, input_id) { //helper function to build html for new forms
            var lbl_for = label_for,
                lbl = label,
                inp = input_id;
            $("#input_form").append(build_html(
                "div", {
                    class: "form-group"
                }, build_html(
                    "label", {
                        for: lbl_for
                    }, lbl) + build_html(
                    "input", {
                        type: "text",
                        class: "form-control",
                        id: inp,
                        value: ""
                    }, "")
            ));
        };

    })(); //run once

    $("header").append(moment().format("hh:mm"));




    $("#submit").on("click", function () {

        var train_num = $('#output tr').length + 1;
        var name = $("#name_input").val().trim(); //train name
        var dest = $("#dest_input").val().trim(); //Destination
        var time = $("#time_input").val().trim(); //first train time
        var freq = parseInt($("#freq_input").val().trim()); //freq

        time = moment(time, "hh:mm"); //format time to use moment.js    

        //var times = [time]; //init train stop times, push first stop
        //var current_time = moment();

        console.log(
            "train_num: " + train_num + " | " + 
            "train_name: " + name + " | " + 
            "train_dest: " + dest + " | " + 
            "train_first_stop_time: " + time +  
            "train_freq: " + freq + " | " + 
            //"train_times_array: " + time + " | " + 
            "current_time: " + moment() //+ current_time 
        );
        
        var time_diff = 0; //init
        
        for (i = 0; i < 1440 /*mins in day*/ ; i += freq) { //populate array of times of train stops
            time = moment(time).add(freq, 'm');
            time_diff = parseInt(moment.duration(time.diff(moment()/*current_time*/)).asMinutes());
            if (time_diff >= 0) {
                var time_next_arrival = time;
                break;
            };
        };
        
        /*
        var time_diff = 0; //init

        for (i = 0; i < times.length; i++) {

            time_diff = parseInt(moment.duration(times[i].diff(current_time)/*current_time.diff(times[i])*///).asMinutes());
            //time_diff = -time_diff > 0 ? -time_diff : time_diff; //make time difference positive
            /*console.log(time_diff);
            
            if (time_diff >= 0) {
                var time_next_arrival = times[i];
                break;
            };
            /*if (time_diff <= freq) {
                var time_next_arrival = times[i];
                break;
            };*/
        /*};
*/
        //html
        var pre = "train_" + train_num;

        $("#output").append(build_html("tr", {
                id: pre
            },
            build_html("th", {
                class: pre,
                id: pre + "_name"
            }, name) +
            build_html("th", {
                class: pre,
                id: pre + "_dest"
            }, dest) +
            build_html("th", {
                class: pre,
                id: pre + "_freq"
            }, freq) +
            build_html("th", {
                class: pre,
                id: pre + "_arrival"
            }, moment(time_next_arrival).format("hh:mm")) +
            build_html("th", {
                class: pre,
                id: pre + "_mins"
            }, time_diff)
        ));

        $("form").trigger("reset"); //clear fields

        return false; // Return "false"to allow "enter"

    });





/*    $("#submit").on("click", function () {
        
        var train_num = $('#output tr').length + 1;
        var name = $("#name_input").val().trim(); //train name
        var dest = $("#dest_input").val().trim(); //Destination
        var time = $("#time_input").val().trim(); //first train time
        var freq = parseInt($("#freq_input").val().trim()); //freq

        time = moment(time, "hh:mm"); //format time to use moment.js    

        var times = [time]; //init train stop times, push first stop
        var current_time = moment();

        console.log(
            "train_num: " + train_num + " | " + 
            "train_name: " + name + " | " + 
            "train_dest: " + dest + " | " + 
            "train_first_stop_time: " + times + " | " + 
            "train_freq: " + freq + " | " + 
            "train_times_array: " + times + " | " + 
            "current_time: " + current_time 
        );



        for (i = 0; i < 1440 /*mins in day*//* ; i += freq) { //populate array of times of train stops
            time = moment(time).add(freq, 'm'); 
            times.push(time);
            // if (time.diff)
            console.log(times[i].diff(current_time));
            if (times[i].diff(current_time) > 0) {
                var time_next_arrival = times[i];
                break;
            };
};*/
        
        /*
        for (i = 0; i < times.length; i++) {

            time_diff = parseInt(moment.duration(times[i].diff(current_time)/*current_time.diff(times[i])*///).asMinutes());
            //time_diff = -time_diff > 0 ? -time_diff : time_diff; //make time difference positive
            /*
            if (time_diff > 0 && time_diff <= freq) {
                var time_next_arrival = times[i];
                break;
            };
};*/

        //html
        /*var pre = "train_" + train_num;

        $("#output").append(build_html("tr", {
                id: pre
            },
            build_html("th", {
                class: pre,
                id: pre + "_name"
            }, name) +
            build_html("th", {
                class: pre,
                id: pre + "_dest"
            }, dest) +
            build_html("th", {
                class: pre,
                id: pre + "_freq"
            }, freq) +
            build_html("th", {
                class: pre,
                id: pre + "_arrival"
            }, moment(time_next_arrival).format("hh:mm")) +
            build_html("th", {
                class: pre,
                id: pre + "_mins"
            }, time_diff)
        ));

        $("form").trigger("reset"); //clear fields

        return false; // Return "false"to allow "enter"

    });
*/
    //helper functions
    function build_html(tag, attrs, inner_html) { //helper function to build html tags
        var h = '<' + tag; //opening tag       
        for (var attr in attrs) {
            if (attrs[attr] === false) {
                continue;
            };
            h += ' ' + attr + '="' + attrs[attr] + '"';
        };
        return h += inner_html ? '>' + inner_html + '</' + tag + '>' : '/>';
    };

});

/*
database.ref().on("child_added", function(snapshot) {
  var randomDate = snapshot.val().startDate;
  var convertedDate = moment(randomDate, "MM/DD/YYYY");
  convertedDate.format("MM/DD/YY");
  convertedDate.toNow();
  var monthsWorked = moment().diff(convertedDate, "months");
  var totalBilled = monthsWorked * snapshot.val().rate;
  $("#employeeArea").append("<tr><td>"+ snapshot.val().name+"</td><td>"+ snapshot.val().role+"</td><td>"+ snapshot.val().startDate+"</td><td>"+ monthsWorked+"</td><td>"+ snapshot.val().rate+"</td><td>"+"$"+ totalBilled+"</td><tr>");
});

$("#submitButton").on("click", function() {

    var name = $("#employeeNameInput").val().trim();
    var role = $("#roleInput").val().trim();
    var startDate = $("#firstTimeInput").val().trim();
    var rate = parseInt($("#rateInput").val().trim());


    // Save the new price in Firebase
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate
    });

    $("form").trigger("reset");

    // Return "false"to allow "enter"
    return false;
});
*/