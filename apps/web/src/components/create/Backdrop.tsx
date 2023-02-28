import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Backdrop({ children, onClick }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
