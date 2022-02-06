import React from "react";
import {
    Input,
    Textarea,
    InputGroup,
    InputLeftElement,
    Select,
    Stack,
    Button,
} from "@chakra-ui/react";
import { CustomModal } from "components";
import { MdTitle } from "react-icons/md";
import { BiImage } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useAddPostMutation } from "services/postsApi";
import Navbar from "./Navbar";

const Header = ({setIsAddPost}) => {
    const { register, handleSubmit, reset } = useForm();
    const [isOpen, setIsOpen] = React.useState(false);
    const [addPost, { isLoading }] = useAddPostMutation();
    /* handle add new post */
    const onSubmit = (data) => {
        addPost(data)
            .then(() => {
                reset();
                setIsOpen(false);
                setIsAddPost(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="flex flex-shrink-0 justify-between items-center py-2 px-8 shadow-lg sticky top-0 bg-white mb-8 outline-none">
                <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
            </div>
            <CustomModal
                modalIsOpen={isOpen}
                setIsOpen={setIsOpen}
                modalTitle="Add a new post!"
            >
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <input type="hidden" name="_method" value="PUT" />
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<BiImage color="gray.300" />}
                            />
                            <Input
                                type="text"
                                placeholder="Enter image url..."
                                name="image"
                                {...register("image")}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<MdTitle color="gray.300" />}
                            />
                            <Input
                                type="text"
                                placeholder="Enter title..."
                                name="title"
                                required
                                {...register("title")}
                                minLength={3}
                                maxLength={255}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Textarea
                                placeholder="Enter content..."
                                name="content"
                                required
                                {...register("content")}
                                minLength={3}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Select
                                placeholder="Select ur post tag"
                                name="tag"
                                required
                                {...register("tag")}
                            >
                                <option value="design">Design</option>
                                <option value="web">Web Development</option>
                                <option value="mobile">Mobile Development</option>
                                <option value="general">General</option>
                            </Select>
                        </InputGroup>
                        <InputGroup className="flex justify-end">
                            <Button
                                isLoading={isLoading}
                                loadingText="Loading"
                                colorScheme="pink"
                                variant="solid"
                                spinnerPlacement="start"
                                type="submit"
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

export default Header;
