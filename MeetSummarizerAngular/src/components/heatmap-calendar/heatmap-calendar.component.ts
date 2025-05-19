// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';

// interface CalendarDay {
//   date: Date;
//   meetingCount: number;
// }

// @Component({
//   selector: 'app-heatmap-calendar',
//   imports:[CommonModule],
//   templateUrl: './heatmap-calendar.component.html',
//   styleUrls: ['./heatmap-calendar.component.css']
// })
// export class HeatmapCalendarComponent implements OnInit {
//   currentMonth: Date = new Date();
//   days: CalendarDay[] = [];

//   ngOnInit(): void {
//     this.generateCalendarDays();
//   }

//   generateCalendarDays(): void {
//     const year = this.currentMonth.getFullYear();
//     const month = this.currentMonth.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const numberOfDays = lastDay.getDate();

//     this.days = [];

//     for (let i = 1; i <= numberOfDays; i++) {
//       const date = new Date(year, month, i);

//       // ניתן לשנות כאן לספירה אמיתית מהשרת
//       const meetingCount = Math.floor(Math.random() * 6); // בין 0 ל-5 פגישות

//       this.days.push({ date, meetingCount });
//     }
//   }

//   getHeatColor(meetingCount: number): string {
//     switch (meetingCount) {
//       case 0: return '#e0f7fa'; // בהיר
//       case 1: return '#b2ebf2';
//       case 2: return '#4dd0e1';
//       case 3: return '#26c6da';
//       case 4: return '#00acc1';
//       default: return '#00838f'; // כהה מאוד
//     }
//   }
// }




import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"

interface CalendarDay {
  date: Date
  meetingCount: number
}

@Component({
  selector: "app-heatmap-calendar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./heatmap-calendar.component.html",
  styleUrls: ["./heatmap-calendar.component.css"],
})
export class HeatmapCalendarComponent implements OnInit {
  currentMonth: Date = new Date()
  days: CalendarDay[] = []
  weekdays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  isLoading = true

  ngOnInit(): void {
    this.generateCalendarDays()
  }

  generateCalendarDays(): void {
    this.isLoading = true

    const year = this.currentMonth.getFullYear()
    const month = this.currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const numberOfDays = lastDay.getDate()

    this.days = []

    // Add empty days for the start of the month
    const firstDayOfWeek = firstDay.getDay()
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDate = new Date(year, month, -i)
      this.days.unshift({
        date: prevMonthDate,
        meetingCount: 0,
      })
    }

    // Add days for the current month
    for (let i = 1; i <= numberOfDays; i++) {
      const date = new Date(year, month, i)

      // Random meeting count (replace with API call in production)
      const meetingCount = Math.floor(Math.random() * 6) // Between 0 and 5 meetings

      this.days.push({ date, meetingCount })
    }

    // Add empty days for the end of the month to complete the grid
    const lastDayOfWeek = lastDay.getDay()
    if (lastDayOfWeek < 6) {
      for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
        const nextMonthDate = new Date(year, month + 1, i)
        this.days.push({
          date: nextMonthDate,
          meetingCount: 0,
        })
      }
    }

    setTimeout(() => {
      this.isLoading = false
    }, 500)
  }

  getHeatColor(meetingCount: number): string {
    switch (meetingCount) {
      case 0:
        return "#e0f7fa" // Lightest
      case 1:
        return "#b2ebf2"
      case 2:
        return "#4dd0e1"
      case 3:
        return "#26c6da"
      case 4:
        return "#00acc1"
      default:
        return "#00838f" // Darkest
    }
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth.getMonth()
  }

  isToday(date: Date): boolean {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1)
    this.generateCalendarDays()
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1)
    this.generateCalendarDays()
  }

  formatMonthYear(date: Date): string {
    return date.toLocaleString("en-US", { month: "long", year: "numeric" })
  }
}
