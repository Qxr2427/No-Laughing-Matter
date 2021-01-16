const socket = io('/')
//const faceapi = require('face-api.js')

const videoGrid = document.getElementById('video-grid')
const names = document.getElementById('name')
const myPeer = new Peer(undefined, {
  secure: true,
  host: 'peerjs-rory.herokuapp.com',
  port: '443'
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  //faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  //faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(() => {

  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    addVideoStream(myVideo, stream)
  
  
    myPeer.on('call', call => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    })
  
    socket.on('user-connected', userId => {
      connectToNewUser(userId, stream)
      console.log('connected')
      //names.append(NAME)
      //console.log(NAME)  // whenever a client detects a new connection this logs
    })
  })
})


//
  videoGrid.append(video)
  
}


