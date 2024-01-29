import { HttpClient } from "@angular/common/http"

export class CustomersViewModel {

  service= 'http://localhost:5000/api/'

constructor(private http:HttpClient){

}

  public GetAll(){

    let headers=
    {
      'Content-Type':'application/json'
    }

    return this.http.get(this.service+"Customers/getall",{ headers:headers})
  }
}
