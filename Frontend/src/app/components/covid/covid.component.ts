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
      fields:["Genero","Casado","Personas Dependientes","Educacion","Trabajador Independiente","Ingresos solicitante","Ingresos codeudor","Monto Prestamo","Termino Prestamo","Historial crediticio disponible","Propietario de casa","Localidad"],
      values: [[]]
    }]


  }


  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  x="";
  respuesta = [];
  fraude="";
  probabilidad=""
  probabilidad_number=0;
  PostAutoIA() {

    var a = this.texto.map(function (item) {
      return (item);

    });
    this.form.input_data[0].values[0] = (a)
    console.log(this.form);
    var datos = JSON.stringify(this.form)


    var salida = {
      "text": this.form
    }


    console.log(datos);
    this.httpClient.post<any>(`${this.URL}upload-text`, salida).subscribe(
      (res) => {

        this.textModelo = res
        this.respuesta.push(res)
        this.x =JSON.stringify(res.predictions[0].values)
        console.log("respuesta "+this.x)


        this.fraude =res.predictions[0].values[0][0]

        if(this.fraude=="1"){
          this.fraude="Hay fraude"
        }else{
          this.fraude="No hay fraude"
        }
        console.log(this.fraude)
        


        this.probabilidad = res.predictions[0].values[0][1][0]
        this.probabilidad_number=parseFloat(this.probabilidad)*100
        this.probabilidad=this.probabilidad_number.toFixed(2) + '%'
          
        console.log("probabilidad "+this.probabilidad_number)

        
      },
      (err) => {

        console.log(err)
      },
    );

  }


}
