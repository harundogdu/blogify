import React from 'react'
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { HiOutlineLogout, HiOutlineLogin } from 'react-icons/hi'
import { GrAppsRounded } from 'react-icons/gr'
import { SiCoderwall } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { authLogoutUser, logoutUser } from 'features/auth/authSlice';

function Navbar({ isOpen, setIsOpen }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    const handleLogoutClick = () => {
        dispatch(authLogoutUser())
        dispatch(logoutUser())
        navigate('/');
    };

    React.useEffect(() => {
        if (!isAuthenticated) {

        }
    }, [isAuthenticated])

    return (
        <>
            <Link to='/' className='text-2xl font-bold'>Blogify </Link>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                />
                <MenuList>
                    <Link to='/'>
                        <MenuItem icon={<SiCoderwall />}>
                            All Posts
                        </MenuItem>
                    </Link>
                    {
                        isAuthenticated ?
                            <>
                                <MenuItem onClick={() => setIsOpen(true)} icon={<AddIcon />}>
                                    New Post
                                </MenuItem>
                                <Link to='/operation'>
                                    <MenuItem icon={<GrAppsRounded />}>
                                        Operations
                                    </MenuItem>
                                </Link>
                                <MenuDivider />
                                <MenuItem icon={<HiOutlineLogout />} onClick={handleLogoutClick}>
                                    Logout
                                </MenuItem>
                            </>
                            :
                            <Link to='/login'>
                                <MenuItem icon={<HiOutlineLogin />}>
                                    Login
                                </MenuItem>
                            </Link>
                    }
                </MenuList>
            </Menu>
        </>
    )
}

export default Navbar
