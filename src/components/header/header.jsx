import React from 'react'
import Container from '../container/container'
import Logo from '../logo'
import { LogoutBtn } from '..'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status) //got the status of the user from store

  // we can also use NavLink as we used in project 8 in place of useNavigate().
  const navigate = useNavigate() //useNavigate() is a React Router hook that lets you programmatically navigate (change route) inside your component.

  // Using navigate('/some-path') will do nothing unless that route is defined using <Route> in your routing configuration — usually in App.jsx or main.jsx.

  // we have just made navItems to help in looping
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button
                  className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  onClick={() => navigate(item.slug)}>
                  {item.name}
                </button>
              </li>
            ) : null)}

            {/*if authStatus is true then only the content in () will get executed */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header