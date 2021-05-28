import React,{useState, useRef} from 'react'
import Song from './Components/Song'
import Player from './Components/Player'
import "./Styles/App.scss"
import data from './util'
import Library from './Components/Library'
import Nav from "./Components/Nav"

function App() {
  const audioRef = useRef(null)
      const [songInfo, setSongInfo]  = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    })
    const [libraryStatus, setLibraryStatus] = useState(false)
const [songs, setSongs] = useState(data());
const [currentsong, setCurrentSong] = useState(songs[0])
const [isPlaying,setIsPlaying] = useState(false)
const timeUpdateHandler = (e) =>{
  const current = e.target.currentTime
  const duration = e.target.duration 
   
  const roundedCurrent = Math.round(current)
  const roundedDuration = Math.round(duration)
  const animationPer = Math.round((roundedCurrent / roundedDuration) * 100)

  setSongInfo({...songInfo, currentTime:current, duration, animationPercentage: animationPer})
}

const onEndHandler = async () => {
  let currentIndex = songs.findIndex((song)=> song.id === currentsong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if(isPlaying) audioRef.current.play()
}


  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
       <Song currentsong={currentsong}/>
       <Player 
       songInfo={songInfo} 
       setSongInfo={setSongInfo} 
       audioRef={audioRef}  
       isPlaying={isPlaying}
         setIsPlaying={setIsPlaying}
         songs={songs}
         setCurrentSong={setCurrentSong}
         currentsong={currentsong}
         setSongs={setSongs}
       />
       <Library 
       audioRef={audioRef} 
       songs={songs} 
       setCurrentSong={setCurrentSong}
       isPlaying={isPlaying}
       setSongs={setSongs}
       libraryStatus={libraryStatus}
       />
       <audio 
       onTimeUpdate={timeUpdateHandler} 
       onLoadedMetadata={timeUpdateHandler} 
       ref = {audioRef} 
       src={currentsong.audio}
       onEnded={onEndHandler}
       />
    </div>
  );
}

export default App;
