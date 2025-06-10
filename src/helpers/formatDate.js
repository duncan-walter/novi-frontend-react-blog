function formatDate(dateString) {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return new Date(dateString).toLocaleDateString('nl-NL', dateOptions);
}

export default formatDate;