var images=new Array('img1.jpg','img2.jpg','img3.jpg','img4.jpg','img5.jpg');
var nextimage=0;
doSlideshow();

function doSlideshow(){
    if(nextimage>=images.length){nextimage=0;}
    $('.container')
    .css('background-image','url("public/'+images[nextimage++]+'")')
    .fadeIn(500,function(){
        setTimeout(doSlideshow,6000);
    });
}
let songIndex=0;
let audio =new Audio('public/song1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=document.getElementsByClassName('songItem');
let songs=[
    {
        songName:"Let Me Love You", filePath:"http://127.0.0.1:5500/public/song1.mp3",coverPath:"public/cover1.jpeg",
    },
    {
        songName:"Masoomiat", filePath:"http://127.0.0.1:5500/public/song2.mp3",coverPath:"public/cover2.jpg",
    },
    {
        songName:"Mera Yaar (Lekh)", filePath:"http://127.0.0.1:5500/public/song3.mp3",coverPath:"public/cover3.jpg",
    },

    {
        songName:"Unstoppable (Sia)", filePath:"http://127.0.0.1:5500/public/song4.mp3",coverPath:"public/cover4.jpg",
    },
    {
        songName:"Dior - Shubh", filePath:"http://127.0.0.1:5500/public/song5.mp3",coverPath:"public/cover5.jpg",
    },
    {
        songName:"Ehd E Wafa", filePath:"http://127.0.0.1:5500/public/song6.mp3",coverPath:"public/cover6.jpg",
    },
    {
        songName:"Mitti De Tibbe (Kaka)", filePath:"http://127.0.0.1:5500/public/song7.mp3",coverPath:"public/cover7.jpg",
    },
    {
        songName:"Maan Meri Jaan (King)", filePath:"http://127.0.0.1:5500/public/song8.mp3",coverPath:"public/cover8.jpg",
    },
    {
        songName:"Raatan Lambiyan", filePath:"http://127.0.0.1:5500/public/song9.mp3",coverPath:"public/cover9.jpg",
    },
    {
        songName:"Moon Rise", filePath:"http://127.0.0.1:5500/public/song10.mp3",coverPath:"public/cover10.jpg",
    },
  
]
//sSsongItems.forEach()
//audio.play();
//handle play/pause click
masterPlay.addEventListener("click",()=>{
    if(audio.paused || audio.currentTime<=0){ // audio is not playing
        audio.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        console.log(audio.src);
        for(var i=0;i<songs.length;i++){
            if(songs[i].filePath===audio.src){
                const idx= i+1;
                document.getElementById(""+idx).classList.remove('fa-circle-play');
                document.getElementById(""+idx).classList.add('fa-circle-pause');
            }
        }
    }
    else{
        audio.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        makeAllPlays(); 
    }
})
//listen to events
audio.addEventListener("timeupdate",()=>{
    progress=parseInt((audio.currentTime/audio.duration)*100); //gives how much % time song has been played
    console.log(progress);
    myProgressBar.value=progress; //value is in % *****REMEMBER*****
    //update the bar
})
myProgressBar.addEventListener("change",()=>{
    audio.currentTime=myProgressBar.value*audio.duration/100;
})
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{

         if(audio.paused || audio.currentTime<=0){
             audio.currentTime=0;
            makeAllPlays();
            songIndex=parseInt(e.target.id);  // 1 indexing here
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audio.src="public/song"+songIndex+".mp3";
            audio.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            gif.style.opacity=1;
            masterSongName.innerHTML=songs[songIndex-1].songName;
         }
         else{
            audio.pause();
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity=0;
         }
    })
})

document.getElementById("next").addEventListener("click",()=>{
    audio.currentTime=0;
    if(songIndex==10){
        songIndex=1;
    }
    else{
        songIndex+=1;

    }
    masterSongName.innerHTML=songs[songIndex-1].songName;
    audio.src="public/song"+songIndex+".mp3";
    audio.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity=0;
    setTimeout(() => {
        gif.style.opacity=1;
    }, 500);
})
document.getElementById("previous").addEventListener("click",()=>{
    audio.currentTime=0;
    if(songIndex==1){
        songIndex=10;
    }
    else{
        songIndex-=1;
     
    }
    masterSongName.innerHTML=songs[songIndex-1].songName;
    audio.src="public/song"+songIndex+".mp3";
    audio.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity=0;
    setTimeout(() => {
        gif.style.opacity=1;
    }, 500);
})