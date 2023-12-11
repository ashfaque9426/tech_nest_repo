import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...allInputs) {
    return twMerge(clsx(allInputs));
}