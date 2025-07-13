import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: false,
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  private timer: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) { }

  transform(value: Date | string): string {    
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - date.getTime()) / 1000));

    const timeToUpdate = this.getSecondsUntilUpdate(seconds);
    this.clearTimer();
    this.timer = this.ngZone.runOutsideAngular(() =>
      setTimeout(() => {
        this.ngZone.run(() => this.changeDetectorRef.markForCheck());
      }, timeToUpdate * 1000)
    );

    if (seconds < 29) return 'hace unos segundos';
    const intervals: { [key: string]: number } = {
      año: 31536000,
      mes: 2592000,
      semana: 604800,
      día: 86400,
      hora: 3600,
      minuto: 60,
      segundo: 1,
    };

    for (const [unit, valueInSeconds] of Object.entries(intervals)) {
      const count = Math.floor(seconds / valueInSeconds);
      if (count >= 1) {
        return `hace ${count} ${unit}${count > 1 ? 's' : ''}`;
      }
    }

    return 'hace un momento';
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate(seconds: number): number {
    if (seconds < 60) return 5;
    else if (seconds < 3600) return 30;
    else return 300;
  }

}
