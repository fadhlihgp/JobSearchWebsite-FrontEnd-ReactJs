import { ToastContainer } from "react-toastify";
import "./App.css";
import RouteComponent from "./router/RouteComponent";

function App() {
  return (
    <>
      <RouteComponent />
      <ToastContainer />
    </>
  );
}

export default App;
