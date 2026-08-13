"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (session) {
      fetch("/api/cart")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setCartCount(data.length);
        });
    } else {
      setCartCount(0);
    }
  }, [session]);

  return (
    <header className="bg-surface/70 backdrop-blur-2xl text-on-surface docked full-width top-0 border-b border-outline-variant/30 sticky z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-gutter max-w-max-width mx-auto h-20">
        <Link href="/" className="flex items-center h-12">
          <img 
            alt="R.N. Enterprises Logo" 
            className="h-full w-auto object-cover rounded-full shadow-md hover:scale-105 transition-transform duration-300 ring-2 ring-primary/20" 
            src="/logo.jpeg" 
          />
        </Link>

        <nav className="hidden md:flex space-x-6 font-label-md items-center">
          <Link href="/doors" className="droplet-btn">
            Doors
          </Link>
          <Link href="/frames" className="droplet-btn">
            Frames
          </Link>
          <Link href="/hardware" className="droplet-btn">
            Hardware
          </Link>
          {session?.user && (session.user as any).role === "OWNER" && (
            <Link href="/owner" className="droplet-btn !bg-primary/10 !text-primary border-primary/30">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="hidden md:block premium-btn px-4 py-2 rounded-DEFAULT font-label-md text-label-md">
            WhatsApp Order
          </Link>
          
          <Link href="/cart" aria-label="shopping_cart" className="relative text-primary hover:text-primary/70 transition-colors flex items-center">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-error text-on-error text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {session ? (
            <button onClick={() => signOut()} aria-label="logout" className="text-primary hover:text-primary/70 transition-colors flex items-center" title="Logout">
              <span className="material-symbols-outlined">logout</span>
            </button>
          ) : (
            <Link href="/login" aria-label="account_circle" className="text-primary hover:text-primary/70 transition-colors flex items-center" title="Login">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          )}

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-primary hover:text-primary/70 transition-colors flex items-center ml-2"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 px-gutter py-4 flex flex-col space-y-4 font-label-md absolute w-full shadow-md">
          <Link href="/doors" className="droplet-btn w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
            Doors
          </Link>
          <Link href="/frames" className="droplet-btn w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
            Frames
          </Link>
          <Link href="/hardware" className="droplet-btn w-full justify-center" onClick={() => setIsMobileMenuOpen(false)}>
            Hardware
          </Link>
          {session?.user && (session.user as any).role === "OWNER" && (
            <Link href="/owner" className="droplet-btn w-full justify-center !bg-primary/10 !text-primary border-primary/30" onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </Link>
          )}
          <div className="pt-2">
            <Link href="/cart" className="premium-btn px-4 py-3 rounded-DEFAULT font-label-md text-label-md w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
              WhatsApp Order
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
