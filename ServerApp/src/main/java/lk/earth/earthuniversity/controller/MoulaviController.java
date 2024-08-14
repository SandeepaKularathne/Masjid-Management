package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.MoulaviDao;
import lk.earth.earthuniversity.entity.Moulavi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/moulavis")
public class MoulaviController {

    @Autowired
    private MoulaviDao moulavidao;

    @GetMapping(path ="/list",produces = "application/json")
    public List<Moulavi> get() {

        List<Moulavi> moulavis = this.moulavidao.findAll();

        moulavis = moulavis.stream().map(
                moulavi -> { Moulavi mlv = new Moulavi();
                                mlv.setId(moulavi.getId());
                                mlv.setName(moulavi.getName());
                                mlv.setRegnumber(moulavi.getRegnumber());
                            return mlv; }
                
        ).collect(Collectors.toList());

        return moulavis;

    }

}


