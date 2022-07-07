import {Component, Inject, OnInit, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduit } from '../iproduit';

@Component({
  selector: 'app-dialog-biere',
  templateUrl: './dialog-biere.component.html',
  styleUrls: ['./dialog-biere.component.scss']
})
export class DialogBiereComponent implements OnInit {
  @Input() biere!:IProduit;
  creerBiereForm!:FormGroup;


constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef<DialogBiereComponent>,@Inject(MAT_DIALOG_DATA) biere: IProduit, private bieroServ :ApibieroService) {
}

ngOnInit(): void {
  this.creerBiereForm = this.formBuilder.group({
    nom : ['',Validators.required],
    brasserie : ['',Validators.required]
  })
  
}



ajouterBiere():void{
  if(this.creerBiereForm.valid){
    console.log(this.creerBiereForm.value)
    let biere:IProduit = this.creerBiereForm.value;  
    console.log(biere)
    this.bieroServ.ajouterBiere(biere).subscribe({
      next:(reponse)=>{
        
        console.log('Vin ajoutee')
        this.dialogRef.close('add');  
      },
      error:(reponse)=>{
        this.dialogRef.close('add');
        
      }
    });
  }
  
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}
