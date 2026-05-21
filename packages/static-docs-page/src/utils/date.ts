const dateFormatter = new Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	hour: 'numeric',
	hour12: false,
	minute: '2-digit',
	month: '2-digit',
	timeZone: 'UTC',
	year: 'numeric',
});

/**
 * Formats a date string into a human-readable format in German locale, using UTC time zone. The output format is "DD.MM.YYYY, HH:MM (UTC)".
 * @param dateString A string representing a date, in a format parsable by the JavaScript Date constructor.
 * @returns A formatted date string in the format "DD.MM.YYYY, HH:MM (UTC)".
 * @example
 * const formattedDate = formatDate("2024-06-01T12:34:56Z");
 */
export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return dateFormatter.format(date);
};
