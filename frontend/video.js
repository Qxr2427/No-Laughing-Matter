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
    addVideoStream(myVideo, stream, true)
  
  
    myPeer.on('call', call => {
      call.answer(stream)
      const video = document.createElement('video')
      console.log('a')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
        console.log('b')
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
    console.log('c')
  })
  
  myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
    console.log('d')
  })
  
function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    console.log('e')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
      console.log('f')
    })
    call.on('close', () => {
      video.parentElement.remove()
      console.log('g')
      // video.remove()
    })
  
    peers[userId] = call
  }
  
  function addVideoStream(video, stream, me = false) {
    if (Array.from(videoGrid.children).some(cell => cell.getElementsByTagName('video')[0].srcObject.id === stream.id)) return
    console.log(video, stream, me)
    video.srcObject = stream
    console.log('h')
    if (me) video.style.transform = "rotateY(180deg)";
    video.addEventListener('loadedmetadata', () => {
      video.play()
      console.log('i')
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
    const videoCell = document.createElement("div")
    videoCell.appendChild(video)
    videoCell.className = "video-box"
    videoCell.style.display = "inline-block"

    let name = document.createElement("p")
    name.innerText = "MARK" // Put name here pls
    videoCell.appendChild(name)

    videoGrid.appendChild(videoCell)

    // videoGrid.append(video)
}


