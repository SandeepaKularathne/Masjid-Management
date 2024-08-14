package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ProvinceDao;
import lk.earth.earthuniversity.entity.Province;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/provinces")
public class ProvinceController {

    @Autowired
    private ProvinceDao provinceDao;


    @GetMapping(path ="/list", produces = "application/json")
    public List<Province> get() {

        List<Province> provinces = this.provinceDao.findAll();

        provinces = provinces.stream().map(
                province -> { Province p = new Province();
                    p.setId(province.getId());
                    p.setName(province.getName());

                    return p; }
        ).collect(Collectors.toList());

        return provinces;

    }

}


