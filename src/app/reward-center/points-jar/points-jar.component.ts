import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-points-jar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './points-jar.component.html',
  styleUrls: ['./points-jar.component.scss']
})
export class PointsJarComponent implements OnChanges {
  @Input() points = 0;
  @Input() max = 10000;
  @Input() animate = false;

  ngOnChanges() {
    if (this.animate) {
      setTimeout(() => (this.animate = false), 1500);
    }
  }

  get fillPercent(): number {
    const percent = (this.points / this.max) * 100;
    return Math.min(100, percent);
  }
}
