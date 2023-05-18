import { Injectable } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { Marque } from '../model/marque.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarqueWrapper } from '../model/MarqueWrapped.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})

export class VoitureService {
  voitures : Voiture[]; //un tableau de Produit
  apiURLVoiture: string = 'http://localhost:8080/voitures/api/voitures';
  apiURLMarque: string = 'http://localhost:8080/voitures/rest_marques';


  constructor(private http : HttpClient) {
    /* this.marques = [
      {idMarque : 1, nomMarque :"wolswagen",descriptionMarque : "marque allemande"},
      {idMarque : 2, nomMarque : "Peugeot" , descriptionMarque : "marque francaise"}
    ];
 */
    this.voitures = [
      ];
  }
  listeVoiture(): Observable<Voiture[]>{
  return this.http.get<Voiture[]>(this.apiURLVoiture);
  }





  ajouterVoiture( voit: Voiture):Observable<Voiture>{
    return this.http.post<Voiture>(this.apiURLVoiture, voit, httpOptions);
  }
  supprimerVoiture( id: number){
    //supprimer le produit prod du tableau produits
    const url = `${this.apiURLVoiture}/${id}`;
        return this.http.delete(url, httpOptions);
    }

  consulterVoiture(id:number): Observable<Voiture> {
    const url = `${this.apiURLVoiture}/${id}`;
    return this.http.get<Voiture>(url);
  }

  trierVoitures(){
    this.voitures = this.voitures.sort((n1,n2) => {
      if (n1.idVoiture! > n2.idVoiture!) {
      return 1;
      }
      if (n1.idVoiture! < n2.idVoiture!) {
      return -1;
      }
      return 0;
    });
    }

    updateVoiture(voit: Voiture):Observable<Voiture>
    {
      return this.http.put<Voiture>(this.apiURLVoiture+"/"+voit.idVoiture, voit, httpOptions);   }

    listeMarques():Observable<MarqueWrapper>{
      return this.http.get<MarqueWrapper>(this.apiURLMarque);
      }
    /*  consulterMaqrue(id:number): Marque{
      return this.marques.find(marq => marq.idMarque == id)!;
      } */

      rechercherParMarque(idMarq: number):Observable< Voiture[]> {
        const url = `${this.apiURLVoiture}/voitsMarqs/${idMarq}`;
        return this.http.get<Voiture[]>(url);
        }

        rechercherParModele(modele: string):Observable< Voiture[]> {
          const url = `${this.apiURLVoiture}/voitsByModel/${modele}`;
          return this.http.get<Voiture[]>(url);
          }
          ajouterMarque( marq: Marque):Observable<Marque>{
            return this.http.post<Marque>(this.apiURLMarque, marq, httpOptions);
            }
}
