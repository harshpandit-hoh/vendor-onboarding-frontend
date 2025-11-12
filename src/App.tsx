import { Chat } from "./components";

function App() {
  console.log("App.tsx");
  return (
    <div className="App" style={{ width: "100vw" }}>
      <h1>Vendor Onboarding Agent</h1>
      <Chat />
    </div>
  );
}

export default App;
