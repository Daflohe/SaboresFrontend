import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { productoVenta } from 'src/app/models/productoVenta.model';
import { ApiService } from 'src/app/services/api.service';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.component.html',
  styleUrls: ['./registro-venta.component.scss']
})

export class RegistroVentaComponent implements OnInit{
user;
productos = [];
tiempoTranscurrido = Date.now();
hoy = new Date(this.tiempoTranscurrido);

 title="";
  accion="";
  product: Product;
 constructor(private fb: FormBuilder,public api:ApiService, public modalservice:ModalTemplateService) {
    this.user= JSON.parse(localStorage.getItem("Usuario"))

this.modalservice.accion.subscribe((res)=>{
      this.title=res;
      this.accion=this.modalservice.accion.value;
      if(res=='Editar'){
        this.addressForm.controls['producto'].setValue(this.modalservice.element.nombreProducto);
        this.addressForm.controls['cantidad'].setValue(this.modalservice.element.cantidad);
        this.addressForm.controls['fecha'].setValue(this.modalservice.element.fecha);

      }
    })

  }

 addressForm = this.fb.group({
    producto: ["", Validators.required],
    cantidad: ["", Validators.required],
    fecha:["", Validators.required]
  });


ngOnInit():void{

    this.get()
  }




public async get(){
    await this.api.getAll("Productoes").then((res)=>{
      for (let index = 0; index < res.length; index++) {
        this.productos.push([res[index]])
      }
    });
    console.log(this.productos)
  }


async onSubmit(){

  var productorequest:Product = await (this.api.getByID("Productoes",this.addressForm.get('producto').value))
    this.product=productorequest;
    const valorProducto=this.product.precio;
    console.log(this.product.precio)
    const totalVenta= valorProducto*parseInt(this.addressForm.get('cantidad').value);
   const venta:productoVenta={
    idUsuario:this.user.idUsuario,
     idProducto: parseInt(this.addressForm.get('producto').value),
    //nombreProducto:this.product.nombreProducto,
    //valorProducto:this.product.precio,
    fecha:this.addressForm.get('fecha').value+"T00:00:00",
    cantidad:parseInt(this.addressForm.get('cantidad').value),
    valor:totalVenta,



   }
    console.log(venta)
this.api.post("ProductoVentums",venta)
Swal.fire({
  text: "Venta registrada correctamente",
  icon: 'success',
  showCancelButton: false,
  confirmButtonColor: '#af2c22',
  confirmButtonText: 'OK'
}).then((result) => {
  if (result.isConfirmed) {
    window.location.reload()
  }
})
  }


}
