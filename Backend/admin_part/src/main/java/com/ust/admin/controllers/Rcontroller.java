package com.ust.admin.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ust.admin.model.Menu;
import com.ust.admin.repo.MenuRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ust.admin.model.Restaurant;
import com.ust.admin.repo.RestRepo;

@CrossOrigin
@RestController
@RequestMapping("/rest")
public class Rcontroller {

	
	@Autowired
	private RestRepo repo;

	@Autowired
	private MenuRepo mrepo;
	
	@CrossOrigin
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Restaurant rest){
		Restaurant rest1=repo.save(rest);
		
		return ResponseEntity.ok().body(rest1);
	}

	@PostMapping("/addmenu")
	public ResponseEntity<?> addMenu(@RequestBody Menu menu){
		return ResponseEntity.ok().body(mrepo.save(menu));
	}
	
	@CrossOrigin
	@GetMapping("/all")
	public List<Restaurant> getall(){
		
		
		return repo.findAll();
		}
	
	@CrossOrigin
	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable Long id) {
		repo.deleteById(id);
	}

	@DeleteMapping("/delete/menu/{mid}")
	public void deletemenu(@PathVariable Long mid){
		mrepo.deleteById(mid);
	}
	
//	@GetMapping("/restname")
//	public List<String> getRestaurantName(){
//		List<Restaurant> restaurants = repo.findAll();
//		return restaurants.stream().map(Restaurant::getRestName).collect(Collectors.toList());
//	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> update(@PathVariable Long id,@RequestBody Restaurant rest ){
		
		Restaurant temp=null;
			Optional<Restaurant> op1=repo.findById(id);
			if(op1.isPresent()) {
			temp=op1.get();
			temp.setRestName(rest.getRestName());
			temp.setRestAddress(rest.getRestAddress());
			temp.setRestContact(rest.getRestContact());
			temp.setRestPic(rest.getRestPic());
			Restaurant rest3=repo.save(temp);
			return ResponseEntity.ok().body(rest3);
			}
			else
			{
				return null;
			}
	}

	@PutMapping("/menu/update/{mid}")
	public ResponseEntity<?> updatemenu(@PathVariable Long mid,@RequestBody Menu menu ){

		Menu temp=null;
		Optional<Menu> op1=mrepo.findById(mid);
		if(op1.isPresent()) {
			temp=op1.get();
			temp.setMname(menu.getMname());
			temp.setMpic(menu.getMpic());
			temp.setMprice(menu.getMprice());
			temp.setRestname(menu.getRestname());
			Menu menu3=mrepo.save(temp);
			return ResponseEntity.ok().body(menu3);
		}
		else
		{
			return null;
		}
	}

	@GetMapping("/menu/find/{restname}")
	public List<Menu> getByRestName(@PathVariable String restname){
		return mrepo.findByRestname(restname);
	}

	@GetMapping("/getAllMenu")
	public List<Menu> getAllMenu(){
		return mrepo.findAll();
	}

	
	@GetMapping("/getbyid/{id}")
	public Restaurant getbyid(@PathVariable Long id ){
		
		
		Optional<Restaurant> op=repo.findById(id);
		if(op.isPresent()) {
		   
			return op.get();
		}
		else 
	     	return	null;	
	}

	@GetMapping("/getbyid/menu/{mid}")
	public Menu getbymid(@PathVariable Long mid ){
		Optional<Menu> op=mrepo.findById(mid);
		if(op.isPresent()) {
			return op.get();
		}
		else
			return	null;
	}
}
