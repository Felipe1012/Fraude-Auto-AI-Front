import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { discardPeriodicTasks } from '@angular/core/testing';
import { ElementSchemaRegistry } from '@angular/compiler';



@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {

  uploadForm: FormGroup;

  loading

  private URL = 'http://localhost:3000/api/';

  txt
  textModelo
  nl
  texto: any[] = [];




  public form = {

    input_data: [{
      fields: ["Gender", "Married", "Dependents", "Education", "Self_Employed", "ApplicantIncome", "CoapplicantIncome", "LoanAmount", "Loan_Term", "Credit_History_Available", "Housing", "Locality"],
      values: [[]]
    }]


  }


  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  x="";
  y=""
  respuesta = [];
  fraude="";
  probabilidad=""
  probabilidad_number=0;
  PostAutoIA() {

    
    var datos = (this.texto)


    var salida = {
      "text": datos
    }

    console.log(salida);
    this.httpClient.post<any>(`${this.URL}upload-text`, salida).subscribe(
      (res) => {

        this.textModelo = res
        this.respuesta.push(res)
        console.log(this.respuesta)



console.log(this.x)
console.log(this.y)
       /* this.fraude =res.predictions[0].values[0][0]
        this.probabilidad = res.predictions[0].values[0][1][0]
        this.probabilidad_number=parseFloat(this.probabilidad)*100
        this.probabilidad=this.probabilidad_number.toFixed(2) + '%'
          
        console.log("probabilidad "+this.probabilidad_number)
*/
        
      },
      (err) => {

        console.log(err)
      },
    );

  }


}
