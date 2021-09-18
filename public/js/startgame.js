var turn = 0

document.getElementById('start-game').addEventListener('click', ()=>{
    console.log('start-game list ' + turnorder)
    socket.emit('give-turnlist', {list: turnorder})
    socket.emit('start-game', {turn_list: turnorder})
    //document.getElementById('start-game').remove()
    //console.log(turnorder[turn])
})

socket.on('GAME_STARTED', ()=>{
    document.getElementById('start-game').remove()
    document.getElementById('room-code-group').remove()
    document.getElementById('join-instructions').remove()
    //console.log(socket.clients())
    //do game_started dialogue 
    //alert('game STARTED')
    //socket.emit('test')
})

//socket.on('test',() =>{
    //console.log("SOCKET CLIENT RECEIVES ITS OWN")
//})



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
            turn = false;
            var timer = setInterval(()=>{
                if (i==0){
                    console.log("timer set round over")
                    socket.emit('round-over', {list: turnlist})
                    clearInterval(timer)
                }   
                //document.getElementById('timer').innerText = String(i);
                socket.emit('timer-update', {time: String(i)})
                i--;
            },1000);      
            
            
            
           // setTimeout(stop, 10000);    
            //but.remove()
            //socket.to(data.turn).broadcast.emit('start-judging', {cur_turn: data.turn})
            //socket.emit('prompt', {curName: NAME, turnNum: turn, cur_turn: turnorder[turn]})
            //socket.emit('round-over', {list: turnlist})
        })
    })

socket.on('timer_update', data=>{
    document.getElementById('timer').innerText = JSON.stringify(data.time);
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

socket.on('game-over', ()=>{
    //document.getElementById('join-instructions').innerHTML = ("GAME OVER")
    alert('game over')
})
// 
// var progressBar = new ProgressBar.Line(document.getElementById('div1'), {
//     strokeWidth: 2
//   });
  
// socket.on('update_score', (data)=>{
//     console.log("UPDATE SCORE") // BUT IT ISNT DRAWING!!!!!
//     progressBar.set(data.current_score)
//   })