import cx from "classnames";

interface PlayIconProps {
  style?: string;
}

export function PlayIcon({ style }: PlayIconProps) {
  return (
    <svg
      className={cx(style, "h-6 w-6")}
      fill="#E9EDDE"
      width="249px"
      height="249px"
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
      transform="scale(-1,1)"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M694.018 926.244c-27.296 18.796-27.3 49.269 0 68.067l509.836 351.074c27.296 18.797 49.424 7.18 49.424-25.959V601.13c0-33.133-22.125-44.757-49.424-25.959L694.018 926.244Z"
          fill-rule="evenodd"
        />{" "}
      </g>
    </svg>
  );
}
