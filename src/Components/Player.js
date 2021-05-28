import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'


function Player({setSongs, currentsong, setCurrentSong, songs, songInfo, setSongInfo, setIsPlaying, isPlaying, audioRef}) {
   
    const PlaySong =()=>{
        if( isPlaying){
        audioRef.current.pause();
        setIsPlaying(!isPlaying)
        }
        else{
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }
    }

   const activeLibraryHandler =(nextprev)=>{   
       
    const newSong = songs.map((song)=>{ 
        if(song.id === nextprev.id){
            return {
                ...song,
                active:true,
            }
        }
            else{
                return {
                    ...song,
                    active: false,
                }
            }
    })
    
    setSongs(newSong)
}

const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
}

    const getTime=(time)=> Math.floor(time/60) + ":" + ("0"+Math.floor(time%60)).slice(-2)
    
const SkipTrackHanlder = async (direction)=>{
let currentIndex = songs.findIndex((song)=> song.id === currentsong.id)
if(direction === 'skip-forward'){

    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length])

}
if(direction === 'skip-back'){
    if((currentIndex - 1) % songs.length === -1){
       await setCurrentSong(songs[songs.length - 1])
       activeLibraryHandler(songs[songs.length - 1])
       if(isPlaying)  audioRef.current.play();
        return;
    }
  await setCurrentSong(songs[(currentIndex - 1) % songs.length])
  activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
}
 if(isPlaying)  audioRef.current.play();
}
    

const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
}

    return (
        <div className="player">
            <div className="time-control">
              <p>{getTime(songInfo.currentTime)}</p>
             <div style={{background: `linear-gradient(to right, ${currentsong.color[0]},${currentsong.color[1]})`}} className="track"> 
              <input
              onChange={dragHandler} 
              min={0} 
              max={songInfo.duration || 0} 
              value={songInfo.currentTime} 
              type="range"/>
              <div style={trackAnim} className="animate-track"></div>
              </div>
              <p>{songInfo.duration ? getTime(songInfo.duration - songInfo.currentTime) : "0:00"}</p>
            </div>
            <div className="play-control">
                 <FontAwesomeIcon onClick ={()=>SkipTrackHanlder('skip-back')} className="skip-back" size="2x" icon={faAngleLeft}/>
                 <FontAwesomeIcon onClick={PlaySong} className="play" size="2x" icon={ isPlaying ? faPause : faPlay}/>
                 <FontAwesomeIcon onClick ={()=>SkipTrackHanlder('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight}/>
            </div>
           
        </div>
    )
}

export default Player