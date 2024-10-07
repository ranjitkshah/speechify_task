import React, { useState, useEffect } from 'react';
import { useHoveredParagraphCoordinate } from './hook';
import { speechify } from './play';

// Play Button Component
const PlayButton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="play-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.3711 11.3506C16.8711 11.6393 16.8711 12.361 16.3711 12.6497L10.3711 16.1138C9.87109 16.4024 9.24609 16.0416 9.24609 15.4642L9.24609 8.53603C9.24609 7.95868 9.87109 7.59784 10.37109 7.88651L16.3711 11.3506Z"
      fill="white"
    />
  </svg>
);

// Main HoverPlayer Component
export default function HoverPlayer() {
  const [isButtonHovered, setIsButtonHovered] = useState(false); // Track if button is hovered
  const [hoveredElementInfo, setHoveredElementInfo] = useState(null); // Store hovered element
  const paragraphHoverInfo = useHoveredParagraphCoordinate(
    Array.from(document.querySelectorAll('p, blockquote')) // Target paragraphs and blockquotes
  );

  useEffect(() => {
    if (paragraphHoverInfo) {
      setHoveredElementInfo(paragraphHoverInfo); // Update the hovered element
    }
  }, [paragraphHoverInfo]);

  // Hide the button with a small delay if both the button and paragraph are not hovered
  useEffect(() => {
    if (!paragraphHoverInfo && !isButtonHovered) {
      const timeout = setTimeout(() => setHoveredElementInfo(null), 100); // 100ms delay
      return () => clearTimeout(timeout); // Cleanup on unmount or hover
    }
  }, [paragraphHoverInfo, isButtonHovered]);

  const handlePlayClick = () => {
    if (hoveredElementInfo?.element) {
      speechify(hoveredElementInfo.element); // Trigger speechify function
    }
  };

  // Don't render anything if no element is hovered and the button isn't hovered
  if (!hoveredElementInfo) {
    return null;
  }

  const boundingRect = hoveredElementInfo.element.getBoundingClientRect();

  return (
    <PlayButton
      style={{
        position: 'fixed',
        left: `${boundingRect.left - 50}px`, // Position left of paragraph
        top: `${boundingRect.top}px`, // Align top with paragraph
        backgroundColor: "#4A90E2",
        cursor: 'pointer',
        background: '#4A90E2', // Blue background
        borderRadius: '50%', // Circular button
        padding: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Soft shadow
      }}
      onMouseEnter={() => setIsButtonHovered(true)} // Keep button visible when hovered
      onMouseLeave={() => setIsButtonHovered(false)} // Allow the button to disappear when not hovered
      onClick={handlePlayClick} // Attach the click handler to start playing the text
    />
  );
}
