// src/Button.tsx
import { jsx } from "react/jsx-runtime";
var Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}) => {
  const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: ["storybook-button", `storybook-button--${size}`, mode].join(" "),
      style: { backgroundColor },
      ...props,
      children: label
    }
  );
};

export {
  Button
};
