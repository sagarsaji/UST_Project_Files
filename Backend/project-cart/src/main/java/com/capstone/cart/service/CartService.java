package com.capstone.cart.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.cart.model.Cart;
import com.capstone.cart.repository.CartRepository;

@Service
public class CartService {

	@Autowired
	CartRepository cartRepo;
	
	@Transactional
	public Cart getByCartId(Long cartId) {
		Optional<Cart> cart= cartRepo.findById(cartId);
		if(cart.isPresent())
			return cart.get();
		else
			return null;
	}
	
	@Transactional
	public List<Cart> getByUserId(Long userId){
		List<Cart> userCarts= cartRepo.findByUserid(userId);
		if(userCarts != null)
			return userCarts;
		else
			return null;
	}
	
	@Transactional
	public Cart addCart(Cart c) {

			c.setStatus("inprogress");
			c.setQuantity(1);
			Cart saveCart= cartRepo.save(c);
			System.out.println("added");
			return saveCart;
	}
	
	@Transactional
//	public Boolean deleteCart(Long cId, Long uId) {
//		Boolean delCart	=	cartRepo.deleteByCartidAndUserid(cId,uId);
//		System.out.println("deleted");
//		return delCart;
//	}
	 public void deleteCartByCartIdAndUserId(Long cartId, Long userId) {
		cartRepo.deleteByCartidAndUserid(cartId, userId);
		System.out.println("deleted");
    }
		
		
	
}
