package com.capstone.cart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.cart.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

	public List<Cart> findByUserid(Long id);
	
	public void deleteByCartidAndUserid(Long cId, Long uId);

	List<Cart> findAllByRestName(String restName);
}
