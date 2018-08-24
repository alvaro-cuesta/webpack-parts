import React from "react";

import Hello from "components/Hello";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>#APP_NAME#</h1>

        <p>#APP_DESCRIPTION#</p>

        <Hello name="World" />
      </React.Fragment>
    );
  }
}

export default App;
