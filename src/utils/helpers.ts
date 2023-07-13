export const createExcerpt = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};


export const formatHumanReadableDate = (date: string): string => {
  if (!date) {
    return '';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const dateObject = new Date(date);

  return new Intl.DateTimeFormat('en-US', options).format(dateObject);
};
