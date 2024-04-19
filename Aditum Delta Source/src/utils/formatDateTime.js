const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
const formatDateTime = (timestamp) => {
    const date = new Date(timestamp.toDate()).toLocaleDateString('es-MX', options)
    const time = new Date(timestamp.toDate()).toLocaleTimeString('en-US')
    return `${date} a las ${time}`
}
export default formatDateTime