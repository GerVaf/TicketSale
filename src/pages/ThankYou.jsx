import React from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const ThankYou = () => {
  const nav = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <motion.div initial={{y:'100%',scale:0.6,opacity:0.6}} animate={{y:0,scale:1,opacity:1}} transition={{type:'spring',stiffness:120}}  className=" lg:w-[600px] bg-white rounded-md p-10 flex flex-col items-center gap-5">
        <motion.div
          initial={{ scale: 0, y: "30%",rotate:270 }}
          animate={{ scale: 1, y: 0,rotate:0 }}
          transition={{ type: "spring",delay:.4 }}
          className="w-10 h-10 rounded-full bg-green-500 text-white text-4xl flex justify-center items-center rotate-6"
        >
          <TiTick />
        </motion.div>
        <motion.h1 initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} transition={{type:'spring',delay:.4}} className="font-bold text-5xl">Thank You</motion.h1>
        <button
          onClick={() => nav("/")}
          className="px-8 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-700"
        >
          Back To Home page
        </button>
      </motion.div>
    </div>
  );
};

export default ThankYou;
