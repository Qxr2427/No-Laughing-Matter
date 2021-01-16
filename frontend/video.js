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


socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
  })
  
  myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
  })
  
function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })
  
    peers[userId] = call
  }
  
  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
  
  
    // video.addEventListener('play', () => {
    //   //const canvas = faceapi.createCanvasFromMedia(video)
    //   //document.body.append(canvas)
    //   //const displaySize = { width: video.width, height: video.height }
    //   //faceapi.matchDimensions(canvas, displaySize)
    //   setInterval(async () => {
    //     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
    //     //const resizedDetections = faceapi.resizeResults(detections, displaySize)
    //    // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //     //faceapi.draw.drawDetections(canvas, resizedDetections)
    //     //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //     //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    //     socket.emit('points+')
    //     console.log(detections)
  
  
    //   }, 500)
  
  
    // })
  videoGrid.append(video)
  
}


