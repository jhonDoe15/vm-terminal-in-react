import React, { /*useState*/ } from 'react';
import './App.css';
import Terminal from 'terminal-in-react';
import axios from 'axios';

const App = () => {

  // const [, setOutput] = useState(null);

  const showMsg = () => 'Hello World'
  const tellServerToExecute = (print, commandToRun) => {
    axios.get('http://localhost:5000/execute/' + commandToRun.join('%20'))
      .then(response => {
        const std = response.data;
        const stdout = std.stdout;
        const stderr = std.stderr;
        if (Array.isArray(stdout) && stdout.length) {
          console.log(stdout);
          stdout.map(line => print(line));
        } else {
          console.log(stderr);
          stderr.map(line => print(line));
        }

      })
  }
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Terminal
          commandPassThrough={(cmd, print) => tellServerToExecute(print, cmd)}
          color='green'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1em" }}
          commands={{
            showmsg: showMsg,
            popup: () => alert('Terminal in React')
          }}
          descriptions={{
            'open-google': 'opens google.com',
            showmsg: 'shows a message',
            alert: 'alert', popup: 'alert'
          }}
          msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
        />
      </div>
    </div>
  );
}

export default App;
