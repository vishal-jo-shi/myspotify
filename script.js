// console.log("hello world")
let curIdx=0;
let audioElement=new Audio('/song/_ Heer Ranjha(PagalWorld.com.se).mp3');
audioElement.volume=0.3;
let masterplay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let mySpeaker=document.getElementById('mySpeaker');
let gif=document.getElementById('gif');
let songItem=Array.from(document.getElementsByClassName('songitem'));

let songs=[
    {songIndex:0,songName:"Aacha Lage Se",filepath:"song/AachaLageSe.mp3" ,coverpath:"covers/AachaLageSe.jpeg",timestamp:"04:47"},
    {songIndex:1,songName:"Ami Tomake",filepath:"song/AmiTomake.mp3" ,coverpath:"covers/AmiTomake.jpeg",timestamp:"03:19"},
    {songIndex:2,songName:"Bijlee Bijlee",filepath:"song/BijleeBijlee.mp3" ,coverpath:"covers/BijleeBijlee.jpeg",timestamp:"02:48"},
    {songIndex:3,songName:"Despacito",filepath:"song/Despacito.mp3" ,coverpath:"covers/Despacito.jpeg",timestamp:"04:41"},
    {songIndex:4,songName:"Ek Jeep Khadi Meri Thane Te",filepath:"song/EkJeepKhadiMeriThaneTe.mp3" ,coverpath:"covers/EkJeepKhadiMeriThaneTe.jpeg",timestamp:"2:14"},
    {songIndex:5,songName:"Ektarfa",filepath:"song/Ektarfa.mp3" ,coverpath:"covers/Ektarfa.jpeg",timestamp:"04:01"},
    {songIndex:6,songName:"ELEVATED",filepath:"song/ELEVATED.mp3" ,coverpath:"covers/ELEVATED.jpeg",timestamp:"03:20"},
    {songIndex:7,songName:"Excuses",filepath:"song/Excuses.mp3" ,coverpath:"covers/Excuses.jpeg",timestamp:"02:56"},
    {songIndex:8,songName:"Heer Ranjha",filepath:"song/HeerRanjha.mp3" ,coverpath:"covers/HeerRanjha.jpeg",timestamp:"03:43"},
    {songIndex:9,songName:"Iraaday",filepath:"song/Iraaday.mp3" ,coverpath:"covers/Iraaday.jpeg",timestamp:"02:13"},
    {songIndex:10,songName:"Jhaanjar",filepath:"song/Jhaanjar.mp3" ,coverpath:"covers/Jhaanjar.jpeg",timestamp:"03:55"},
    {songIndex:11,songName:"Maan Meri Jaan",filepath:"song/MaanMeriJaan.mp3" ,coverpath:"covers/MaanMeriJaan.jpeg",timestamp:"03:14"},
    {songIndex:12,songName:"Naah Lofi",filepath:"song/NaahLofi.mp3" ,coverpath:"covers/NaahLofi.jpeg",timestamp:"03:19"},
    {songIndex:13,songName:"Ram Darshan",filepath:"song/RamDarshan.mp3" ,coverpath:"covers/RamDarshan.jpeg",timestamp:"05:09"},
    {songIndex:14,songName:"Rooh",filepath:"song/Rooh.mp3" ,coverpath:"/overs/Rooh.jpeg",timestamp:"03:28"},
    {songIndex:15,songName:"Smile",filepath:"song/Smile.mp3" ,coverpath:"covers/Smile.jpeg",timestamp:"03:10"},
    {songIndex:16,songName:"Sun Re Sun Beliya",filepath:"song/SunReSunBeliya.mp3" ,coverpath:"covers/SunReSunBeliya.jpeg",timestamp:"00:55"},
    {songIndex:17,songName:"Tere Te",filepath:"song/TereTe.mp3" ,coverpath:"covers/TereTe.jpeg",timestamp:"01:59"},
    {songIndex:18,songName:"Tu Chodiyon Na",filepath:"songTuChodiyonNa.mp3" ,coverpath:"covers/TuChodiyonNa.jpeg",timestamp:"03:33"},
    {songIndex:19,songName:"Tu Hai To Mujhe Phir Aur Kya Chahiye",filepath:"song/TuHaiToMujhePhirAurKyaChahiye.mp3" ,coverpath:"covers/TuHaiToMujhePhirAurKyaChahiye.jpeg",timestamp:"04:26"},
    {songIndex:20,songName:"Zara Zara",filepath:"song/ZaraZara.mp3" ,coverpath:"covers/ZaraZara.jpeg",timestamp:"04:25"}
]

