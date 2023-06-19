package com.ust.admin.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ust.admin.model.Restaurant;

@Repository
public interface RestRepo extends JpaRepository<Restaurant,Long>{


}
