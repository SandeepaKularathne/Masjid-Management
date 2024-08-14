package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DistrictDao;
import lk.earth.earthuniversity.entity.District;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/districts")
public class DistrictController {

    @Autowired
    private DistrictDao districtDao;


    @GetMapping(path ="/list", produces = "application/json")
    public List<District> get() {

        List<District> districts = this.districtDao.findAll();

        districts = districts.stream().map(
                district -> { District d = new District();
                    d.setId(district.getId());
                    d.setName(district.getName());
                    d.setProvince(district.getProvince());
                    return d;
                }
        ).collect(Collectors.toList());

        return districts;

    }

}


