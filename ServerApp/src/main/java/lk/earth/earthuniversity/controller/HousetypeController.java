package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.HousetypeDao;
import lk.earth.earthuniversity.entity.Housetype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/housetypes")
public class HousetypeController {

    @Autowired
    private HousetypeDao housetypedao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Housetype> get() {

        List<Housetype> housetypes = this.housetypedao.findAll();

        housetypes = housetypes.stream().map(
                housetype -> { Housetype d = new Housetype();
                    d.setId(housetype.getId());
                    d.setName(housetype.getName());
                    return d; }
        ).collect(Collectors.toList());

        return housetypes;

    }

}


