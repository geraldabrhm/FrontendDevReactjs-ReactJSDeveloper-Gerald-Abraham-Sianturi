import './App.css';
import { Route, Routes } from 'react-router-dom';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import RestaurantLayout from './components/RestaurantLayout';

function App() {
  return (
    <>
      <RestaurantLayout/>
      <Routes>
        <Route path="/" element={<Restaurants />}/>
        <Route path="/restaurant">
          <Route index element={<Restaurants />}/>
          <Route path=":id" element = {<RestaurantDetail />}/>
        </Route>
        <Route path="*" element={<div>Not Found</div>}/>
      </Routes>
    </>
  )
}

export default App
