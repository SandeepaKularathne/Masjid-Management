import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent implements OnInit, OnDestroy {
  time: string ="";
  private intervalId: any;

  ngOnInit(): void {
    this.updateClock();
    this.intervalId = setInterval(() => this.updateClock(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateClock(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.time = `${hours}:${minutes}:${seconds}`;
  }
}
