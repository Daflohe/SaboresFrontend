import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import Swal from 'sweetalert2';
import { ModalTemplateComponent } from '../modal-template/modal-template.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit{
  dataSource: MatTableDataSource<any>;
 constructor(public api:ApiService,public modalservice:ModalTemplateService,public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource;
  }

 public displayedColumns: string[]=[]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title="";


 public async get(){
    await this.api.getAll("ProductoVentums").then((res)=>{
      for (let index = 0; index < res.length; index++) {
        this.loadTable([res[index]])
      }
      this.dataSource.data=res;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }

   ngOnInit():void{
    this.get();

  this.modalservice.accion.subscribe((res)=>{
    this.title=res;
    console.log(this.modalservice.element);
  if(res=='Editar'){}

  })


  }

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadTable(data:any[]){
    this.displayedColumns=[];
    for(let column in data[0]){
      this.displayedColumns.push(column)
    }
    this.displayedColumns.push("Acciones")
  }

 openDialogEdit(element:any){
    this.modalservice.titulo="venta",
    this.modalservice.accion.next("Editar"),
    this.modalservice.element=element,

    this.dialog.open(ModalTemplateComponent,{
       width:'auto',
      height:'auto'

    });
  }

  eliminar(element){

    Swal.fire({
      title: '¿Estás seguro de eliminar la venta?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
   }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("ProductoVentums",element.idProductoVenta);
        window.location.reload()
      }
    })
  }
  realizarVenta(){
    this.modalservice.titulo="venta",
    this.modalservice.accion.next("Agregar"),
    this.dialog.open(ModalTemplateComponent,{
      width:'auto',
      height:'auto'

    });

  }

	imprSelec() {
	  var ficha = document.getElementById("table");
	  var ventimp = window.open(' ', 'popimpr');
	  ventimp.document.write( ficha.innerHTML );
	  ventimp.document.close();
	  ventimp.print( );
	  ventimp.close();
	}
  }


