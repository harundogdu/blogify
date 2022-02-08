import {
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authLoginUser } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Toast, ToastEmit } from 'utils/flashMessages';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const { isLoading, isAuthenticated, error } = useSelector(state => state.auth);

    /* handle add new post */
    const onSubmit = (data) => {
        dispatch(authLoginUser(data));
        reset();
    };

    if (error) {
        ToastEmit("error", error);
    }


    React.useEffect(() => {
        if (isAuthenticated) {
            ToastEmit("success", "Başarıyla Giriş Yapıldı!");
            navigate("/");
        }
    }, [dispatch, isAuthenticated, navigate]);

    return (
        <>
            <Toast />

            <div className=" flex-1 px-8 flex justify-center items-center flex-col">
                <div className="md:w-[500px] bg-white p-6 rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Blogify Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} method="post">
                        <input type="hidden" name="_method" value="PUT" />
                        <Stack spacing={4}>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<HiOutlineMail color="gray.300" />}
                                />
                                <Input
                                    type="email"
                                    placeholder="Enter ur email adress..."
                                    name="email"
                                    required
                                    {...register("email")}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<AiOutlineLock color="gray.300" />}
                                />
                                <Input
                                    type="password"
                                    placeholder="Enter password..."
                                    name="password"
                                    required
                                    {...register("password")}
                                    minLength="6"
                                />
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
                                    Login
                                </Button>
                            </InputGroup>
                        </Stack>
                    </form>
                </div>
            </div>
        </>

    );
}

export default Login;
