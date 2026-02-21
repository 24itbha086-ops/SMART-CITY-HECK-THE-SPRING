export const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleString();
};

export default formatDate;
