// Helper function to format date as YYYY-MM-DD (ISO)
export function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toISOString().split('T')[0];
  }