import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

interface CalendarDay {
  date: Date;
  day: number;
  status: 'none' | 'absent' | 'justified';
  isCurrentMonth: boolean;
}

interface CalendarMonth {
  year: number;
  month: number;
  name: string;
  days: CalendarDay[];
}

@Component({
  selector: 'app-componente-prueba-estilos',
  imports: [CommonModule],
  templateUrl: './componente-prueba-estilos.component.html',
  styleUrl: './componente-prueba-estilos.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ComponentePruebaEstilosComponent {
  @Input() isOpen: boolean = false;
  @Input() employeeId: number = 0;
  @Input() employeeName: string = 'Empleado';
  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  @Output() closeEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<any>();

  months: CalendarMonth[] = [];

  // Context menu variables
  showContextMenu: boolean = false;
  contextMenuX: number = 0;
  contextMenuY: number = 0;
  selectedDay: CalendarDay | null = null;

  constructor() { }

  ngOnInit(): void {
    // Generate calendars for the given date range
    this.generateCalendars();
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    // Close context menu when clicking outside
    if (this.showContextMenu) {
      this.showContextMenu = false;
    }
  }

  generateCalendars(): void {
    this.months = [];

    if (!this.startDate || !this.endDate) {
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Set to first day of month
    const currentDate = new Date(start.getFullYear(), start.getMonth(), 1);

    // Generate calendars for each month in the range
    while (currentDate <= end) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      // Create month object
      const monthObj: CalendarMonth = {
        year,
        month,
        name: this.getMonthName(month),
        days: this.generateDaysForMonth(year, month)
      };

      this.months.push(monthObj);

      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  }

  generateDaysForMonth(year: number, month: number): CalendarDay[] {
    const days: CalendarDay[] = [];

    // Get first day of month and last day of month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDayOfMonth.getDay();
    // Convert Sunday from 0 to 7 to align with Monday as first day
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;

    // Add days from previous month to fill in the first week
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonthLastDay = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    // Add days from previous month
    for (let i = 1; i < firstDayOfWeek; i++) {
      const day = prevMonthLastDay - firstDayOfWeek + i + 1;
      days.push({
        date: new Date(prevMonthYear, prevMonth, day),
        day,
        status: 'none',
        isCurrentMonth: false
      });
    }

    // Add days for current month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push({
        date: new Date(year, month, day),
        day,
        status: 'none',
        isCurrentMonth: true
      });
    }

    // Add days from next month to complete the calendar grid
    const lastDayOfWeek = lastDayOfMonth.getDay();
    // If last day is Sunday (0), no need to add more days
    if (lastDayOfWeek !== 0) {
      const daysToAdd = 7 - lastDayOfWeek;
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextMonthYear = month === 11 ? year + 1 : year;

      for (let day = 1; day <= daysToAdd; day++) {
        days.push({
          date: new Date(nextMonthYear, nextMonth, day),
          day,
          status: 'none',
          isCurrentMonth: false
        });
      }
    }

    return days;
  }

  toggleDayStatus(day: CalendarDay, event: MouseEvent): void {
    // Prevent the document click handler from closing the menu immediately
    event.stopPropagation();

    this.selectedDay = day;

    // Position the context menu next to the clicked element
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;

    // Ensure menu doesn't go off-screen
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Assume menu is about 150px wide and 120px tall
    if (this.contextMenuX + 150 > windowWidth) {
      this.contextMenuX = windowWidth - 160;
    }

    if (this.contextMenuY + 120 > windowHeight) {
      this.contextMenuY = windowHeight - 130;
    }

    this.showContextMenu = true;
  }

  setDayStatus(status: 'none' | 'absent' | 'justified'): void {
    if (this.selectedDay) {
      this.selectedDay.status = status;
    }
    this.showContextMenu = false;
  }

  getMonthName(month: number): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[month];
  }

  formatDate(date: Date): string {
    if (!date) return '';
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  getAbsentCount(): number {
    let count = 0;
    this.months.forEach(month => {
      month.days.forEach(day => {
        if (day.isCurrentMonth && day.status === 'absent') {
          count++;
        }
      });
    });
    return count;
  }

  getJustifiedCount(): number {
    let count = 0;
    this.months.forEach(month => {
      month.days.forEach(day => {
        if (day.isCurrentMonth && day.status === 'justified') {
          count++;
        }
      });
    });
    return count;
  }

  close(): void {
    this.closeEvent.emit();
  }

  saveChanges(): void {
    // Prepare the data to be sent back to the parent component
    const attendanceData = {
      employeeId: this.employeeId,
      period: {
        startDate: this.startDate,
        endDate: this.endDate
      },
      absences: this.getAllAbsences()
    };

    this.saveEvent.emit(attendanceData);
    this.close();
  }

  private getAllAbsences() {
    const absences: { date: Date; status: string }[] = [];

    this.months.forEach(month => {
      month.days.forEach(day => {
        if (day.isCurrentMonth && day.status !== 'none') {
          absences.push({
            date: day.date,
            status: day.status
          });
        }
      });
    });

    return absences;
  }
}
