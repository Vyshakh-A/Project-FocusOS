export default function isActive(date) {
  return Date.now() - new Date(date).getTime() < 48 * 60 * 60 * 1000;
}
