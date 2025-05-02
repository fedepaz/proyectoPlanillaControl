"use client";

import React, { forwardRef, useRef, useImperativeHandle } from "react";

import { styled } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";

const RippleContainer = styled("span")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "hidden",
  borderRadius: "inherit",
  pointerEvents: "none",
}));

export interface TouchRippleRef {
  start: (event: React.SyntheticEvent) => void;
  stop: (event: React.SyntheticEvent) => void;
}

export const TouchRipple = forwardRef<TouchRippleRef, Record<string, unknown>>(
  (props, ref) => {
    // Use ButtonBase's internal methods to create ripple effect
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
      start: (event: React.SyntheticEvent) => {
        // Simulate ripple start
        if (buttonRef.current) {
          const element = buttonRef.current;
          const rect = element.getBoundingClientRect();

          // Create ripple element
          const ripple = document.createElement("span");
          ripple.className = "custom-ripple-effect";

          // Position ripple
          const size = Math.max(rect.width, rect.height);
          const x = event.clientX
            ? event.clientX - rect.left - size / 2
            : rect.width / 2;
          const y = event.clientY
            ? event.clientY - rect.top - size / 2
            : rect.height / 2;

          ripple.style.width = ripple.style.height = `${size}px`;
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;

          // Add ripple to container
          element.appendChild(ripple);

          // Animate ripple
          setTimeout(() => {
            ripple.classList.add("active");
          }, 0);
        }
      },
      stop: () => {
        // Remove ripples after animation
        if (buttonRef.current) {
          const ripples = buttonRef.current.getElementsByClassName(
            "custom-ripple-effect"
          );

          // Add fade-out class to all ripples
          Array.from(ripples).forEach((ripple) => {
            ripple.classList.add("fade-out");

            // Remove ripple after animation
            setTimeout(() => {
              ripple.remove();
            }, 450); // Match animation duration
          });
        }
      },
    }));

    return (
      <RippleContainer {...props}>
        <ButtonBase
          ref={buttonRef}
          component="span"
          disableRipple
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        />
        <style jsx global>{`
          .custom-ripple-effect {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.1);
            transform: scale(0);
            opacity: 0.4;
            pointer-events: none;
            transition: transform 450ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 450ms cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dark-mode .custom-ripple-effect {
            background-color: rgba(255, 255, 255, 0.2);
          }
          .custom-ripple-effect.active {
            transform: scale(1);
          }
          .custom-ripple-effect.fade-out {
            opacity: 0;
          }
        `}</style>
      </RippleContainer>
    );
  }
);

TouchRipple.displayName = "TouchRipple";
