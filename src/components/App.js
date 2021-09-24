import "../App.css";
import firebaseApp from "../firebase";
import AppRouter from "./Route";

function App() {
  console.log(firebaseApp);

  return (
    <div className="App">
      {/* <span>Retro-Nwitter</span> */}
      <AppRouter />
    </div>
  );
}

export default App;
