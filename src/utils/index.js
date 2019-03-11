export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export const getDateTimeArray = (string) => {
  const dateTime = new Date(string)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const date = `${dateTime.getDate()} ${months[dateTime.getMonth()]} ${dateTime.getFullYear()}`
  const time = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  return [date, time]
}

export const titleize = (str) => {
  if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
}

export const capitalizeUnderscore = (string) => {
    const removeUndercore = string.split('_').join(' ')
    return titleize(removeUndercore)
}
