package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.RoutDao;
import lk.earth.earthuniversity.entity.Rout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/routs")
public class RoutController {

    @Autowired
    private RoutDao routDao;


    @GetMapping(path ="/list", produces = "application/json")
    public List<Rout> get() {

        List<Rout> routs = this.routDao.findAll();

        routs = routs.stream().map(
                rout -> { Rout r = new Rout();
                    r.setId(rout.getId());
                    r.setName(rout.getName());
                    r.setMasjid(rout.getMasjid());
                    return r;
                }
        ).collect(Collectors.toList());

        return routs;

    }

}


