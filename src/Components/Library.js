import React from 'react'
import LibrarySongs from './LibrarySongs'

function Library({libraryStatus, songs, setCurrentSong, audioRef, isPlaying, setSongs}) {
    return (
        <div className = {`Library ${libraryStatus ? 'active-library' : ''} `}>
            <h1>Library Songs</h1>
            <div className="Library-songs">
                 { songs.map((song)=> 
                 (<LibrarySongs 
                    song={song}
                    setCurrentSong ={setCurrentSong}
                    songs={songs}
                    id={song.id}
                    key={song.id}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setSongs={setSongs}
                 />))
                 }
            </div>
            
        </div>
    )
}

export default Library
