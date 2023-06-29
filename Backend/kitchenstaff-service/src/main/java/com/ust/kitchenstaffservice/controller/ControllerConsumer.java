package com.ust.kitchenstaffservice.controller;

import com.ust.kitchenstaffservice.modal.Cart;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@FeignClient(name = "CART-SERVICE")
public interface ControllerConsumer {

    @GetMapping("/api/v1/cart/orders")
    public ResponseEntity<List<Cart>> getAllOrders();

    @PutMapping("/api/v1/cart/update/orderstatus/{cartid}")
    public ResponseEntity<Cart> updateStatus(@PathVariable Long cartid);

    @GetMapping("/api/v1/cart/sortbystatus")
    public ResponseEntity<List<Cart>> getByStatus();

}
