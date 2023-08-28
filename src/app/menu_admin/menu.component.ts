import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  //lo agregue para que el body tenga un padding de 20px
  // encapsulation: ViewEncapsulation.None // Desactiva el encapsulamiento de estilos para el componente app-menu

})
export class MenuComponent {
  constructor(private router:Router){}

  exit(){
    this.router.navigate(['inicio'])
  }
  ngOnInit() {
    // Re-enable encapsulation when the MenuComponent is initialized or navigated to
    // This will set the encapsulation back to ViewEncapsulation.Emulated
    (document.body.style as any)['margin-left'] = '16em'; // Explicitly cast to 'any' to avoid the error
  }

}
