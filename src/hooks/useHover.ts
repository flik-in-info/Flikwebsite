import { useState, useCallback } from 'react';

export const useHover = () => {
  const [hoveredElement, setHoveredElement] = useState<string>('');

  const handleMouseEnter = useCallback((element: string) => {
    setHoveredElement(element);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredElement('');
  }, []);

  const getHoverProps = (elementType: string) => ({
    onMouseEnter: () => handleMouseEnter(elementType),
    onMouseLeave: handleMouseLeave
  });

  return {
    hoveredElement,
    handleMouseEnter,
    handleMouseLeave,
    getHoverProps
  };
};