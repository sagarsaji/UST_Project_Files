package com.capstone.cart.service;

import com.capstone.cart.Exception.CartnotFoundException;
import com.capstone.cart.model.Cart;
import com.capstone.cart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KitchenStaffService {
    @Autowired
    private CartRepository cartRepository;

    public List<Cart> getAllOrders() {
        return cartRepository.findAll();
    }

    public Object updateStatus(Long cartId,Cart cart) throws CartnotFoundException {
        Cart c=cartRepository.findById(cartId).orElse(null);
        if(cart!=null){
            c.setStatus(cart.getStatus());
        }
        else {
            throw new CartnotFoundException("No orders yet");
        }
        return c;
    }

    public List<Cart> getAllOrdersbyRestuarentname(String restName) {

    return cartRepository.findAllByRestName(restName);
    }
}
