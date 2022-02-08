import React from "react";
import {
    Button,
    ButtonGroup,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { useDeletePostMutation } from "services/postsApi";
import { Loading } from "components";
import { Toast, ToastEmit } from "utils/flashMessages";

function CustomTable({ data, isLoading }) {
    const [DeletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation();

    const handleDeleteClick = (id) => {
        DeletePost(id)
            .then(() => {
                ToastEmit("success", "Post deleted successfully!");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const handleUpdateClick = (id) => {

    }


    if (isDeleteLoading) {
        return <Loading />
    }

    return (
        <>
            <Toast />
            <Table variant="striped" colorScheme="blackAlpha">
                <TableCaption>All post list in Blogify!</TableCaption>
                <Thead className="bg-black">
                    <Tr>
                        <Th className="!text-white !p-6 !text-center">#</Th>
                        <Th className="!text-white !text-center">Image</Th>
                        <Th className="!text-white !text-center">Title</Th>
                        <Th className="!text-white !text-center">Tag</Th>
                        <Th className="!text-white !text-center">Content</Th>
                        <Th className="!text-white !text-center">Author</Th>
                        <Th className="!text-white !text-center">Operations</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {!isLoading && data.map((post, i) => (
                        <Tr key={post?._id} title={moment(post?.date).fromNow()}>
                            <Td className="!text-center" w={15}>{++i}</Td>
                            <Td className="!text-center" w={150} >
                                <img className="h-12 w-24 object-cover" src={post?.image} alt={post?.title} />
                            </Td>

                            <Td className="!text-center" w={180}>
                                <span className="font-semibold">{post?.title}</span>
                            </Td>

                            <Td className="!text-center" w={75}>
                                <span className="px-4 py-2 bg-black text-white rounded-lg">#{post?.tag}</span>
                            </Td>

                            <Td className="!text-center" h={75}>
                                <p className="text-sm text-gray-600 text-justify">
                                    {post?.content.substring(0, 170)}...
                                </p>
                            </Td>

                            <Td className="!text-center" w={175}>
                                <span className="font-semibold text-sm">{post?.author?.name}</span>
                            </Td>

                            <Td className="!text-center">
                                <ButtonGroup variant="solid" spacing="6">
                                    <Button onClick={() => handleDeleteClick(post?._id)}
                                        colorScheme="orange">
                                        <AiFillDelete /> <span className="mx-4">Delete</span>
                                    </Button>
                                    <Button onClick={() => handleUpdateClick(post?._id)}>
                                        <AiOutlineEdit /> <span className="mx-4">Update</span>
                                    </Button>
                                </ButtonGroup>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
}

export default CustomTable;
