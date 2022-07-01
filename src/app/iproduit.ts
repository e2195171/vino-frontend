export interface IProduit {
    id_cellier: string;
    cellier_nom: string;
    id_bouteille:string;
    date_achat: string;
    id_achats: string;
    garde_jusqua:string;
    note:string;
    prix:string // Non obligatoire
    quantite:string;
    millesime:string;
    id:string; //id bouteille
    nom:string;
    type:string;
    image:string;
    code_saq:string;
    url_saq:string;
    pays:string;
    description: string;
    id_usager: string;
}

