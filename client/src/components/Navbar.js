import React from 'react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton, Input, Textarea, InputGroup, InputLeftElement, Select, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Button } from '@chakra-ui/react';
import { HiOutlineLogout, HiOutlineLogin } from 'react-icons/hi'
import { SiCoderwall } from 'react-icons/si'
import { CustomModal } from 'components/export';
import { MdTitle } from 'react-icons/md'
import { BiImage } from 'react-icons/bi';
import { useForm } from "react-hook-form";
import { useAddPostMutation } from 'services/postsApi';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [addPost, { isLoading }] = useAddPostMutation();
    const onSubmit = data => {
        addPost(data).then(() => {
            reset();
            setIsOpen(false);
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <>
            <div className="flex flex-shrink-0 justify-between items-center py-2 px-8 shadow-lg sticky top-0 bg-white mb-8 outline-none">
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
                        <MenuItem onClick={() => setIsOpen(true)} icon={<AddIcon />}>
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
            <CustomModal modalIsOpen={isOpen} setIsOpen={setIsOpen} modalTitle="Add a new post!">
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <input type="hidden" name='_method' value="PUT" />
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<BiImage color='gray.300' />}
                            />
                            <Input type='text' placeholder='Enter image url...' name='image' required {...register("image")} />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<MdTitle color='gray.300' />}
                            />
                            <Input type='text' placeholder='Enter title...' name='title' required {...register("title")} />
                        </InputGroup>
                        <InputGroup>
                            <Textarea placeholder="Enter content..." name='content' required {...register("content")} />
                        </InputGroup>
                        <InputGroup>
                            <Select placeholder='Select ur post tag' name='tag' required {...register("tag")}>
                                <option value='design'>Design</option>
                                <option value='web'>Web Development</option>
                                <option value='mobile'>Mobile Development</option>
                                <option value='general'>General</option>
                            </Select>
                        </InputGroup>
                        <InputGroup className='flex justify-end'>
                            <Button
                                isLoading={isLoading}
                                loadingText='Loading'
                                colorScheme='pink'
                                variant='solid'
                                spinnerPlacement='start'
                                type='submit'
                            >
                                Share Post
                            </Button>
                        </InputGroup>
                    </Stack>
                </form>
            </CustomModal>
        </>
    );
};

export default Navbar;