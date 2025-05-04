
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-devotion-purple-700">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page non trouvée</p>
        <Button asChild>
          <Link to="/">Retourner à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
