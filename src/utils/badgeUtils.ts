const dateStringToBadgeText = (dateString: string): string => {
  const fullDate = new Date(dateString)
  if (fullDate.toString() === 'Invalid Date') return ''

  const roundedDate = getRoundedDate(fullDate)
  const today = getRoundedDate(new Date())

  const tomorrow = new Date(today) // for TOMORROW -> take today's date...
  tomorrow.setDate(tomorrow.getDate() + 1) // ...and add one day

  const yesterday = new Date(today) // similar for YESTERDAY
  yesterday.setDate(yesterday.getDate() - 1) // ...and add one day

  let dayText
  if (roundedDate.getTime() === today.getTime()) {
    // today
    dayText = 'HEUTE'
  } else if (roundedDate.getTime() === tomorrow.getTime()) {
    // tomorrow
    dayText = 'MORGEN'
  } else if (roundedDate.getTime() === yesterday.getTime()) {
    // yesterday
    dayText = 'GESTERN'
  } else if (roundedDate.getTime() > tomorrow.getTime()) {
    // any other dates in future
    dayText = roundedDate.toLocaleString('de-DE', { weekday: 'long' }).toUpperCase()
    //
  } else if (roundedDate.getTime() < today.getTime()) {
    // for dates in the past...
    const currentWeekStart = getMondayOfThisWeek(today)
    const lastWeekStart = new Date(currentWeekStart)
    lastWeekStart.setDate(currentWeekStart.getDate() - 7)

    if (roundedDate.getTime() >= currentWeekStart.getTime()) {
      // this week (no time needed)
      return 'DIESE WOCHE'
    } else if (roundedDate.getTime() >= lastWeekStart.getTime()) {
      // previous week (no time needed)
      return 'LETZTE WOCHE'
    } else return '' // any other date in the past (earlier than last week)
  } else {
    return '' // any unknown case
  }

  // extract local time part from given Date
  const timeText = fullDate.toTimeString().substring(0, 5)
  // remove 00 if minutes are "00"
  const [hours, minutes] = timeText.split(':')
  const formattedTimeString = minutes === '00' ? hours : timeText

  return `${dayText} ${formattedTimeString} UHR`
}

export function getRoundedDate(date: Date): Date {
  const result = new Date(date.toDateString()) // date part of given dateString (time = 00:00:00)
  result.setHours(12) // (time = 12:00:00 UTC)
  return result
}

export function getMondayOfThisWeek(date: Date): Date {
  return new Date(date.setDate(date.getDate() - ((date.getDay() + 6) % 7)))
}

export default dateStringToBadgeText
