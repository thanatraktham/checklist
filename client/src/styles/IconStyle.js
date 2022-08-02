const arrowIconStyle = (show) => [
  {
    transition: "all 0.2s ease",
    transform: `rotate(${show ? "0.5turn" : 0})`,
    cursor: "pointer",
  },
];

export { arrowIconStyle };
