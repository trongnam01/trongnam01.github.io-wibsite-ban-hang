const song = document.getElementById('song')
const blayBtn = document.querySelector('.play-inner')
const nexBtn = document.querySelector('.play-forward')
const prevBtn = document.querySelector('.play-back')
const durationTime = document.querySelector('.duration')
const remainingTime = document.querySelector('.remaining')
const rangeBar = document.querySelector('.range')
const musicName = document.querySelector('.music-name')
const musicImage = document.querySelector('.music-thumb img')
const musicImageisplay = document.querySelector('.music-thumb')
const playRepeat = document.querySelector('.play-repeat')
const playInfinity = document.querySelector('.play-infinity')

let isPlaying = true;
let indexSong = 2;
let timer;
let isRepeat = false
let repeatCount = 0
let isInfinity = false 

const album = [
    {
        title: "Umbrella",
        path: 'song1.mp3',
        image: "https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/278509942_2299438550221339_7959471600928145795_n.jpg?stp=dst-jpg_p960x960&_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=gahub5GALiMAX-75Kov&_nc_oc=AQn-QlDDDeVsP_hLq9kmR2TPCzNwc8MzSr3bOrqz29pga_yDrQHnkdJv-276tuLoWmA&_nc_ht=scontent.fhan5-9.fna&oh=00_AT_e7RcPWFaX7LUn38ny_BSQGk0aR_A0pkkepAiLrQYQmw&oe=6268079C"
    },
    {
        title: "Holo",
        path : 'song2.mp3',
        image: "https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/279124461_3127832867431059_1924499019447491193_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=Tycv6UiQWkwAX-t18nF&_nc_ht=scontent.fhan5-8.fna&oh=00_AT9BvaNRmD8EPu9zhLENUGR1tgYDOIAluo8778pUPrnR9w&oe=6269A3E4"
    },
    {
        title: "SUPERNATURAL",
        path : 'song3.mp3',
        image: "https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/279109046_3274444906159818_2594413331058915142_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=aPBA1AvqaaIAX85RTCL&tn=99qhMv8J0MkYXCOG&_nc_ht=scontent.fhan5-8.fna&oh=00_AT_EuaBObn6606u1Ddva7P5MayP5-6K19XAuTC4ohpZCAw&oe=6269D1EB"
    }
]

song.setAttribute("src", `./music/${album[indexSong].path}`);


//  lặp lại bài

playRepeat.addEventListener("click", function() {
    if(isRepeat) {
        isRepeat = false
        playRepeat.classList.remove("active")
    } else {
        isRepeat = true
        playRepeat.classList.add("active")

        isInfinity = false
        playInfinity.classList.remove("active")
    }
})

//

playInfinity.addEventListener("click", function() {
    if(isInfinity) {
        isInfinity = false
        playInfinity.classList.remove("active")

    }else {
        isInfinity = true
        playRepeat.classList.remove("active")

        isRepeat = false
        playInfinity.classList.add("active")
    }
})

//  khi bài bài nhạc phát xong tự động chuyển bài tiếp
song.addEventListener("ended", handleEndedSong)



function handleEndedSong () {
    
    // repeatCount++
    // đk lặp 1 bài (&& repeatCount === 1)
    if(isRepeat ) {
        isPlaying = true
        playPause()
    } else if(isInfinity) {
        let randomSong = Math.floor(Math.random() * album.length)

        song.setAttribute("src", `./music/${album[randomSong].path}`);
        isPlaying = true

        innit(randomSong)
        playPause()
      console.log(`${album[randomSong].path}`);
    } else {
      changeSong(1)
      repeatCount = 0
    //   playRepeat.classList.remove("active")
    //   isRepeat = false
    }
}


//  bài tiếp theo
nexBtn.addEventListener("click", function() {
    changeSong(1)
})
//  lùi lại một bài
prevBtn.addEventListener("click", function() {
    changeSong(-1)
})

function changeSong (dir) {
    if(dir === 1) {
        indexSong++;
        if(indexSong >= album.length) {
            indexSong = 0
        }
        isPlaying = true
    } else  if (dir === -1){
        indexSong--;
        if(indexSong < 0) {
            indexSong = album.length -1
        }
        isPlaying = true
    } else if(dir === 0){

    }
    innit(indexSong)
    playPause()
}

blayBtn.addEventListener("click", playPause);



function playPause () {
    if(isPlaying) {
        song.play()
        musicImageisplay.classList.add("is-play")
        blayBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
        isPlaying = false
        timer = setInterval(disPlayTime, 500)
    }else {
        song.pause()
        musicImageisplay.classList.remove("is-play")

        blayBtn. innerHTML = `<i class="fa-solid fa-play blay-icon"></i>`
        isPlaying = true
        clearInterval(timer)
    }
}

function disPlayTime() {
    const {duration, currentTime} = song
    rangeBar.max = duration;
    rangeBar.value = currentTime
    remainingTime.textContent = formatTimer(currentTime)
    if(!duration) {
        durationTime.textContent = "00:00"
    } else {
        durationTime.textContent = formatTimer(duration)
    }
}

function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - (minutes * 60));
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10? "0" + seconds : seconds}`
}
disPlayTime()

rangeBar.addEventListener("change", HandleChangeEvent)

function HandleChangeEvent () {
    song.currentTime = rangeBar.value 
}

function innit (indexSong) {

    song.setAttribute("src", `./music/${album[indexSong].path}`);
    musicImage.setAttribute("src", album[indexSong].image);
    musicName.textContent = album[indexSong].title
}
innit(indexSong)