package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SandahstatusDao;
import lk.earth.earthuniversity.entity.Sandahstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/sandahstatuses")
public class sandahstatusController {

    @Autowired
    private SandahstatusDao sandahstatusDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Sandahstatus> get() {

        List<Sandahstatus> sandahstatuses = this.sandahstatusDao.findAll();

        sandahstatuses = sandahstatuses.stream().map(
                sandahstatus -> { Sandahstatus d = new Sandahstatus();
                    d.setId(sandahstatus.getId());
                    d.setName(sandahstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return sandahstatuses;

    }

}


