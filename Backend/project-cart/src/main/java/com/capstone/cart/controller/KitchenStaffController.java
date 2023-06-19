package com.capstone.cart.controller;

import com.capstone.cart.Exception.CartnotFoundException;
import com.capstone.cart.model.Cart;
import com.capstone.cart.repository.CartRepository;
import com.capstone.cart.service.KitchenStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
public class KitchenStaffController {
    @Autowired
    private KitchenStaffService service;
    @GetMapping("/orders")
    public ResponseEntity<List<Cart>> getAllOrders(){
        return ResponseEntity.ok(service.getAllOrders());
    }
    @GetMapping("/ordersbyrestuarent/{restName}")
    public ResponseEntity<List<Cart>> getAllOrdersbyRestuarentname(@PathVariable String restName){
        return ResponseEntity.ok(service.getAllOrdersbyRestuarentname(restName));
    }
    @PutMapping("/orders/{cartId}")
    public ResponseEntity<?> updateStatus(@PathVariable Long cartId,@RequestBody Cart cart) throws CartnotFoundException {
        return ResponseEntity.ok(service.updateStatus(cartId,cart));
    }
}
