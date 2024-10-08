import * as React from "react"
import { ButtonLoader } from "../Loader/ComponentLoader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnIcon?: React.ReactElement;
    minBtn?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, type, btnIcon, minBtn, ...props }, ref) => {
        return (
            <button
                type={type}
                className={`bg-secondary text-white relative overflow-hidden font-medium ${minBtn ? "py-2 px-4 text-xs" : "py-2 md:py-3 px-6 text-base"} rounded-full rounded-bl-none hover:bg-primary-foreground hover:text-secondary transition-all duration-300 ${className}`}
                ref={ref}
                {...props}
            >
                {btnIcon && <span>{btnIcon}</span>}
                {props.isLoading && <ButtonLoader />}
                {props.children}
            </button>
        );
    }
);

interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
    url: string;
    btnIcon?: React.ReactElement;
    minBtn?: boolean;
    isLoading?: boolean;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
    ({ className, type, btnIcon, minBtn, ...props }, ref) => {
        return (
            <a
                type={type}
                className={`bg-secondary text-white relative overflow-hidden font-medium ${minBtn ? "py-2 px-4 text-xs" : "py-2 md:py-3 px-6 text-base"} rounded-full rounded-bl-none hover:bg-primary-foreground hover:text-secondary transition-all duration-300 ${className}`}
                ref={ref}
                href={props.url}
                {...props}
            >
                {btnIcon && <span>{btnIcon}</span>}
                {props.isLoading && <ButtonLoader />}
                {props.children}
            </a>
        );
    }
)

Button.displayName = "Button";
LinkButton.displayName = "LinkButton";

export default Button;
