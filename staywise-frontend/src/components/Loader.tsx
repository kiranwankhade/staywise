import { motion } from 'framer-motion';

export default function Loader() {
  const loadingContainerVariants = {
    start: { transition: { staggerChildren: 0.2 } },
    end: { transition: { staggerChildren: 0.2 } },
  };

  const loadingCircleVariants = {
    start: { y: '0%' },
    end: { y: '100%' },
  };

  const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  return (
    <div className="flex justify-center items-center h-full min-h-[30vh]">
      <motion.div
        className="w-16 h-4 flex justify-between"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="block w-3 h-3 bg-sw-primary rounded-full"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="block w-3 h-3 bg-sw-primary rounded-full"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="block w-3 h-3 bg-sw-primary rounded-full"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
    </div>
  );
}