//adding list of songs to html file or in frontend
songs.forEach((element)=>{
    let siC=document.getElementsByClassName('songitemContainer');
    Array.from(siC).forEach((container) => {
        container.innerHTML +=
                `<div class="songitem">
                    <img  src="${element.coverpath}" alt="${element.songIndex}">
                    <span class="songName${element.songIndex}" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: block;">${element.songName}</span>
                    <span class="songItemPlay"><span class="timestamp">${element.timestamp}<i id="${element.songIndex}" class="far music fa-play-circle"></i></span></span>
                </div>`;
    })
})


//handle play/pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        // gif.style.opacity=1;
        document.getElementById(curIdx).classList.add('fa-pause-circle');
        document.getElementById(curIdx).classList.remove('fa-play-circle');
        makeMPMarque();
        makecurrMarque();
    }
    else{
        makeAllPlays();
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        // gif.style.opacity=0;
        document.getElementById(curIdx).classList.remove('fa-pause-circle');
        document.getElementById(curIdx).classList.add('fa-play-circle');
        makeMPUnMarque();
        makeAllUnMarque();
    }
})
//listen to Events

audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
    if(audioElement.duration>0){
        //update current song time
        min=Math.floor(audioElement.currentTime/60);
        sec=Math.floor(audioElement.currentTime%60);
        let sduration=document.getElementsByClassName('sduration');
        sduration[0].textContent=`${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
        //update remaing song time
        min=Math.floor((audioElement.duration-audioElement.currentTime)/60);
        sec=Math.floor((audioElement.duration-audioElement.currentTime)%60);
        let rduration=document.getElementsByClassName('rduration');
        rduration[0].textContent=`${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
    
    //making loop for song if the one song ends
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
        // gif.style.opacity=1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        makeAllUnMarque();
        makecurrMarque();
        makeMPMarque();
    }
})

//changing song's current time with respect to progress bar
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})

//making all play buttons
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('music')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
} 

//making all unmarque
const makeAllUnMarque=()=>{
    for(let idx=0;idx<=songs.length;idx++){
        Array.from(document.getElementsByClassName(`songName${idx}`)).forEach((songNameElement) => {
            songNameElement.innerHTML = songs[idx].songName;
        });
    }
    
}
//making current song marque
const makecurrMarque=()=>{
    Array.from(document.getElementsByClassName(`songName${curIdx}`)).forEach((songNameElement) => {
        songNameElement.innerHTML = `<marquee scrollmount="1">${songs[curIdx].songName}</marquee>`;
    });
}

//making master play buton marque
const makeMPUnMarque=()=>{
    Array.from(document.getElementsByClassName('masterPlaysongName')).forEach((songNameElement) => {
        songNameElement.innerText = songs[curIdx].songName;
    }); 
}

//making master play buton Unmarque
const makeMPMarque=()=>{
    Array.from(document.getElementsByClassName('masterPlaysongName')).forEach((songNameElement) => {
        songNameElement.innerHTML = `<marquee scrollmount="1">${songs[curIdx].songName}</marquee>`;
    });
}

