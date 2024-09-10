import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,FormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  goForm: boolean = false;

addFolder () {
this.goForm = true;
}


  ngOnInit(): void {
this.orderList();
  }
  files: FileItem[] = FILE_LIST;
  title = 'file-management';
  selectedItems : any [] = [];
  checked:boolean [] = []
orderList(){
/*   this.files.sort((a, b) => a.name.localeCompare(b.name))
 */ 

this.files.sort((a, b) => {
  // Primero ordena por tipo (FOLDER antes que FILE)
  if (a.type !== b.type) {
    return a.type - b.type; // Esto asegurará que los FOLDER (0) vengan antes de los FILE (1)
  }

  // Si ambos son del mismo tipo, ordena alfabéticamente por nombre
  return a.name.localeCompare(b.name);
}
)}
  
onSelectedCheck(event: any, id: string) {
  if (event.target.checked) {
      this.selectedItems.push(id); 
  } else {
      const idx = this.selectedItems.indexOf(id);
      if (idx !== -1) {
          this.selectedItems.splice(idx, 1); 
      }
  }
}

deleteFolder() {
 if (this.selectedItems.length > 1){
  alert("Eliminando usuarios....")

  this.files = this.files.filter(file => !this.selectedItems.includes(file.id));
}else{

  this.files = this.files.filter(file => !this.selectedItems.includes(file.id));

  }
  this.selectedItems = [];
  this.checked = this.checked.map(() => false);
}
onAddNewFolder(newFile: FileItem){
  this.files.push(newFile);
    
    this.goForm = false;
}
}
