export default function DayOfWeekNameFilter() {
	return (item) => {
        switch(item) {
            case 1: return 'Poniedziałek';
            case 2: return 'Wtorek';
            case 3: return 'Środa';
            case 4: return 'Czwartek';
            case 5: return 'Piątek';
        }
    }			
}