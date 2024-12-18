import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { CategorieService } from '../core/categorie.service';
import { Categorie } from '../models/categorie';
import { ProduitService } from '../core/produit.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
  //providers:[CategorieService]
})
export class ProductCategoryComponent {
constructor(private actr:ActivatedRoute, private productS: ProduitService, private fb:FormBuilder){}
id!: number ;
categorie!:string;
desc!:string;
productsByCatrgorie! :Product[];
listProducts :   Product[]=[]
add=false;
//category= this.cateServ.getCategoryById(1);
addProductForm !:FormGroup;


ngOnInit(){
  
  //snapshot
  this.id=this.actr.snapshot.params["id"]
  //this.id=Number(this.actr.snapshot.paramMap.get('id'))
  //Observable
  // this.actr.paramMap.subscribe(params =>this.id=Number (params.get('id')))
  // this.actr.queryParamMap.subscribe(params =>this.categorie=String (params.get('name')))
  // //Optionel:
  // this.categorie=String(this.actr.snapshot.queryParamMap.get('name'))
  //this.desc=String(this.actr.snapshot.queryParamMap.get('desc'))
  //this.actr.queryParamMap.subscribe(params =>this.categorie=String (params.get('name')))

 this.productS.getProductByCategorie(this.id).subscribe(
  (data) => this.productsByCatrgorie=data
 )
 this.addProductForm=this.fb.group({
  id: [''],
  name: [''],
  image: [''],  
  description: [''],
  price: [''],
  brand:  [''],
  promotion: [''],
 })

 
}

addNewProduct(){
  this.add=true;
}
p!:Product;
addProduct(){
 this.p=this.addProductForm.value;
  let len!:number;
  this.p.categoryId= this.id;
  this.p.id= 30;
  // this.productS.getAllProducts().subscribe(data => {
  //   console.log(data.length);
    
  //   len=data.length; 
  //   this.p.id=30;}); 
  
  console.log(this.p);
  
  this.productS.addProduct(this.p).subscribe(
    ()=> {
      alert('Produit ajouté avec succès');
      this.add=false;
      this.productS.getProductByCategorie(this.id).subscribe(
        (data) => this.productsByCatrgorie=data
       )

    }

  );
}

updateProduct(id:number){
  
  this.productS.getProductById(id).subscribe(
    (data) => {
      this.addProductForm.patchValue(data);
      this.add=true;
    }
  );
}
saveProduct(){
  this.productS.updateProduct(this.addProductForm.value).subscribe(
    ()=> {
      alert('Produit modifié avec succès');
      this.add=false;
      this.productS.getProductByCategorie(this.id).subscribe(
        (data) => this.productsByCatrgorie=data
       )
    }
  );
}
}
