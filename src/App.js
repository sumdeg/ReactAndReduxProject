import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Product from "./pages/Product";
import Test from "./pages/Test";
import Header from "./components/Header";

function App() {
  return (
    <div className="">
      <Router>
      <Header/>
        <Routes>
          <Route index path="/" element={<Product/>}/>
          <Route index path="/test" element={<Test/>}/>

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
