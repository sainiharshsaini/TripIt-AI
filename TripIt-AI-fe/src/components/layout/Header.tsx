import { useState, useCallback, memo } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FiHome, FiLogOut, FiPlus, FiMenu, FiX, FiUserPlus, FiPlusCircle } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
}

const UserPopoverContent = memo(({ user, onLogout }: { user: User; onLogout: () => void }) => (
    <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-gray-800 px-2 py-1 truncate">{user.name}</span>
        <span className="text-xs text-gray-500 px-2 py-1 truncate">{user.email}</span>
        <div className="h-px bg-gray-200 my-1"></div>
        <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={onLogout}
        >
            <FiLogOut className="mr-2" />
            Logout
        </Button>
    </div>
));

function Header() {
    const [openDialog, setOpenDialog] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const rawUser = localStorage.getItem('user');
    const user: User | null = rawUser ? JSON.parse(rawUser) : null;

    const fetchUserProfile = useCallback(async (token: string) => {
        try {
            const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                params: { access_token: token },
                headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
            });
            localStorage.setItem('user', JSON.stringify(res.data));
            setOpenDialog(false);
            window.location.reload();
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }, []);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => fetchUserProfile(tokenResponse.access_token),
        onError: (error) => console.error('Google login error:', error),
    });

    const handleLogout = useCallback(() => {
        googleLogout();
        localStorage.clear();
        window.location.reload();
    }, []);

    const menuVariants = {
        hidden: { x: '100%' },
        visible: { x: '0%', transition: { type: 'tween', duration: 0.3 } },
        exit: { x: '100%', transition: { type: 'tween', duration: 0.3 } },
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-opacity-95 backdrop-blur-3xl flex justify-between items-center shadow-sm py-4 px-5 md:px-10 lg:px-20">

            <Link to="/" className="flex items-center gap-2 group">
                <span className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-transparent bg-clip-text transition-all duration-300 group-hover:scale-105 group-hover:from-red-600 group-hover:to-yellow-400">
                    TripIt-AI
                </span>
            </Link>

            <nav className="hidden md:flex items-center gap-5">
                {user ? (
                    <>
                        <Link to="/create-trip">
                            <Button variant="ghost" className="rounded-full text-gray-700 bg-gray-50 hover:bg-yellow-50 hover:text-orange-500 transition-colors duration-200">
                                <FiPlus className="mr-1" />
                                Create Trip
                            </Button>
                        </Link>
                        <Link to="/my-trips">
                            <Button variant="ghost" className="rounded-full text-gray-700 bg-gray-50 hover:bg-yellow-50 hover:text-orange-500 transition-colors duration-200">
                                My Trips
                            </Button>
                        </Link>
                        <Popover>
                            <PopoverTrigger>
                                <Button variant="ghost" className="rounded-full p-0 h-auto w-auto focus-visible:ring-offset-0 focus-visible:ring-0">
                                    <img src={user.picture} alt="user profile" className="h-10 w-10 rounded-full border-2 border-yellow-400 hover:border-orange-500 transition-all duration-200 cursor-pointer" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2 bg-white rounded-lg shadow-xl border border-gray-100 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                                <UserPopoverContent user={user} onLogout={handleLogout} />
                            </PopoverContent>
                        </Popover>
                    </>
                ) : (
                    <Button onClick={() => setOpenDialog(true)} className="w-full px-6 py-3 rounded-lg bg-white border border-gray-300 cursor-pointer text-gray-700 font-medium text-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 flex items-center justify-center gap-3 hover:bg-white">
                        <FiUserPlus className="mr-2" />
                        Sign In
                    </Button>
                )}
            </nav>

            <div className="flex md:hidden items-center gap-4">
                {user && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="rounded-full p-0 h-auto w-auto focus-visible:ring-offset-0 focus-visible:ring-0">
                                <img src={user.picture} alt="user profile" className="h-10 w-10 rounded-full border-2 border-yellow-400 hover:border-orange-500 transition-all duration-200 cursor-pointer" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2 bg-white rounded-lg shadow-xl border border-gray-100 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                            <UserPopoverContent user={user} onLogout={handleLogout} />
                        </PopoverContent>
                    </Popover>
                )}

                {!user && (
                    <Button onClick={() => setOpenDialog(true)} className="w-full px-6 py-3 rounded-lg cursor-pointer bg-white border border-gray-300 text-gray-700 font-medium text-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 flex items-center justify-center gap-3 hover:bg-white">
                        <FiUserPlus className="mr-1" />
                        Sign In
                    </Button>
                )}

                {user && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-700 cursor-pointer hover:bg-yellow-50 hover:text-orange-500 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                    </Button>
                )}
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.nav
                            className="fixed top-18 right-0 w-3/5 rounded-b-md bg-white shadow-xl p-6 flex flex-col gap-4 overflow-y-auto"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Link to="/create-trip">
                                <Button variant="ghost" className="w-full cursor-pointer justify-start text-gray-700 hover:bg-yellow-50 hover:text-orange-500 transition-colors duration-200 text-lg">
                                    <FiPlusCircle className="mr-3 h-5 w-5" />
                                    Create Trip
                                </Button>
                            </Link>
                            <Link to="/my-trips">
                                <Button variant="ghost" className="w-full cursor-pointer justify-start text-gray-700 hover:bg-yellow-50 hover:text-orange-500 transition-colors duration-200 text-lg">
                                    <FiHome className="mr-3 h-5 w-5" />
                                    My Trips
                                </Button>
                            </Link>
                            <div className="mt-auto pt-4 border-t border-gray-200">
                                <Button
                                    variant="ghost"
                                    className="w-full cursor-pointer justify-start text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 text-lg"
                                    onClick={handleLogout}
                                >
                                    <FiLogOut className="mr-3 h-5 w-5" />
                                    Logout
                                </Button>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md p-6 bg-white rounded-lg shadow-xl text-center">
                    <DialogHeader>
                        <img src="/TripIt-AI-logo.png" alt="logo" height={80} width={80} className="mx-auto my-4" />
                        <DialogTitle className="font-bold text-2xl text-gray-800 mb-2">Welcome to TripIt-AI!</DialogTitle>
                        <DialogDescription className="text-gray-600 mb-6">
                            Plan your perfect trips effortlessly. Sign in with Google to get started.
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        className="w-full flex items-center cursor-pointer justify-center gap-3 py-3 text-md rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300 shadow-md"
                        onClick={() => login()}
                    >
                        <FcGoogle className="h-7 w-7" />
                        Sign In with Google
                    </Button>
                    <p className="text-xs text-gray-400 mt-4">
                        By signing in, you agree to our{' '}
                        <a href="#" className="underline hover:text-blue-500">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="underline hover:text-blue-500">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </DialogContent>
            </Dialog>
        </header>
    );
}

export default Header;
