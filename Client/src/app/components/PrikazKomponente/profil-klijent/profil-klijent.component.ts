import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/LoginService';
import { KlijentService } from 'src/services/KlijentService';
import { Klijent } from 'src/models/Klijent';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil-klijent',
  templateUrl: './profil-klijent.component.html',
  styleUrls: ['./profil-klijent.component.css']
})
export class ProfilKlijentComponent implements OnInit {
  klijent:Klijent=null;
  izmenaProfila:boolean=false;
  merenje:boolean=false;
  instruktori:boolean=false;
  iskustva: string[] = [
    "Vezbac sa velikim Iskustvom",
    "Vezbac sa Iskustvom",
    "Vezbac Rekreativac",
    "Vezbac Pocetnik",
    "Vezbac bez iskustva"
  ];
  ///
  chartDatasets: Array<any> = [];
  chartDatasets1: Array<any> = [];
  chartLabels: Array<any> = [];
  chartType: string = 'line';
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];
  public chartColors1: Array<any> = [
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  ///
  prezimeKlijentControl: FormControl = new FormControl("", Validators.required);
  visinaKlijentControl: FormControl = new FormControl("", Validators.required);
  tezinaKlijentControl: FormControl = new FormControl("", Validators.required);
  ciljKlijentControl: FormControl = new FormControl("", Validators.required);
  bodyFatKlijentControl: FormControl = new FormControl("", Validators.required);
  iskustvoKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  passwordKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  noviPasswordKlijentControl: FormControl = new FormControl(
    "",
    Validators.required
  );
  constructor(private loginService:LoginService,private klijentService:KlijentService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.klijent = null;
    this.klijentService.getKlijentProfile(this.route.snapshot.paramMap.get('username')).subscribe((klijentProfil)=>{
      this.klijent = klijentProfil;console.log(this.klijent);
      this.osveziGraf();
    });
  }

  daLiJeLogovan():boolean{
    if(this.loginService.logovaniUsername!="")
      return true;
    else
      return false;
  }

  daLiNJegovProfilIliGleda():boolean{
    if(this.loginService.logovaniUsername==this.klijent.userName && this.loginService.korisnik == true)
      return true;
    else
      return false;
  }

  izmena(){
    this.izmenaProfila = !this.izmenaProfila;
  }

  novoMerenje(){
    this.merenje = !this.merenje;
  }

  pogledajInstruktore(){
    this.instruktori = !this.instruktori;
  }

  updateProf(){
    if(this.passwordKlijentControl.value == this.klijent.password){
      let updateProfil:Klijent = {
        bodyFat:this.klijent.bodyFat,
        cilj:this.ciljKlijentControl.value,
        ime:this.klijent.ime,
        instruktori:this.klijent.instruktori,
        iskustvo:this.iskustvoKlijentControl.value,
        password:this.noviPasswordKlijentControl.value,
        prezime:this.prezimeKlijentControl.value,
        tezina:this.klijent.tezina,
        userName:this.klijent.userName,
        visina:this.visinaKlijentControl.value,
        godinaRodjenja:this.klijent.godinaRodjenja
      }
      this.klijent = updateProfil;
      this.klijentService.updateKlijent(updateProfil);
    }
  }

  dodajMerenje(){
    let novaTezina = this.tezinaKlijentControl.value;
    let noviBodyFat = this.bodyFatKlijentControl.value;
    this.klijent.bodyFat.push(noviBodyFat);
    this.klijent.tezina.push(novaTezina);
    this.klijentService.updateKlijent(this.klijent);
    this.osveziGraf();
  }

  osveziGraf(){
    this.chartDatasets = [
      { data: this.klijent.tezina, label: 'Tezina' },
    ];
    this.chartDatasets1 = [
      { data: this.klijent.bodyFat, label: 'BodyFat' },
    ];
    this.chartLabels = [];
    for(let i=0;i<this.klijent.tezina.length;i++)
        this.chartLabels.push(i+1);
  }

  unSubFromInstruktor(){

  }

  subToInstruktor(){

  }
}
