import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Generate a readable title from the pathname
    const path = location.pathname;
    const pageName = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
    const title = `${pageName} | Amanullah Ibrahim`;
    
    trackPageView(path, title);
  }, [location]);

  return null;
};

export default RouteTracker;
