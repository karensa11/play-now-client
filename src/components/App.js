import React from 'react';
import './App.css';
import Header from "./header/header.component";
import {Switch, Route} from "react-router-dom";
import Home from "./pages/home/home.component";
import CategoriesStripe from "./categories-stripe/categories-stripe.component";
import Info from "./pages/info/info.component";
import Footer from "./footer/footer.component";

function App() {
  return (
    <div className="App">
        <Header />
        <CategoriesStripe />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/info" component={Info} />
        </Switch>
        <Footer />
    </div>
  );
}

export default App;
