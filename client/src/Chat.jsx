import React, { useEffect, useState } from 'react'

const Chat = ({socket,userName,room}) => {
    const [currMessage,setCurrMessage] = useState("")
    const [messageList,setMessageList] = useState([])
    const sendMessage = async () => {
        if(currMessage !== ""){
            const messageData = {
                room:room,
                author:userName,
                message:currMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message",messageData)
            setMessageList((list)=> [...list,messageData])
        }
    }

    useEffect(()=>{
        socket.on("recieve_message",(data)=>{
            setMessageList((list)=> [...list,data])
        })
    },[socket])
  return (
    <div className='chat-window'>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((content) => {
            return <div className="message" id={userName === content.author ? "you" : "other"}>
                <div className='message-content'>
                    <p>{content.message}</p>
                </div>
                <div className='message-meta'>
                    <p id='time'>{content.time}</p>
                    <p id='author'>{content.author}</p>
                </div>
            </div>
        })}
      </div>
      <div className="chat-footer">
        <input type="text" placeholder='Type message' onChange={(e)=>{
            setCurrMessage(e.target.value)
        }} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat
