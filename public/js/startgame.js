var turn = 0

document.getElementById('start-game').addEventListener('click', ()=>{
    console.log('start-game list ' + turnorder)
    socket.emit('give-turnlist', {list: turnorder})
    socket.emit('start-game', {turn_list: turnorder})
    //document.getElementById('start-game').remove()
    //console.log(turnorder[turn])
})
socket.on('master-turnlist', (data)=>{
    turnlist = data.list
    console.log("my_turn_list is: ", turnlist)
})
socket.on('GAME_STARTED', ()=>{
    document.getElementById('start-game').remove()
    document.getElementById('room-code-group').remove()
    document.getElementById('join-instructions').remove()
    console.log(socket.clients())
    //do game_started dialogue 
    //alert('game STARTED')
    //socket.emit('test')
})

//socket.on('test',() =>{
    //console.log("SOCKET CLIENT RECEIVES ITS OWN")
//})
socket.on("start-judging", (data) => {
    //     console.log('judging starting')
    //     check_score = true
         turnlist = data.turn
         });


socket.on('your_turn', (data)=>{
    //console.log('your turn')
        
        //turn++ //incremenmt turn counter in turn list

        //console.log("turnorder length " + turnorder.length + "turn "+ turn) 
        turnlist = data.turn_list
        turnlist.shift()
        console.log("turnlist", turnlist) //this is ok so far
        socket.emit('give-turnlist', {list: turnlist})

        var turn_button = document.createElement("button")
        turn_button.id = "turn"
        turn_button.innerHTML = "YOUR TURN"
        document.getElementById("my-turn").appendChild(turn_button)
        document.getElementById('turn').addEventListener('click', ()=>{
            
            //socket.emit('start-game', {cur_turn: turnorder[turn]})
            document.getElementById('turn').remove()
            let i = 10;
            // timer = setInterval(()=>{
            //     if (i==0){
            //         clearInterval(timer)
            //         socket.emit('round-over', {list: turnlist})
            //     }
            //     document.getElementById('timer').innerText = String(i);
            //     socket.emit('timer-update', {time: String(i)})
            //     i--;
            // },1000);                
            //but.remove()
            //socket.to(data.turn).broadcast.emit('start-judging', {cur_turn: data.turn})
            //socket.emit('prompt', {curName: NAME, turnNum: turn, cur_turn: turnorder[turn]})
            socket.emit('round-over', {list: turnlist})
        })
    })

socket.on('displayPrompt', data => {
    //console.log(data)
    $("#exampleModalCenter").modal('show')
    var promp = document.getElementById('content')
    promp.innerHTML = (data.DisplayName + " prompt is... "+ data.PROMPT)
    //alert(data.DisplayName +" prompt is " + data.PROMPT)
    
    // let btn = {
    //     type: "button",
    //     class: "btn btn-primary",
    //     'data-toggle': "modal",
    //     'data-target': "#exampleModalCenter",
    //     innerHTML: "PROMPT!"
    // }
    
})

socket.on('GAMEOVER', ()=>{
    alert('GAMEOVER')
})
// 
// var progressBar = new ProgressBar.Line(document.getElementById('div1'), {
//     strokeWidth: 2
//   });
  
// socket.on('update_score', (data)=>{
//     console.log("UPDATE SCORE") // BUT IT ISNT DRAWING!!!!!
//     progressBar.set(data.current_score)
//   })