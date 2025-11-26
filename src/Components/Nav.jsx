import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false); 
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    const activeLinkClass = "text-[#FF5722] border-b-2 border-[#FF5722] font-semibold";
    const baseLinkClass = "text-[#333] hover:text-[#FF5722]";

    const mobileLinkClass = ({ isActive }) => 
        `block py-3 border-b  border-gray-100 hover:bg-gray-50 text-xl ${
            isActive ? 'text-[#FF5722] font-extrabold' : 'text-[#333]'
        }`;

    return (
        <nav className='bg-white shadow-md sticky top-0 z-50 p-4 mb-20 sm:p-6'>
            <div className='max-w-7xl mx-auto flex items-center justify-between'>
                
                <h1 
                onClick={()=>navigate('/')}
                className='text-[#FF5722] cursor-pointer text-3xl sm:text-4xl -rotate-3 hover:scale-120 duration-500 font-extrabold'>
                    CHEFS <span className='text-[#333] inline-block transition  duration-500 rotate-6 scale-110'>hub</span>
                </h1>

                <ol className='hidden md:flex gap-8 lg:gap-12 items-center content-center text-lg font-medium'>
                    <li className='transform transition duration-300 hover:scale-105'>
                        <NavLink 
                            to='/' 
                            className={({ isActive }) => 
                                `${baseLinkClass} block ${isActive ? activeLinkClass : ''}`
                            }
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className='transform transition duration-300 hover:scale-105'>
                        <NavLink 
                            to='/recipes' 
                            className={({ isActive }) => 
                                `${baseLinkClass} block ${isActive ? activeLinkClass : ''}`
                            }
                        > 
                            Recipes
                        </NavLink>
                    </li>
                </ol>

                <div className='md:hidden'>
                    <button 
                        onClick={toggleMenu}
                        className='text-3xl text-[#333] focus:outline-none hover:text-[#FF5722] transition duration-200'
                    >
                        {menuOpen ? '✕' : '☰'} 
                    </button>
                </div>

            </div>
            
            <div 
                className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl 
                    transform transition-all duration-300 ease-in-out
                    ${menuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 hidden'}`
                }
            >
                <ol className='flex flex-col p-4 text-center'>
                    <NavLink 
                        to='/' 
                        className={mobileLinkClass}
                        onClick={toggleMenu}
                        end
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to='/recipes' 
                        className={mobileLinkClass}
                        onClick={toggleMenu}
                    >
                        Recipes
                    </NavLink>
                </ol>
            </div>
        </nav>
    );
}

export default Nav;