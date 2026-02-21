const priorityCalculator = (volume = 0, urgency = 0) => {
  return Math.min(100, volume * 10 + urgency * 20);
};

export default priorityCalculator;
