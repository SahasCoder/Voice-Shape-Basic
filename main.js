x = 0;
y = 0;
draw_apple = "";
screen_width = 0;
screen_height = 0;
to_number = 0;
apple = "";

function preload() {
    apple = loadImage("https://i.postimg.cc/k531Vcm0/apple-image-png.jpg");
}

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
    document.getElementById("status").innerHTML = "System is listening, please speak";
    recognition.start();
}


recognition.onresult = function (event) {
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "The speech has been recognised as " + content;

    to_number = Number(content);
    if (Number.isInteger(to_number)) {
        document.getElementById("status").innerHTML = "Started drawing apple";
        draw_apple = "set";
    } else {
        document.getElementById("status").innerHTML = "Nothing recognised";
    }
}

function setup() {
    canvas = createCanvas(900 , 900);
    canvas.center();
}

function draw() {
    if (draw_apple == "set") {
        for (var i = 1; i <= to_number; i++) {
            x = Math.floor(Math.random() * 900);
            y = Math.floor(Math.random() * 600);
            image(apple, x, y, 50, 50);
        }
        document.getElementById("status").innerHTML = to_number + " apple drawn";
        speak_data = to_number + " apple drawn";
        speak();
        draw_apple = "";
    }
}

function speak(){
    var synth = window.speechSynthesis;
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    speak_data = "";
}