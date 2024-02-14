import "./App.css";
import Header from "../Header/Header";
import Content from "../../components/Content/Content";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

function App() {
  const [createPerformed, setCreatePerformed] = useState<boolean>(false);
  return (
    <>
      <Header
        isCreated={createPerformed}
        setIsCreated={setCreatePerformed}
      ></Header>
      <Content isCreated={createPerformed}></Content>
    </>
  );
}

export default App;
