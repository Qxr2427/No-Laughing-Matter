const progressBar = document.getElementById("progress-bar");


socket.on("update_score", (data) => {
  console.log(Math.round(data.score));
  progressBar.style=  `width: ${Math.round(data.score)}%`;
  console.log("recieve cur_score");

});


