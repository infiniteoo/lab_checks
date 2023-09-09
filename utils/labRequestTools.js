import { formatDistanceToNow } from 'date-fns'

export const getTimeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const getTimeAgoInMinutes = (date) => {
  const currentTime = new Date()
  const requestTime = new Date(date)
  const timeDifference = currentTime - requestTime
  const minutesAgo = Math.floor(timeDifference / (1000 * 60))
  return minutesAgo
}

export function toggleExpand(prevExpanded, _id) {
  return {
    ...prevExpanded,
    [_id]: !prevExpanded[_id],
  }
}
