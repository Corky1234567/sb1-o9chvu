import React from 'react';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { FindFriendsPage } from './pages/FindFriendsPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { CreateActivityPage } from './pages/CreateActivityPage';
import { ErrandsPage } from './pages/ErrandsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Box minH="100vh" display="flex" flexDirection="column">
          <NavigationBar />
          <Box flex="1">
            <Routes>
              {/* 默认路径 '/' 会导航到登录页面 */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/find-friends" element={<FindFriendsPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/create-activity" element={<CreateActivityPage />} />
              <Route path="/errands" element={<ErrandsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
