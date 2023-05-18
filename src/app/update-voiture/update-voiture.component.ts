import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-update-voiture',
  templateUrl: './update-voiture.component.html',
  styleUrls: ['./update-voiture.component.css']
})
export class UpdateVoitureComponent implements OnInit {

  marques? : Marque[];
  updatedMarqId?: number ;
  currentVoiture = new Voiture();

        constructor(private activatedRoute: ActivatedRoute,
        private voitureService: VoitureService,
        private router :Router) { }

  ngOnInit() : void {
      this.voitureService.listeMarques().
  subscribe(marqs => {this.marques = marqs._embedded.marques;
  console.log(marqs);
  });
  this.voitureService.consulterVoiture(this.activatedRoute.snapshot.params['id']).
  subscribe( voit =>{ this.currentVoiture = voit;
  this.updatedMarqId = this.currentVoiture.marque?.idMarque;
  } ) ;
}

  updateVoiture(){
    this.currentVoiture.marque = this.marques?.find(marq => marq.idMarque == this.updatedMarqId)!;
    this.voitureService.updateVoiture(this.currentVoiture).subscribe(voits => {
    this.router.navigate(['voitures']); }
    );
    }
}
