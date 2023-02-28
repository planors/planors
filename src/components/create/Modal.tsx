import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { GitHub, File } from "~/common/svg";

type Props = {
  handleClose: () => void;
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export default function Modal({ handleClose }: Props) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className="rounded-md bg-white p-4 py-8 px-16 text-neutral-800 "
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="mb-6 text-2xl font-bold">Select Import Source</h1>
        <div className="flex flex-col gap-4">
          <button className="flex flex-row items-center gap-4 rounded-md bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700">
            <GitHub />
            <span>Import from GitHub</span>
          </button>
          <button className="flex flex-row items-center gap-4 rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-100">
            <File />
            <span>Import from a file</span>
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
}
