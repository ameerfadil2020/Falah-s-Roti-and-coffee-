/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { PlaceholderPage } from './pages/Placeholder';
import { CartProvider } from './lib/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
            
            {/* New Routes from SideMenu */}
            <Route path="favorites" element={<PlaceholderPage title="Favorites" />} />
            <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="stores" element={<PlaceholderPage title="Store Locator" />} />
            <Route path="about" element={<PlaceholderPage title="About Us" />} />
            <Route path="privacy" element={<PlaceholderPage title="Privacy Policy" />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}


