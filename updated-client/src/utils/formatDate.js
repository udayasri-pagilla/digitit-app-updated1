// Utility function to format a date into a readable format
// Example output: 24 Apr 2026
export const formatDate = (date) => {

  // If no date is provided, return a dash as a placeholder
  if (!date) return "—";

  // Convert the given date into a localized string format
  // using Indian locale formatting
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",   // Display full year (e.g., 2026)
    month: "short",    // Display short month name (e.g., Apr)
    day: "numeric"     // Display day of the month
  });

};