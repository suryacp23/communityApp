export const getRandomColor = (input) => {
  const colors = ["#81C784", "#7E57C2", "#64B5F6", "#EC407A", "#FFB74D"];
  const hash = Array.from(input).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  return colors[hash % colors.length];
};

export const colorMap = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
  purple: "bg-purple-100 text-purple-800",
  gray: "bg-gray-100 text-gray-800",
};
