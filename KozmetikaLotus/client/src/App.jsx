import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Footer } from './components';
import { AboutUs, ContactUs, Home, Products, Login, Register, SingleProduct, AdminPannel, AdminProductDetails, Wishlist, Profile, Checkout } from './pages';
import CartMenu from './components/CartMenu';
import BrandsPage from './pages/Brands';




function App() {
  return (
    <div className='App'>
      <Router>
          <Routes>
            {/* Add routes here */}
            <Route path='/' exact Component={Home} />
            <Route path='/products/:subCategoryName'exact Component={Products}/>
            <Route path='/products/:categoryName/:productName'exact Component={SingleProduct}/>
            <Route path='/products/brands/:brandName'exact Component={BrandsPage}/>
            <Route path='/about'exact Component={AboutUs}/>
            <Route path='/wishlist'exact Component={Wishlist}/>
            <Route path='/contact'exact Component={ContactUs}/>
            <Route path='/login'exact Component={Login}/>
            <Route path='/register'exact Component={Register}/>
            <Route path='/admin'exact Component={AdminPannel}/>
            <Route path='/profile'exact Component={Profile}/>
            <Route path='/checkout'exact Component={Checkout}/>
            <Route path='/admin/:productName'exact Component={AdminProductDetails}/>
          </Routes>
          <CartMenu/>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
