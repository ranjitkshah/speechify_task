import React from 'react';
import { useHoveredParagraphCoordinate } from './hook';
import { speechify } from './play';

// Play Button Component
const PlayButton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="play-icon"
    width="24" // Size adjustment
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.3711 11.3506C16.8711 11.6393 16.8711 12.361 16.3711 12.6497L10.3711 16.1138C9.87109 16.4024 9.24609 16.0416 9.24609 15.4642L9.24609 8.53603C9.24609 7.95868 9.87109 7.59784 10.37109 7.88651L16.3711 11.3506Z"
      fill="white" // White play icon
    />
  </svg>
);

// Main HoverPlayer Component
export default function HoverPlayer() {
  const hoveredElementInfo = useHoveredParagraphCoordinate(
    Array.from(document.querySelectorAll('p, blockquote')) // Target paragraphs and blockquotes
  );

  const handlePlayClick = () => {
    if (hoveredElementInfo?.element) {
      speechify(hoveredElementInfo.element); // Trigger speechify function to read out the text
    }
  };

  if (!hoveredElementInfo) {
    return null; // Don't render anything if no paragraph is hovered
  }

  const boundingRect = hoveredElementInfo.element.getBoundingClientRect();
  console.log('Bounding Rect:', boundingRect); // Debugging bounding box information

  return (
    <PlayButton
      style={{
        position: 'fixed',
        left: `${boundingRect.left - 50}px`, // Place the button 50px to the left of the paragraph
        top: `${boundingRect.top}px`, // Align vertically with the paragraph
        textAlign: 'left', // Override any inherited text alignment styles
        backgroundColor: "#4A90E2",
        cursor: 'pointer',
        background: '#4A90E2', // Blue background
        borderRadius: '50%', // Circular button
        zIndex: 10000, // High z-index to stay on top of other content
        padding: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Soft shadow
      }}
      onClick={handlePlayClick} // Attach the click handler to start playing the text
    />
  );
}
