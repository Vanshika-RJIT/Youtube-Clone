import { HiOutlineMusicalNote, HiMusicalNote } from "react-icons/hi2";
import { BsLaptop, BsLaptopFill, BsEmojiLaughing, BsFillEmojiLaughingFill } from "react-icons/bs";
import { TiCodeOutline, TiCode } from "react-icons/ti";
import { IoFastFoodSharp, IoFastFoodOutline, IoSkullSharp, IoSkullOutline } from "react-icons/io5";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { MdOutlineSportsCricket, MdSportsCricket, MdOutlineVideoLibrary, MdVideoLibrary } from "react-icons/md";
import { HiOutlineFire, HiFire } from "react-icons/hi";

const iconStyle = { height: "24px", width: "24px" };

const categories = [
  {
    id: 1,
    name: "Home",
    icon: <AiOutlineHome style={iconStyle} />,
    active: <AiFillHome style={iconStyle} />,
    type: "main",
  },
  {
    id: 2,
    name: "Trending",
    icon: <HiOutlineFire style={iconStyle} />,
    active: <HiFire style={iconStyle} />,
    type: "main",
    path: "/trending",
  },
  {
    id: 3,
    name: "Library",
    icon: <MdOutlineVideoLibrary style={iconStyle} />,
    active: <MdVideoLibrary style={iconStyle} />,
    type: "main",
    path: "/library",
  },
  // Divider
  {
    id: 100,
    type: "divider",
  },
  {
    id: 4,
    name: "React JS",
    icon: <TiCodeOutline style={iconStyle} />,
    active: <TiCode style={iconStyle} />,
    type: "category",
  },
  {
    id: 5,
    name: "DuaLipa",
    icon: <HiOutlineMusicalNote style={iconStyle} />,
    active: <HiMusicalNote style={iconStyle} />,
    type: "category",
  },
  {
    id: 6,
    name: "Comedy",
    icon: <BsEmojiLaughing style={iconStyle} />,
    active: <BsFillEmojiLaughingFill style={iconStyle} />,
    type: "category",
  },
  {
    id: 7,
    name: "Technology",
    icon: <BsLaptop style={iconStyle} />,
    active: <BsLaptopFill style={iconStyle} />,
    type: "category",
  },
  {
    id: 8,
    name: "Food",
    icon: <IoFastFoodOutline style={iconStyle} />,
    active: <IoFastFoodSharp style={iconStyle} />,
    type: "category",
  },
  {
    id: 9,
    name: "Travis Scott",
    icon: <IoSkullOutline style={iconStyle} />,
    active: <IoSkullSharp style={iconStyle} />,
    type: "category",
  },
  {
    id: 10,
    name: "Cricket",
    icon: <MdOutlineSportsCricket style={iconStyle} />,
    active: <MdSportsCricket style={iconStyle} />,
    type: "category",
  }
];

export default categories;
