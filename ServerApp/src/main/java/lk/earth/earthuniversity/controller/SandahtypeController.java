package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SandahtypeDao;
import lk.earth.earthuniversity.entity.Sandahtype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/sandahtypes")
public class SandahtypeController {

    @Autowired
    private SandahtypeDao sandahtypeDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Sandahtype> get() {

        List<Sandahtype> sandahtypes = this.sandahtypeDao.findAll();

        sandahtypes = sandahtypes.stream().map(
                sandahtype -> { Sandahtype d = new Sandahtype();
                    d.setId(sandahtype.getId());
                    d.setName(sandahtype.getName());
                    return d; }
        ).collect(Collectors.toList());

        return sandahtypes;

    }

}


