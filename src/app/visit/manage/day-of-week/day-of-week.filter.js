export default function DayOfWeekNameFilter() {
  return (item) => {
    if (!Number.isInteger(item)) throw new Error("Required argument is not an integer number");
    if (item < 0 || item > 6) throw new Error("Required number is not in range");

    switch (item) {
      case 0: return 'Niedziela';
      case 1: return 'Poniedziałek';
      case 2: return 'Wtorek';
      case 3: return 'Środa';
      case 4: return 'Czwartek';
      case 5: return 'Piątek';
      case 6: return 'Sobota';
    }
  }
}