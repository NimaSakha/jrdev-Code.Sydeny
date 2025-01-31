import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Header from './components/Header';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';
import Home from './components/Home';
import UserContext from './context/UserInfo';
import UserDashboard from './components/UserDashboard';
import BuildProfile from './components/BuildProfile';
import services from './services/axiosInterceptor';
import Loading from './page/Loading';
function App() {
  const { isLoggedIn, setIsLoggedIn, isLoading, setIsLoading } =
    useContext(UserContext);

  // verify token and set up loggedIn
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // setIsLoading(!!token);
      services
        .get('/user/authentication')
        .then(res => {
          setIsLoggedIn(true);
        })
        .catch(error => {
          setIsLoggedIn(false);
          localStorage.removeItem('authToken');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {isLoggedIn && (
          <Route path="/userdashboard" element={<UserDashboard />} />
        )}
        {isLoggedIn && (
          <Route path="/buildprofile" element={<BuildProfile />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
