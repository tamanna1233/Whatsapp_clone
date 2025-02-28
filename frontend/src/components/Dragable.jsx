import React, { useRef, useState, useEffect } from 'react';

const Dragable = React.forwardRef(({ isMinimized, children }, ref) => {
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 1300, y: 500 });

  const handleMouseDown = (e) => {
    if (!isMinimized) return; // Prevent drag when fullscreen
    setIsDragging(true);
    dragRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragRef.current.x, y: e.clientY - dragRef.current.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
    className={`fixed bg-black text-white shadow-lg transition-all rounded-lg overflow-hidden z-50
`}
    style={{
          transform: isMinimized
                ? `translate(${position.x}px, ${position.y}px)`
                : 'none',
          cursor: isMinimized ? (isDragging ? 'grabbing' : 'grab') : 'default',
    }}
    onMouseDown={handleMouseDown}
>
      {children}
    </div>
  );
});

export default Dragable;
