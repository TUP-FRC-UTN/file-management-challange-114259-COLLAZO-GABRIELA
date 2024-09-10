import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileItem, FileOwner, FileType, } from '../../models/file.item.model';
import { CommonModule } from '@angular/common';
import { OWNERS } from '../../data/file.storage';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Output() folderToEmit = new EventEmitter<FileItem>();

  onCheckboxChange(event: Event, owner: FileOwner) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.file.owners.push(owner);
    } else {
      const index = this.file.owners.indexOf(owner);
      if (index > -1) {
        this.file.owners.splice(index, 1);
      }
    }
  }

  isChecked(owner: FileOwner): boolean {
    return this.file.owners.includes(owner);
  }


 file: FileItem = {
  id: "",
  name:"",
  creation: null,
  owners:[],
  type: FileType.FOLDER,
  parentId: ""
 };

 listOwners: FileOwner [] = OWNERS; 

 listType: { value: FileType, viewValue: string }[] = [
  { value: FileType.FILE, viewValue: 'Archivo' },
  { value: FileType.FOLDER, viewValue: 'Carpeta' }
];


save(form: NgForm) {
  if (form.valid) {
    console.log('Formulario guardado', form.value);
    const newId = Date.now().toString();
    this.file.id = newId;
    this.folderToEmit.emit(this.file); 
    console.log('Formulario guardado', this.file);

  }

  this.file = {
    id: "",
    name:"",
    creation: new Date(),
    owners:[],
    type: FileType.FOLDER,
    parentId: ""
  }
}


}
