import timeago from 'timeago.js'
export default (value) => {
  const date = new Date(value)
  return timeago().format(date)
  // return date.toLocaleString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric'})
}
