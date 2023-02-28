import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { ModalTemplateService } from 'src/app/services/modal-template.service';
import Swal from 'sweetalert2';
import { Storage,ref,uploadBytes} from '@angular/fire/storage'


@Component({
  selector: 'app-agrega-producto',
  templateUrl: './agrega-producto.component.html',
  styleUrls: ['./agrega-producto.component.scss']
})
export class AgregaProductoComponent {
  addressForm = this.fb.group({
    nombre: [null, Validators.required],
    descripcion: [null, Validators.required],
    precio: [null, Validators.required],
    file: [null],
  });
  srcResult: any;
  title="";
  file:any;
  imgRef:any;

  constructor(private fb: FormBuilder,public service:ApiService, public modalservice:ModalTemplateService, public storage:Storage) {}


  ngOnInit(): void{
    console.log(this.modalservice.element);
    this.modalservice.accion.subscribe((res)=>{
      this.title=res;
      if(res=='Editar'){
        this.addressForm.controls['nombre'].setValue(this.modalservice.element.nombreProducto);
        this.addressForm.controls['descripcion'].setValue(this.modalservice.element.descripcion);
        this.addressForm.controls['precio'].setValue(this.modalservice.element.precio);
      }
    })

  }


  onSubmit(): void {
    if(this.modalservice.accion.value=="Agregar"){
      if(this.addressForm.valid){
        this.uploadFile()
        const producto={
          nombreProducto: this.addressForm.get('nombre')?.value,
          descripcion: this.addressForm.get('descripcion')?.value,
          imagen: this.file.name,
          precio: parseInt(this.addressForm.get('precio')?.value),
          estado: true,
        }
        this.service.post("Productoes",producto)
        Swal.fire({
          text: "Producto creado correctamente",
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

     if(this.modalservice.accion.value=="Editar"){
      if(this.addressForm.valid){
        this.uploadFile()
        const producto:Product={
          idProducto:this.modalservice.element.idProducto,
          nombreProducto: this.addressForm.get('nombre')?.value,
          descripcion: this.addressForm.get('descripcion')?.value,
         imagen: this.file.name,
         precio: parseInt(this.addressForm.get('precio')?.value),
         estado: true,
        }
        this.service.update("Productoes",producto,this.modalservice.element.idProducto)
        Swal.fire({
          text: "Producto actualizado correctamente",
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
  }

  getArchivo($event:any) {
    this.file = $event.target.files[0];
    console.log(this.file)
    this.imgRef = ref(this.storage,`productos/${this.file.name}`)
  }

  uploadFile(){
    uploadBytes(this.imgRef,this.file)
    .then(respuesta => console.log(respuesta))
    .catch(error => console.log(error) )
  }
}
