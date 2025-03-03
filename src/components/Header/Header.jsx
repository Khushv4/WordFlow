import React, { useState } from 'react';
import { Container, Logo, LogoutBtm } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react'; // Icons for mobile menu

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className='py-4 bg-yellow-50  fixed w-full top-0 z-50'>
      <Container>
        <nav className='flex items-center justify-between'>
          <Link to='/' className='flex items-center'>
            <Logo />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className='md:hidden text-gray-800 focus:outline-none'
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex ml-auto'>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className='px-3'>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='inline-block px-6 py-2 text-gray-800 hover:bg-amber-400 rounded-full transition duration-200'
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li className='px-6'>
                <LogoutBtm />
              </li>
            )}
          </ul>

          {/* Mobile Navigation */}
          {menuOpen && (
            <ul className='absolute top-full left-0 w-full bg-yellow-50 md:hidden shadow-md'>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className='border-b'>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        className='w-full text-left px-6 py-3 text-gray-800 hover:bg-amber-400 transition duration-200'
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className='border-b'>
                  <LogoutBtm className='w-full text-left px-6 py-3' onClick={() => setMenuOpen(false)} />
                </li>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
