package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.CivilstatusDao;
import lk.earth.earthuniversity.entity.Civilstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/civilstatuses")
public class CivilstatusController {

    @Autowired
    private CivilstatusDao civilstatusdao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Civilstatus> get() {

        List<Civilstatus> civilstatuses = this.civilstatusdao.findAll();

        civilstatuses = civilstatuses.stream().map(
                civilstatus -> { Civilstatus d = new Civilstatus();
                    d.setId(civilstatus.getId());
                    d.setName(civilstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return civilstatuses;

    }

}


