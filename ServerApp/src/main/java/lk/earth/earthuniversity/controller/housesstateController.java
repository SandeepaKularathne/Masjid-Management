package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.HousesstateDao;
import lk.earth.earthuniversity.entity.Housesstate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/housesstatees")
public class housesstateController {

    @Autowired
    private HousesstateDao housesstatedao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Housesstate> get() {

        List<Housesstate> housesstatees = this.housesstatedao.findAll();

        housesstatees = housesstatees.stream().map(
                housesstate -> { Housesstate d = new Housesstate();
                    d.setId(housesstate.getId());
                    d.setName(housesstate.getName());
                    return d; }
        ).collect(Collectors.toList());

        return housesstatees;

    }

}


