import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Guid } from "guid-typescript"
import { CustomerDto } from "../dto/customer.dto"

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

  public GetById(id:Guid){

    let headers=
    {
      'Content-Type':'application/json'
    }

    return this.http.get(this.service+"Customers/getbyid/"+id,{ headers:headers})
  }

  public InsertDto(customer:CustomerDto){
    let headers=new HttpHeaders(
    {
      'Content-Type':'application/json'
    })
debugger
    return this.http.post(this.service+"Customers/insertdto", customer,{headers:headers})
  }
}
