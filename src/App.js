import logo from './logo.svg';
import './App.css';

import Amplify, { API, graphqlOperation } from "@aws-amplify/api";

import awsconfig from "./aws-exports";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { onCreateTodo } from "./graphql/subscriptions";
import {useState} from "react";

Amplify.configure(awsconfig);

function App() {
  const [des, setDes] = useState("Learn React");
  async function createNewTodo() {
    const todo = {
      name: "Test",
      description: `Realtime (${new Date().toLocaleString()})`,
    };
    return await API.graphql(graphqlOperation(createTodo, { input: todo }));
  }

  const onClickHandler = () => {
    createNewTodo().then((evt) => {
      setDes(evt.data.createTodo.description)
      console.log(evt.data.createTodo.name, evt.data.createTodo.description);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {des}
        </a>
        <button onClick={onClickHandler} name={"create"}>Change Text</button>
      </header>
    </div>
  );
}

export default App;
