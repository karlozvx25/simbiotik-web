import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use Motion Values for the primary coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring (lerp replacement)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  // Faster spring for the inner dot
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 400 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 400 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Use a more efficient check for hoverables
      const isClickable = !!target.closest('a, button, [role="button"], input, textarea');
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot - Follows closely */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white mix-blend-difference pointer-events-none z-[1001] flex items-center justify-center"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicking ? 0.8 : isHovering ? 0.4 : 1,
        }}
      />

      {/* Outer Ring - Follows with smooth spring lag */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-simbiotik-electric/50 pointer-events-none z-[1000]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 1 : 0.4,
          borderWidth: isHovering ? '1px' : '2px',
        }}
      >
        {/* Glow effect inside ring when hovering */}
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            className="absolute inset-0 rounded-full bg-simbiotik-electric blur-sm"
          />
        )}
      </motion.div>
    </>
  );
}

