// import { Component } from '@angular/core';
// import { AlumnosUtl } from 'src/app/interfaces/Home.Interface';
// import { ProyectoApiService } from 'src/app/proyecto-api.service';

// @Component({
//   selector: 'app-alumnos',
//   templateUrl: './alumnos.component.html',
//   styleUrls: ['./alumnos.component.css']
// })
// export class AlumnosComponent {
//   imageWidth:number=50;
//   imageMargin:number=2;
//   muestraImg:boolean=true;
//   listFilter:string=''
//   alumnoTitle!:string
//   dataSource:any=[];
//   constructor(public alumnosUtl:ProyectoApiService){}
 
//   showImage():void{
//     this.muestraImg=!this.muestraImg;
//   }
 
//   alumnosIric:AlumnosUtl[]=[
//     {
//       id:1234,
//       nombre:'pedro',
//       edad:23,
//       correo: 'pedro@gmail.com',
 
//     },
//     {
//       id:772,
//       nombre:'Paulina',
//       edad:23,
//       correo: 'paulina@gmail.com',
//     },
 
//     {
//       id:22,
//       nombre:'Dario',
//       edad:23,
//       correo: 'dario@gmail.com',
 
//     },
//   ]
 
//   onCalificaClick(message:string){
//     this.alumnoTitle=` ${message}`;
 
//   }
//   ngOnInit(): void {
//     this.alumnosUtl.getAlumnos().subscribe(
//       {
//         next: response=>{
//       this.dataSource=response;
//     },
//     error: error=>console.log(error)
//   }
//     );
// }
// }
