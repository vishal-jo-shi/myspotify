// console.log("hello world")
let curIdx=0;
let audioElement=new Audio('/song/_ Heer Ranjha(PagalWorld.com.se).mp3');
let masterplay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItem=Array.from(document.getElementsByClassName('songitem'));

let songs=[
    {songIndex:0,songName:"_ Heer Ranjha",filepath:"/song/_ Heer Ranjha(PagalWorld.com.se).mp3" ,coverpath:"/covers/logo.png",timestamp:"05:34"},
    {songIndex:1,songName:"Aacha Lage Se",filepath:"/song/Aacha Lage Se Raju Punjabi 128 Kbps.mp3" ,coverpath:"/covers/logo.png",timestamp:"05:34"},
    {songIndex:2,songName:"Abdul Hannan & Rovalio - Iraaday",filepath:"/song/Abdul Hannan & Rovalio - Iraaday (Official Music Video).mp3" ,coverpath:"/covers/logo.png",timestamp:"05:34"},
    {songIndex:3,songName:"Ektarfa",filepath:"/song/Ektarfa(PagalWorld.com.se).mp3" ,coverpath:"/covers/logo.png",timestamp:"05:34"}
]

//adding list of songs to html file or in frontend
songs.forEach((element)=>{
    let siC=document.getElementsByClassName('songitemContainer');
    Array.from(siC).forEach((container) => {
        container.innerHTML +=
                `<div class="songitem">
                    <img  src="${element.coverpath}" alt="1">
                    <span class="songName">${element.songName}</span>
                    <span class="songItemPlay"><span class="timestamp">${element.timestamp}<i id="${element.songIndex}" class="far music fa-play-circle"></i></span></span>
                </div>`;
    })
})
songItem.forEach((element ,i)=> {
    element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});


//handle play/pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        document.getElementById(curIdx).classList.add('fa-pause-circle');
        document.getElementById(curIdx).classList.remove('fa-play-circle');
    }
    else{
        makeAllPlays();
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;
        document.getElementById(curIdx).classList.remove('fa-pause-circle');
        document.getElementById(curIdx).classList.add('fa-play-circle');
    }
})
//listen to Events

audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
    if(progress==100){
        if(curIdx==songs.length-1){
            curIdx=0;
        }else{
            curIdx++;
        }
        makeAllPlays();
        document.getElementById(curIdx).classList.remove('fa-play-circle');
        document.getElementById(curIdx).classList.add('fa-pause-circle');
        audioElement.src=songs[curIdx].filepath;
        Array.from(document.getElementsByClassName('masterPlaysongName')).forEach((songNameElement) => {
            songNameElement.innerText = songs[curIdx].songName;
        });        
        audioElement.currentTime=0;
        audioElement.play();
        Array.from(document.getElementsByClassName('bottom')).forEach((bottomElement) => {
            bottomElement.style.display = '';
        });        
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    }
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('music')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
} 


Array.from(document.getElementsByClassName('music')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        curclass="";
        Array.from(e.target.classList).forEach((clas)=>{
            if(clas=='fa-play-circle'){
                curclass='fa-play-circle';
            }else{
                curclass='fa-pause-circle';
            }
        })
        if(curclass=='fa-pause-circle'){
            makeAllPlays();
            audioElement.pause();
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
            gif.style.opacity=0;
        }
        else{
        makeAllPlays();
        curIdx=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=songs[curIdx].filepath;
        Array.from(document.getElementsByClassName('masterPlaysongName')).forEach((songNameElement) => {
            songNameElement.innerText = songs[curIdx].songName;
        });        
        audioElement.currentTime=0;
        audioElement.play();
        Array.from(document.getElementsByClassName('bottom')).forEach((bottomElement) => {
            bottomElement.style.display = '';
        });        
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        }
        
    })
})

//next button
document.getElementById('next').addEventListener('click',()=>{
    if(curIdx>=songs.length-1){
        curIdx=0;
    }else{
        curIdx++;
    }
    audioElement.src=songs[curIdx].filepath;
        audioElement.currentTime=0;
        audioElement.play();
        Array.from(document.getElementsByClassName('masterPlaysongName')).forEach((songNameElement) => {
            songNameElement.innerText = songs[curIdx].songName;
        }); 
        gif.style.opacity=1;
        makeAllPlays();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        document.getElementById(curIdx).classList.remove('fa-play-circle');
        document.getElementById(curIdx).classList.add('fa-pause-circle')
})

//previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(curIdx<=0){
        curIdx=songs.length-1;
    }else{
        curIdx--;
    }
        audioElement.src=songs[curIdx].filepath;
        audioElement.currentTime=0;
        audioElement.play();
        Array.from(document.getElementsByClassName('masterPlaysongName')).forEach((songNameElement) => {
            songNameElement.innerText = songs[curIdx].songName;
        }); 
        gif.style.opacity=1;
        makeAllPlays();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        document.getElementById(curIdx).classList.remove('fa-play-circle');
        document.getElementById(curIdx).classList.add('fa-pause-circle');
})