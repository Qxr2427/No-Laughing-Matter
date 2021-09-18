var turn = 0

document.getElementById('start-game').addEventListener('click', ()=>{
    console.log('start-game list ' + turnorder)
    socket.emit('give-turnlist', {list: turnorder})
    socket.emit('start-game', {turn_list: turnorder})
})

socket.on('GAME_STARTED', ()=>{
    document.getElementById('start-game').remove()
    document.getElementById('room-code-group').remove()
    document.getElementById('join-instructions').remove()
})
socket.on('turnlist_check', (data)=>{
    console.log("original turnlist", data.turn_list)
})
socket.on('your_turn', (data)=>{
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
                console.log("inside timer", turnlist)
                if (i==0){
                    console.log("timer set round over")
                    socket.emit('round-over', {list: turnlist})
                    clearInterval(timer)
                }   
                //document.getElementById('timer').innerText = String(i);
                socket.emit('timer-update', {time: String(i)})
                i--;
            },1000);      
            
            
            
        })
    })

socket.on('timer_update', data=>{
    document.getElementById('timer').innerText = JSON.stringify(data.time);
})

socket.on('game-over', ()=>{
    //document.getElementById('join-instructions').innerHTML = ("GAME OVER")
    alert('game over')
})
