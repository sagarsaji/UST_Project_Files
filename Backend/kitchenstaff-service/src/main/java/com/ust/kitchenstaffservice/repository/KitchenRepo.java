package com.ust.kitchenstaffservice.repository;

import com.ust.kitchenstaffservice.modal.Kitchenstaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KitchenRepo extends JpaRepository<Kitchenstaff,Long> {
    List<Kitchenstaff> findAllByRestname(String restname);
    Optional<Kitchenstaff> findByUserid(Long userid);

    Optional<List<Kitchenstaff>> getByUserid(Long userid);

    @Query(value = "SELECT * FROM kitchenstaff c ORDER BY c.status",nativeQuery = true)
    List<Kitchenstaff> getByStatus();

    Optional<Kitchenstaff> findByCartid(Long cartid);
}
