import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import "./App.css";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "rahul", message: "Hey Guys" },
    { username: "sonny", message: "whats up?" },
  ]);
  const [username, setUsername] = useState("");

  // useState = variable in react
  // useEffect = run code on a condition in react

  useEffect(() => {
    //everytime database changes it will run
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name: "));
  }, []);

  // console.log(input);
  // console.log(messages);

  const sendMessage = (event) => {
    event.preventDefault();
    //Erlier we are pushing data manually
    // setMessages([...messages, { username: username, message: input }]);
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="messenger logo"
      />
      <h1>Welcome {username}</h1>
      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter message...</InputLabel>
          <Input
            className="app__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            variant="text"
            color="primary"
            disabled={!input}
            onClick={sendMessage}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
