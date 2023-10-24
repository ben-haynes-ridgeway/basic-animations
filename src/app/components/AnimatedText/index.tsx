import classNames from 'classnames';
import { motion, useInView } from 'framer-motion';
import { FC, useRef } from 'react';

interface IAnimatedText {
  type: keyof JSX.IntrinsicElements;
  text: string;
  className?: string;
  animateOnce?: boolean;
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    y: 0
  }
};

export const AnimatedText: FC<IAnimatedText> = ({
  type: El,
  text,
  animateOnce = false,
  className
}) => {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { amount: 0.5, once: animateOnce });

  return (
    <El>
      <span className={classNames(className, 'sr-only')}>{text}</span>
      <motion.span
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          staggerChildren: 0.02
        }}
        aria-hidden
        ref={textRef}
      >
        {text.split('').map((char, idx) => (
          <motion.span
            variants={defaultAnimations}
            // eslint-disable-next-line react/no-array-index-key
            key={`${char}_${idx}`}
            // Remember:: Spans are inline so to affect the y/x position need to set to inline block
            style={{ display: 'inline-block' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </El>
  );
};