//time update of sduration and rduration
const srduration=()=>{
    let sduration=document.getElementsByClassName('sduration');
    sduration[0].textContent="00:00";
    let rduration=document.getElementsByClassName('rduration');
    rduration[0].textContent=songs[curIdx].timestamp;
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
            // gif.style.opacity=0;
            makeMPUnMarque();
            makeAllUnMarque();
        }
        else{
        makeAllPlays();
        curIdx=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=songs[curIdx].filepath;
               
        audioElement.currentTime=0;
        audioElement.play();
        Array.from(document.getElementsByClassName('bottom')).forEach((bottomElement) => {
            bottomElement.style.display = '';
        });   
        Array.from(document.getElementsByClassName('speaker')).forEach((bottomElement) => {
            bottomElement.style.display = '';
        });      
        // gif.style.opacity=1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        makeAllUnMarque();
        makeMPMarque();
        makecurrMarque();
        srduration();
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
        // gif.style.opacity=1;
        makeAllPlays();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        document.getElementById(curIdx).classList.remove('fa-play-circle');
        document.getElementById(curIdx).classList.add('fa-pause-circle')
        makeAllUnMarque();
        makeMPMarque();
        makecurrMarque();
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
        // gif.style.opacity=1;
        makeAllPlays();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        document.getElementById(curIdx).classList.remove('fa-play-circle');
        document.getElementById(curIdx).classList.add('fa-pause-circle');
        makeAllUnMarque();
        makeMPMarque();
        makecurrMarque();
})

//handle the cross
cross=document.getElementsByClassName('cross');
cross[0].addEventListener('click',()=>{
    bottom=document.getElementsByClassName('bottom');
    bottom[0].style.display='none';
    speaker=document.getElementsByClassName('speaker');
    speaker[0].style.display = 'none';
    makeAllPlays();
    audioElement.pause();
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
    // gif.style.opacity=0;
    makeMPUnMarque();
    makeAllUnMarque();
})
// to change the size of previous,masterplay and next at 620px width
// Define the media query for viewports up to 620px wide
const mediaQuery = window.matchMedia("(max-width: 620px)");

// Function to handle media query changes
function handleMediaChange(e) {
    if (e.matches) {
        // The viewport is 620px or less
        const icons = document.querySelectorAll('.fa-3x');
        icons.forEach(icon => {
            icon.classList.remove('fa-3x');
            icon.classList.add('fa-2x');
        });
    }else{
        const icons = document.querySelectorAll('.fa-2x');
        icons.forEach(icon => {
            icon.classList.remove('fa-2x');
            icon.classList.add('fa-3x');
        });
    }
}
mediaQuery.addEventListener('change', handleMediaChange);


//extra spacebar event
addEventListener("keydown", (event) => {
    if(event.key==' '){
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            // gif.style.opacity=1;
            document.getElementById(curIdx).classList.add('fa-pause-circle');
            document.getElementById(curIdx).classList.remove('fa-play-circle');
            makeMPMarque();
            makecurrMarque();
        }
        else{
            makeAllPlays();
            audioElement.pause();
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
            // gif.style.opacity=0;
            document.getElementById(curIdx).classList.remove('fa-pause-circle');
            document.getElementById(curIdx).classList.add('fa-play-circle');
            makeMPUnMarque();
            makeAllUnMarque();
        }
    }
});

//left arrow event
addEventListener("keydown", (event) => {
    if(event.key=='ArrowLeft'){
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
            // gif.style.opacity=1;
            makeAllPlays();
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            document.getElementById(curIdx).classList.remove('fa-play-circle');
            document.getElementById(curIdx).classList.add('fa-pause-circle');
            makeAllUnMarque();
            makeMPMarque();
            makecurrMarque();
    }
});

//right arrow
addEventListener("keydown", (event) => {
    if(event.key=='ArrowRight'){
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
            // gif.style.opacity=1;
            makeAllPlays();
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            document.getElementById(curIdx).classList.remove('fa-play-circle');
            document.getElementById(curIdx).classList.add('fa-pause-circle')
            makeAllUnMarque();
            makeMPMarque();
            makecurrMarque();
    }
});

//speakers
//volume up by arrowup key
addEventListener("keydown", (event) => {
    if(event.key=='ArrowUp'){
        if(audioElement.volume!=1){
            audioElement.volume+=0.1;
            mySpeaker.value=audioElement.volume*10;
        }
    }
});

//volume down by arrow down key
addEventListener("keydown", (event) => {
    if(event.key=='ArrowDown'){
        if(audioElement.volume!=0){
            audioElement.volume-=0.1;
            mySpeaker.value=audioElement.volume*10;
        }
    }
});

mySpeaker.addEventListener('change',()=>{
    audioElement.volume=(mySpeaker.value)/10;
})




