import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  private urlPokemon: String = 'https://pokeapi.co/api/v2/pokemon'
  private urlName: String = 'https://pokeapi.co/api/v2/pokemon-species'

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;


  constructor(
    private activatedRoute:ActivatedRoute,
    private pokeApiService:PokeApiService
  ) { }

  ngOnInit(): void {
    this.getPokemon
  }

  get getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokiemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokiemons(`${this.urlName}/${id}`);
    return forkJoin([pokemon, name]).subscribe(
      res=> {
        this.pokemon = res; 
        this.isLoading = true;             
      },
      error => {
        this.apiError = true
      })    
  }

}
