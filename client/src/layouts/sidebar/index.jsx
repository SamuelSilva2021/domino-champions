import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = {
    open: {
      width: isTabletMid ? "16rem" : "16rem",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: isTabletMid ? "0rem" : "4rem",
      transition: {
        damping: 40,
      },
    },
  };

  const subMenusList = [
    {
      name: "Tabela",
      icon: RiBuilding3Line,
      menus: ["Tabela de jogos"],
    },
    {
      name: "Análises",
      icon: TbReportAnalytics,
      menus: ["Ranking Pontuadores", "Pontos Duplas"],
    },
  ];

  return (
    <div>
      {isTabletMid && (
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 max-h-screen z-[998] bg-black/50 ${
            open ? "block" : "hidden"
          }`}
        ></div>
      )}
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={isTabletMid ? "closed" : "open"}
        animate={open ? "open" : "closed"}
        className="bg-white text-gray shadow-xl z-[999] w-[16rem] overflow-hidden md:relative fixed h-screen"
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
          <img src="../../src/assets/icons8domino.png" width={45} alt="" />
          <span className="text-xl whitespace-pre">Dominó</span>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Início
              </NavLink>
            </li>
            <li>
              <NavLink to={"/jogadores"} className="link">
                <BsPerson size={23} className="min-w-max" />
                Jogadores
              </NavLink>
            </li>
            <li>
              <NavLink to={"/duplas"} className="link">
                <FiUsers size={23} className="min-w-max" />
                Duplas
              </NavLink>
            </li>

            {isTabletMid && (
              <motion.div
                animate={open ? { height: "fit-content" } : { height: 0 }}
                className="overflow-hidden"
              >
                <div className="border-y py-5 border-slate-300">
                  <small className="pl-3 text-slate-500 inline-block mb-2">
                    Campeonato
                  </small>
                  {subMenusList?.map((menu) => (
                    <div key={menu.name} className="flex flex-col gap-1">
                      <SubMenu data={menu} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <li>
              <NavLink to={"/settings"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
        {isTabletMid && (
          <motion.div
            onClick={() => {
              setOpen(!open);
            }}
            animate={open ? { x: 0, y: 0, rotate: 0 } : { rotate: 180 }}
            transition={{ duration: 0 }}
            className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
          >
            <IoIosArrowBack size={25} />
          </motion.div>
        )}
      </motion.div>
      {!isTabletMid && (
        <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
          <MdMenu size={25} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
