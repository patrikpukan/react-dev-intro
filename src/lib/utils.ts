import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getPriorityColor(priority: 1 | 2 | 3) {
  switch (priority) {
    case 1:
      return 'green'
    case 2:
      return 'yellow'
    case 3:
      return 'red'
    default:
      return 'gray'
  }
}

export function getPriorityLabel(priority: 1 | 2 | 3) {
  switch (priority) {
    case 1:
      return 'Low'
    case 2:
      return 'Medium'
    case 3:
      return 'High'
    default:
      return 'Unknown'
  }
}
