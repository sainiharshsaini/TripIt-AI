import { Button } from '../ui/button'

function Header() {
    return (
        <div className='flex justify-between items-center shadow-sm p-3 px-5'>
            <img src="/logo.svg" alt="logo" />
            <div>
                <Button>Sign In</Button>
            </div>
        </div>
    )
}

export default Header