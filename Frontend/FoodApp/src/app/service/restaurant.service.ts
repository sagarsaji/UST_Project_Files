import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Addtocart } from '../modal/addtocart';
import { Menu } from '../modal/menu';
import { Restaurant } from '../modal/restaurant';
import { LoginComponent } from '../login/login.component';
import { Orderhistory } from '../modal/orderhistory';
import { Kitchenstaff } from '../modal/kitchenstaff';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  saveProduct(rest:Restaurant):Observable<Object>{
    return this.http.post(`http://localhost:8085/api/v1/restaurant/create`,rest);
  }
  getRest(){
    return this.http.get<Restaurant[]>(`http://localhost:8085/api/v1/restaurant/all`);
  }
  getMenuByName(restname: String):Observable<Menu[]>{
    return this.http.get<Menu[]>(`http://localhost:8084/api/v1/menu/find/${restname}`);
  }
  deleteRest(id: number):Observable<Restaurant>{
    return this.http.delete<Restaurant>(`http://localhost:8085/api/v1/restaurant/delete/${id}`);
  }

  deleteMenu(mid: number):Observable<Menu>{
    return this.http.delete<Menu>(`http://localhost:8084/api/v1/menu/delete/menu/${mid}`);
  }

  getAllMenu(){
    return this.http.get<Menu[]>(`http://localhost:8084/api/v1/menu/getAllMenu`);
  }

  toCart(cart:Addtocart):Observable<Object>{
    return this.http.post(`http://localhost:8082/api/v1/cart/addCart`,cart);
  }

  getRestById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`http://localhost:8085/api/v1/restaurant/getbyid/${id}`);
  }

  getMenuById(mid:number):Observable<Menu>{
    return this.http.get<Menu>(`http://localhost:8084/api/v1/menu/getbyid/menu/${mid}`);
  }

  saveUpdate(rest:Restaurant):Observable<Object>{
    return this.http.post(`http://localhost:8085/api/v1/restaurant/create`,rest);
  }

  updateProduct(id:number,rest: Restaurant): Observable<Object> {
    return this.http.put(`http://localhost:8085/api/v1/restaurant/update/${id}`,rest);
  }

  saveMenu(menu: Menu):Observable<Object>{
    return this.http.post(`http://localhost:8084/api/v1/menu/addmenu`,menu);
  }

  getCartDetails(userid: any): Observable<Addtocart[]> {
    return this.http.get<Addtocart[]>(`http://localhost:8082/api/v1/cart/viewByuser/${userid}`);
  }

  updateMenu(mid:number,menu:Menu):Observable<Object>{
    return this.http.put(`http://localhost:8084/api/v1/menu/update/${mid}`,menu);
  }

  getCartByRestname(restname: string):Observable<Addtocart[]>{
    return this.http.get<Addtocart[]>(`http://localhost:8082/api/v1/cart/${restname}`);
  }

  updateIncrement(cartid: number): Observable<Object> {
    return this.http.put(`http://localhost:8082/api/v1/cart/incrementUpdateQuantity/${cartid}`, {});
  }

  updateDecrement(cartid : number): Observable<Object> {
    return this.http.put(`http://localhost:8082/api/v1/cart/decrementUpdateQuantity/${cartid}`,{});
  }

  getTotal(cartid: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8082/api/v1/cart/gettotal/${cartid}`);
  }

 getAllOrder():Observable<Kitchenstaff[]>{
  return this.http.get<Kitchenstaff[]>('http://localhost:8083/api/v1/staff/sortbystatus');
 }

 updateOrderStatus(cartid: number):Observable<Object>{
  return this.http.put(`http://localhost:8083/api/v1/staff/orders/${cartid}`,{});
 }

 deleteByCart(cartid:number):Observable<Addtocart>{
  return this.http.delete<Addtocart>(`http://localhost:8082/api/v1/cart/del/cart/${cartid}`);
 }

 getOrderByUserId(userid: number){
  return this.http.get<Addtocart[]>(`http://localhost:8082/api/v1/cart/viewByuser/${userid}`);
 }

 toOrderHistory(order: Orderhistory):Observable<Object>{
    return this.http.post(`http://localhost:8083/api/v1/staff/addOrders`,order);
 }

 getUserOrders(userid: number){
  return this.http.get(`http://localhost:8083/api/v1/staff/getbyuserid/${userid}`);
 }

 deleteByUserid(userid:number):Observable<Addtocart>{
  return this.http.delete<Addtocart>(`http://localhost:8082/api/v1/cart/del/${userid}`);
 }
  
}
