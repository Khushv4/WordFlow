import React from 'react'
import {Container, Logo, LogoutBtm} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-7 bg-yellow-50'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to ='/'>
            <Logo />
            
            </Link>
          </div>

          <ul className='flex  ml-auto'>
          {navItems.map((item)=>
          item.active ? (
            <li key={item.name} className='px-3'>
              <button
              onClick={()=>navigate(item.slug)}
              className='inline-block px-6 py-2 hover:cursor-pointer duration-200 hover:bg-amber-400 rounded-full'>{item.name}</button>

            </li>
          ) : null
          )}

          {authStatus && (
            <li className='px-6'>
              <LogoutBtm/>
            </li>
          )}

          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header