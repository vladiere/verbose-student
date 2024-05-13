export const formattedString = (data: any) => {
  if (data.length === 0) {
    return '';
  }

  if (data.length === 1) {
    return data.name;
  }

  const lastIndex = data.length - 1;
  let formatString = '';

  data.forEach((item, index) => {
    console.log(item.name)
    formattedString += item.name;

    if (index < lastIndex) {
      formattedString += ', ';
    } else if (index === lastIndex && data.length > 1) {
      formattedString += ' and ';
    }
  });

  return formattedString;
}

export const timestamp = () => {
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const timezstamp = `${hours}:${minutes}:${seconds}`;

  return timezstamp;
}
