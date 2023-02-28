import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ApiService } from 'src/app/services/api.service';
import { Chart,ChartDataset,ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one
   *zcolumn per row */

  public consultVentas:any;
 public consultReservas:any;
 public consultPreguntas:any;
 public consultReservasFecha:any;
 public consultProductos:any;
 public consultUsuarios:any;

  constructor(private breakpointObserver: BreakpointObserver,public service:ApiService) {}

  ngOnInit() {
    this.consultaVentas()
    this.consultaReservasSede()
    this.consultaReservasFecha()
    this.consultaPreguntas()
    this.consultaUsuarios()
    this.consultaProductos()
  }
  consultaVentas(){

    this.consultVentas = new Chart("cantVentas", {
      type: 'pie',
      data: {// values on X-Axis
        labels: ['Pechuga a la plancha', 'Mojarra', 'Carne asada', 'Churrasco'],
        datasets: [
          {
            data: ['15', '20', '10', '5'],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
          }
        ]
      },
    });
}
consultaReservasSede(){

  this.consultReservas = new Chart("cantReservas", {
    type: 'polarArea',
    data: {// values on X-Axis
      labels: ['7 de agosto', 'CAN aire libre', 'CAN gourmet', 'Jimenez'],
      datasets: [
        {

          data: ['15', '20', '16', '6'],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
        }
      ]
    },
  });
}

consultaReservasFecha(){

  this.consultReservasFecha = new Chart("cantReservasFecha", {
    type: 'doughnut',

    data: {// values on X-Axis
      labels: ['2022-11-28', '2022-11-29', '2022-11-30', '2022-12-01','2022-12-02'],
      datasets: [
        {

          data: ['5', '6', '7', '2','3'],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
        }
      ]
    },
    options: {
      indexAxis: 'y',

    }
  });
}


consultaPreguntas(){

  this.consultPreguntas = new Chart("cantPreguntas", {
    type: 'pie',
    data: {// values on X-Axis
      labels: ['Con respuesta','Sin respuesta'],
      datasets: [
        {

          data: ['5','3'],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
        }
      ]
    },
  });
}

consultaUsuarios(){

  this.consultUsuarios = new Chart("cantUsuarios", {
    type: 'pie',
    data: {// values on X-Axis
      labels: ['Cantidad de usuarios'],
      datasets: [
        {

          data: ['20'],
          backgroundColor: [

            'rgba(255, 205, 86, 0.2)',

          ],
          borderColor: [
            'rgba(255, 205, 86, 0.2)',

          ],
        }
      ]
    },
  });
}


consultaProductos(){

  this.consultProductos = new Chart("cantProductos", {
    type: 'doughnut',
    data: {// values on X-Axis
      labels: ['Cantidad productos'],
      datasets: [
        {

          data: ['10'],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 0.2)',
          ],
        }
      ]
    },
  });
}

}
