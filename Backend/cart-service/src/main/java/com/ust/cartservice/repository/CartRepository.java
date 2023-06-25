package com.ust.cartservice.repository;

import com.ust.cartservice.modal.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {
    public List<Cart> findByUserid(int id);

    public void deleteByCartidAndUserid(Long cId, Long uId);

    List<Cart> findAllByRestname(String restname);

    Optional<Cart> findByProdid(Long prodid);
}
