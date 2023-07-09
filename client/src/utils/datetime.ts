export function convertDatetime(ISOString: string) {
  const formattedDateTime = ISOString.replace('T', ' ').slice(0, 16);
  return formattedDateTime;
}
