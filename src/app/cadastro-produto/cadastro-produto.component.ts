import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import {Produto} from '../model/produto-model'
import {ProdutoService} from '../services/produto-service'

import {FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
  providers: [ProdutoService]
})
export class CadastroProdutoComponent implements OnInit {

  public cadProduto : FormGroup = new FormGroup({
    "nomeProduto": new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(40)]) ,
    "codigo": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]) ,
    "preco": new FormControl(null, [Validators.required]) ,
    "estoque" : new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(40)])
  })

  public produto : Produto

  constructor(private serviceProduto : ProdutoService, private redirect : Router) { }

  ngOnInit(): void {
  }

  public async cadastrarProduto(){
    if(this.cadProduto.status === "INVALID"){

      this.cadProduto.get('nomeProduto').markAsTouched()
      this.cadProduto.get('codigo').markAsTouched()
      this.cadProduto.get('preco').markAsTouched()
      this.cadProduto.get('estoque').markAsTouched()
    }else{
      let cadastroProduto : Produto = new Produto(
        this.cadProduto.value.nomeProduto,
        this.cadProduto.value.codigo,
        this.cadProduto.value.preco,
        this.cadProduto.value.estoque)

      await this.serviceProduto.postProduto(cadastroProduto)
      this.limparCampos()        
    }
  }


  public limparCampos(): void{
    this.cadProduto.reset()
  }


  public voltar() : void{
    this.redirect.navigate(["/"])
  }
}
