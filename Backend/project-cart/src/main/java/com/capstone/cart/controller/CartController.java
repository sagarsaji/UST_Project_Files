package com.capstone.cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.cart.model.Cart;
import com.capstone.cart.service.CartService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class  CartController {
	
	@Autowired
	CartService cartServ;
	
	@GetMapping("cart/viewBycart/{cId}")
	public ResponseEntity<?> getDetailsByCartId(@PathVariable Long cId){
		Cart c = cartServ.getByCartId(cId);
		if(c!=null)
			return new ResponseEntity<Cart>(c, HttpStatus.OK);
		else
			return new ResponseEntity<String>("Cart not available",HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("cart/viewByuser/{uId}")
	public ResponseEntity<?> getDetailsByUserId(@PathVariable Long uId){
		List<Cart> cList = cartServ.getByUserId(uId);
		if(cList != null)
			return new ResponseEntity<List<Cart>>(cList, HttpStatus.OK);
		else
			return new ResponseEntity<String>("User not available",HttpStatus.NOT_FOUND);
	}


	
	@PostMapping("cart/addCart")
	public ResponseEntity<?> addCart(@RequestBody Cart cNew){
		Cart c = cartServ.addCart(cNew);
		return new ResponseEntity<Cart>(c, HttpStatus.OK);
	}
	
//	@DeleteMapping("delete/{cId}/{uId}")
//	public ResponseEntity<?> deleteCart(@PathVariable("cId") Long cId,@PathVariable("uId") Long uId){
//		Boolean cartRes= cartServ.deleteCart(cId,uId);
//		return new ResponseEntity<Boolean>(cartRes, HttpStatus.OK);
//	}
	
	@DeleteMapping("cart/del/{cartId}/{userId}")
    public ResponseEntity<String> deleteCart(@PathVariable Long cartId, @PathVariable Long userId) {
		cartServ.deleteCartByCartIdAndUserId(cartId, userId);
        return ResponseEntity.ok("Cart deleted successfully.");
    }

}
