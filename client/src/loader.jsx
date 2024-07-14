import classes from "./loader.module.css";

export default function Loader({ width = 70, height = 70 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="translate(1 1)"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      >
        <circle
          className={classes["loader-bg"]}
          cx="18"
          cy="18"
          r="18"
        ></circle>
        <path d="M36 18c0-9.94-8.06-18-18-18" className={classes["loader-fg"]}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          ></animateTransform>
        </path>
      </g>
    </svg>
  );
}
