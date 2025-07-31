import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GroupData {
  name: string;
  faith: number;
  discipline: number;
  knowledge: number;
  prayer: number;
  obedience: number;
  composite: number;
}

@Component({
  selector: 'app-group-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-bar-chart.component.html',
  styleUrls: ['./group-bar-chart.component.scss']
})
export class GroupBarChartComponent {
  groups: GroupData[] = [
    { name: 'Group A', faith: 80, discipline: 75, knowledge: 85, prayer: 90, obedience: 70, composite: 80 },
    { name: 'Group B', faith: 60, discipline: 65, knowledge: 70, prayer: 75, obedience: 80, composite: 70 },
    { name: 'Group C', faith: 90, discipline: 85, knowledge: 80, prayer: 85, obedience: 95, composite: 87 },
    { name: 'Group D', faith: 70, discipline: 60, knowledge: 75, prayer: 65, obedience: 80, composite: 70 }
  ];

  get maxValue(): number {
    return Math.max(...this.groups.flatMap(g => [g.faith, g.discipline, g.knowledge, g.prayer, g.obedience, g.composite]), 100);
  }
}

