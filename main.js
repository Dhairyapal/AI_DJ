song="";
leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

function preload(){
song = loadSound("music.mp3");

}

function draw(){
    image(video , 0 , 0 , 600 , 500);

    fill("#eb0000");
    stroke("#eb0000");

    circle(rightwristX,rightwristY,20)
    if(rightwristY>0 && rightwristY <= 100){
        Document.getElementById("speed").innerHTML = "speed = 0.5";
        song.rate(0.5);
    }
    else if(rightwristY>100 && rightwristY <= 200){
        document.getElementById("speed").innerHTML = "speed = 1";
        song.rate(1);
    }

    else if(rightwristY>200 && rightwristY<=300){
        document.getElementById("speed").innerHTML = "speed = 1.5";
        song.rate(1.5);
    }
    else if(rightwristY>300 && rightwristY<=400){
        document.getElementById("speed").innerHTML = "speed = 2";
        song.rate(2);}
    else if(rightwristY>400 && rightwristY<=500){
            document.getElementById("speed").innerHTML = "speed = 2.5";
            song.rate(2.5);}

    if(scoreLeftWrist>0.2){

    circle(leftwristX,leftwristY,20);
    INleftWristy = Number(leftwristY);
    removeDECIMALS = floor(INleftWristy);
    volume = removeDECIMALS/500;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);

    }
}
function setup(){
    canvas = createCanvas(600 , 500 );
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on('pose' , gotposes); 

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("model is loaded");
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftwristX +" leftWristY = "+ leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightWrist = " + rightwristX +" rightWristY = "+ rightwristY);
    }
}