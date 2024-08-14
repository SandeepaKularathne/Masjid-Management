package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.CityDao;
import lk.earth.earthuniversity.entity.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/cities")
public class CityController {

    @Autowired
    private CityDao cityDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<City> get() {

        List<City> cities = this.cityDao.findAll();

        cities = cities.stream().map(
                city -> { City c = new City();
                   c.setId(city.getId());
                   c.setName(city.getName());
                   c.setDistrict(city.getDistrict());
                   

                return c; }
        ).collect(Collectors.toList());

        return cities;

    }

}


