'use client'
import { useEffect ,useState} from 'react';


function Typing() {


    const [audio] = useState(() => new Audio('/../public/audio/Keyboard.mp3')); // Initialize the audio instance

    const handlePlayAudio = () => {
      audio.play().catch((err) => {
        console.error('Failed to play audio:', err);
      });
    };
  
    return (
    <div className="my-2">
        <div className={`flex flex-row justify-start`}>
          <div className={`flex w-8 h-8 relative  flex-shrink-0 mr-4`}>
            <img className="shadow-md rounded-full w-full h-full object-cover"
                src="https://randomuser.me/api/portraits/women/33.jpg"
                alt=""
            />
          </div>
          <div onClick={handlePlayAudio} className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
           <audio src='/public/audio/Keyboard.mp3' autoPlay={true} >
                Your browser does not support the audio element.
            </audio>
            <div className="flex items-center space-x-1 bg-gray-800 rounded-full p-3">
                  {/* <span className="text-gray-200">Typing</span> */}
                <div className="flex space-x-1">
                <span className="size-2 bg-gray-200 rounded-full animate-large-bounce "></span>
                <span
                    className="w-2 h-2 bg-gray-200 rounded-full animate-large-bounce "
                    style={{ animationDelay: '0.2s' }}
                ></span>
                <span
                    className="w-2 h-2 bg-gray-200 rounded-full animate-large-bounce "
                    style={{ animationDelay: '0.4s' }}
                ></span>
                </div>
            </div>
          </div>
      </div>
    </div>
  
  )
}

export default Typing