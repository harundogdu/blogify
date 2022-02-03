import React from 'react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { HiOutlineLogout, HiOutlineLogin } from 'react-icons/hi'
import { SiCoderwall } from 'react-icons/si'

const Navbar = () => {
    return (
        <div className="flex flex-shrink-0 justify-between items-center py-2 px-8 shadow-lg sticky top-0 bg-white mb-8">
            <a href='/' className='text-2xl font-bold'>Blogify</a>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem icon={<SiCoderwall />}>
                        All Posts
                    </MenuItem>
                    <MenuItem icon={<AddIcon />}>
                        New Post
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<HiOutlineLogin />}>
                        Login
                    </MenuItem>
                    <MenuItem icon={<HiOutlineLogout />}>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
};

export default Navbar;