import Link from "next/link";
import { CiText } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";


const Navbar = () => {
  return (
    <div className="navbar bg-base-100">


      <div className="flex-1">

        <Link className="flex items-center justify-center gap-1" href='/'>

            <CiText size={45} />

            <span className="text-3xl capitalize tracking-widest roboto-regular">PureText</span>

        </Link>

      </div>


      <div className="flex-none">

        <ul className="menu menu-horizontal flex items-center justify-center px-1">

          <li>

            <Link href='https://github.com/somenath203/' target='_blank'>

                <FaGithub size={30} />

            </Link>

          </li>

        </ul>

      </div>

    </div>
  );
};

export default Navbar;
