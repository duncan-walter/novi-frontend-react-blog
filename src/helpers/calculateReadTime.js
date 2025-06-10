function CalculateReadTime(text) {
  const wordCount = text.split(' ').length;
  const wordsPerMinute = (1 / 0.3) * 100;

  return Math.round(wordCount / wordsPerMinute);
}

export default CalculateReadTime;