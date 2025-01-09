export const getRandomColor = () => {
  const colors = ["#81C784", "#7E57C2", "#64B5F6", "#EC407A", "#FFB74D"];

  return colors[Math.floor(Math.random() * colors.length)];
};
