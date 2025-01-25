export const getRandomColor = (input) => {
  const colors = ["#81C784", "#7E57C2", "#64B5F6", "#EC407A", "#FFB74D"];
  const hash = Array.from(input).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  return colors[hash % colors.length];
};
