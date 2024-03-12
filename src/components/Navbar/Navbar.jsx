import Logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar text-white flex justify-normal">
            <div className="logo flex-1 font-bold">
                <img src={Logo} className="w-[50px] ml-6 p-1"></img>
            </div>
            <div className="icons flex max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center rounded-md">
                    <ul class="flex flex-row items-center  mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <div className="user font-medium flex items-center gap-3">
                                <img
                                    src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    alt=""
                                />
                                <span>
                                    Jane
                                    <p
                                        class="font-light text-sm text-gray-900 dark:text-white"
                                        aria-current="page"
                                    >
                                        example@gmail.com
                                    </p>
                                </span>
                            </div>
                        </li>
                        <li></li>
                        <li>
                            <p class="text-gray-900 dark:text-white">
                                Pursuit Software
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
