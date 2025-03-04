<<<<<<< HEAD
import React, { useRef, useState, useEffect } from 'react';

const Dragable = React.forwardRef(({ isMinimized, children }, ref) => {
      const dragRef = useRef(null);
      const [isDragging, setIsDragging] = useState(false);
      const [position, setPosition] = useState({ x: 1300, y: 500 });

=======
import React, { useRef, useState, useEffect, useId } from 'react';

/* This code defines a functional React component called `Dragable` using the `React.forwardRef`
method. The component allows for dragging and positioning of its children within a specified area on
the screen. */
const Dragable = React.forwardRef(({ isMinimized, children, className }, ref) => {
      const dragRef = useRef(null);
      const [isDragging, setIsDragging] = useState(false);
      const [position, setPosition] = useState({ x: 100, y: 100 });
      const id = useId();
>>>>>>> 5d759b8e9ae707086410d3d8ec94f0f83f0f4f39
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
<<<<<<< HEAD
                  className={`fixed bg-black text-white shadow-lg transition-all rounded-lg overflow-hidden z-50
`}
=======
                  className={`${className} fixed bg-black text-white shadow-lg transition-all rounded-lg overflow-hidden z-50 
                        `}
>>>>>>> 5d759b8e9ae707086410d3d8ec94f0f83f0f4f39
                  style={{
                        transform: isMinimized
                              ? `translate(${position.x}px, ${position.y}px)`
                              : 'none',
                        cursor: isMinimized ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  }}
                  onMouseDown={handleMouseDown}
<<<<<<< HEAD
=======
                  htmlFor={id}
                  ref={ref}
>>>>>>> 5d759b8e9ae707086410d3d8ec94f0f83f0f4f39
            >
                  {children}
            </div>
      );
});

export default Dragable;
