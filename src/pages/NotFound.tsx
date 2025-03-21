
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TransitionWrapper from "@/components/TransitionWrapper";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <TransitionWrapper>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-secondary/30 px-4">
          <div className="glass-card p-8 max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 text-destructive rounded-full mb-6">
              <AlertCircle size={32} />
            </div>
            <h1 className="text-4xl font-bold font-display mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
            <p className="text-muted-foreground mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
              to="/"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Return to Home
            </Link>
          </div>
        </div>
      </TransitionWrapper>
    </>
  );
};

export default NotFound;
