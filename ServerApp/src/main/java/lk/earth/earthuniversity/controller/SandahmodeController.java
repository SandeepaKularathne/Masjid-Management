package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SandahmodeDao;
import lk.earth.earthuniversity.entity.Sandahmode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/sandahmodes")
public class SandahmodeController {

    @Autowired
    private SandahmodeDao sandahmodeDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Sandahmode> get() {

        List<Sandahmode> sandahmodes = this.sandahmodeDao.findAll();

        sandahmodes = sandahmodes.stream().map(
                sandahmode -> { Sandahmode d = new Sandahmode();
                    d.setId(sandahmode.getId());
                    d.setName(sandahmode.getName());
                    return d; }
        ).collect(Collectors.toList());

        return sandahmodes;

    }

}


