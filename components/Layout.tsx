
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative min-h-screen max-w-md mx-auto flex flex-col shadow-2xl dark:shadow-none bg-background-light dark:bg-background-dark overflow-hidden transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
