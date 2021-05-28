import React from 'react'


function LibrarySongs({setSongs, isPlaying, song, setCurrentSong, songs, id, audioRef}) {
const onChangeSongHandler = async () => {                  
  await setCurrentSong(song)

const newSong = songs.map((song)=>{ 
    if(song.id === id){
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

if(isPlaying)  audioRef.current.play();
}

    return (
        <div onClick = {onChangeSongHandler} className = {`Librarys-songs ${song.active ? 'selected' : ""}`}> 
            <img src={song.cover} alt={song.name}/>
            <div className="song-discription">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySongs