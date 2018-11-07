import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
 @Input() public leyenda: String = 'Grafíco dona';
 @Input('chartLabels') public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 @Input('chartData') public doughnutChartData: number[] = [350, 450, 100];
 @Input('chartType') public doughnutChartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
