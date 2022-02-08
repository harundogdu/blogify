import React from 'react'
import { CustomTable, Loading, Error, CustomModal } from 'components'
import { useGetAllPostsQuery, useUpdatePostMutation } from 'services/postsApi'
import {
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    Textarea,
    Select,
    Button
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BiImage } from "react-icons/bi";
import { MdTitle } from "react-icons/md";
import { ToastEmit, Toast } from 'utils/flashMessages';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Operations() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const [currentPost, setCurrentPost] = React.useState({});
    const [isUpdateModal, setIsUpdateModal] = React.useState(false);
    const { data, isFetching, error } = useGetAllPostsQuery();
    const { register, handleSubmit, reset } = useForm();
    const [UpdatePost, { isLoading: isUpdateLoading }] = useUpdatePostMutation();

    const handleUpdateClick = (post) => {
        setIsUpdateModal(true);
        setCurrentPost(post);
    };

    const handleUpdateSubmit = (data) => {
        data._id = currentPost._id;
        UpdatePost(data)
            .then(() => {
                ToastEmit("success", "Post updated successfully!");
                setIsUpdateModal(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    /* if isLoggedIn : FAlSE  */
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate])

    React.useEffect(() => {
        if (!isUpdateModal) {
            reset();
        }
    }, [isUpdateModal, reset]);

    if (isFetching) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    return (
        <>
            <Toast />
            <div className='flex-1 px-8'>
                <h1 className='text-3xl font-bold mb-4 text-center'>Operations in Post List</h1>

                <CustomTable
                    data={data}
                    isLoading={isFetching}
                    handleUpdateClick={handleUpdateClick} />
                <CustomModal
                    modalTitle="Update Post"
                    setIsOpen={setIsUpdateModal}
                    modalIsOpen={isUpdateModal}
                >
                    <form onSubmit={handleSubmit(handleUpdateSubmit)} method="post">
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
                                    value={currentPost.image}
                                    onChange={(e) => {
                                        setCurrentPost({ ...currentPost, image: e.target.value });
                                    }}
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
                                    value={currentPost.title}
                                    onChange={(e) => {
                                        setCurrentPost({ ...currentPost, title: e.target.value });
                                    }}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Textarea
                                    placeholder="Enter content..."
                                    name="content"
                                    required
                                    {...register("content")}
                                    minLength={3}
                                    value={currentPost.content}
                                    onChange={(e) => {
                                        setCurrentPost({ ...currentPost, content: e.target.value });
                                    }}
                                />
                            </InputGroup>
                            <InputGroup>
                                <Select
                                    placeholder="Select ur post tag"
                                    name="tag"
                                    required
                                    {...register("tag")}
                                    value={currentPost.tag}
                                    onChange={(e) => {
                                        setCurrentPost({ ...currentPost, tag: e.target.value });
                                    }}
                                >
                                    <option value="design">Design</option>
                                    <option value="web">Web Development</option>
                                    <option value="mobile">Mobile Development</option>
                                    <option value="general">General</option>
                                </Select>
                            </InputGroup>
                            <InputGroup className="flex justify-end">
                                <Button
                                    isLoading={isUpdateLoading}
                                    loadingText="Loading"
                                    colorScheme="pink"
                                    variant="solid"
                                    spinnerPlacement="start"
                                    type="submit"
                                >
                                    Update Post
                                </Button>
                            </InputGroup>
                        </Stack>
                    </form>
                </CustomModal>
            </div>
        </>
    )
}

export default Operations
