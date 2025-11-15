import type { CSSProperties } from "react";
import "framer-motion";

declare module "framer-motion" {
  interface MotionProps {
    className?: string;
    disabled?: boolean;
    type?: string;
    role?: string;
    tabIndex?: number;
    id?: string;
    style?: CSSProperties;
    [key: string]: unknown;
  }
}

