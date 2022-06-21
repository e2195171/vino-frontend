import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduit } from '../iproduit';
import { ApibieroService } from '../Serv/apibiero.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  @Input() produit:IProduit;
  // @Input() estEditable:boolean;

  modifForm:FormGroup;
  
  constructor(private bieroServ:ApibieroService) { }

  
  ngOnInit(): void {
    this.modifForm = new FormGroup({
      nom: new FormControl(this.produit.nom,
        [Validators.required, Validators.minLength(3)]),
      brasserie: new FormControl(this.produit.type,
          [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.produit.description,
        [Validators.required, Validators.minLength(3)]),
    })
  }

  changement():void{
    console.log(this.produit.nom)
  }
  modifierProduit():void{
    console.log(this.modifForm)
    let biere:IProduit = this.modifForm.value;  
    biere.id_bouteille = this.produit.id_bouteille;
    this.bieroServ.modifierBiere(biere).subscribe((data:any)=>{console.log(data)});
  }
  annuler():void{
    this.modifForm.controls.nom.setValue(this.produit.nom);
    this.modifForm.controls.type.setValue(this.produit.type);
    this.modifForm.controls.description.setValue(this.produit.description);
  }

  // effacer():void{
  //   this.bieroServ.effacerBiere(this.produit.id_bouteille).subscribe((data:any)=> {
  //     console.log(data);
  //   });
  // }
}
