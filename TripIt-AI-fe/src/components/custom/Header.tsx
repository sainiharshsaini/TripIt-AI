import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog"
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FiPlusCircle, FiUserPlus } from "react-icons/fi";

// type for the user object stored in localStorage
interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
}

function Header() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const user: User | null = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        console.log(user);
    }, [])

    const login = useGoogleLogin({
        onSuccess: (codeRes) => GetUserProfile(codeRes),
        onError: (error) => console.log(error)
    })

    const GetUserProfile = (tokenInfo: { access_token: string }) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((res) => {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res.data));
            setOpenDialog(false);
            window.location.reload();
        }).catch(error => {
            console.error("Error fetching user profile:", error);
        })
    }

    return (
        <div className='flex justify-between items-center shadow-sm shadow-orange-100 p-5 md:px-10 lg:px-20'>
            <a href={"/"}>
                <img src="/TripIt-AI-logo.png" alt="logo" width={120} height={120} />
            </a>
            <div>
                {user ?
                    <div className='flex items-center gap-4'>
                        <div className='hidden md:flex items-center gap-4'>
                            <a href="/create-trip">
                                <Button variant="outline" className='rounded-full'>
                                    <FiPlusCircle />
                                    Create Trip
                                </Button>
                            </a>
                            <a href="/my-trips">
                                <Button variant="outline" className='rounded-full'>My Trips</Button>
                            </a>
                        </div>
                        <Popover>
                            <PopoverTrigger>
                                <img src={user?.picture} alt='user profile' className='h-[35px] w-[35px] rounded-full' />
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col gap-5 mr-5'>
                                <div className='flex gap-4 md:hidden'>
                                    <a href="/create-trip">
                                        <Button variant="outline" className='rounded-full'>
                                            <FiPlusCircle />
                                            Create Trip
                                        </Button>
                                    </a>
                                    <a href="/my-trips">
                                        <Button variant="outline" className='rounded-full'>My Trips</Button>
                                    </a>
                                </div>
                                <h2 className='cursor-pointer text-red-500'
                                    onClick={() => {
                                        googleLogout();
                                        localStorage.clear();
                                        window.location.reload();
                                    }}>Logout</h2>
                            </PopoverContent>
                        </Popover>
                    </div> :
                    <Button className='rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF6347]'
                        onClick={() => setOpenDialog(true)}>
                        <FiUserPlus />
                        Sign In
                    </Button>
                }
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/TripIt-AI-logo.png" alt="logo" height={100} width={100} />
                            <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                            <p>Sign into the App with Google Authentication securely</p>
                            <Button className='w-full mt-5 flex gap-4 items-center'
                                onClick={() => login()}>
                                <FcGoogle className='h-7 w-7' />
                                Sign In With Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Header