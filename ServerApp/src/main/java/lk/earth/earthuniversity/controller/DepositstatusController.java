package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.DepositstatusDao;
import lk.earth.earthuniversity.entity.Depositstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/depositstatuses")
public class DepositstatusController {

    @Autowired
    private DepositstatusDao depositstatusdao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Depositstatus> get() {

        List<Depositstatus> depositstatuses = this.depositstatusdao.findAll();

        depositstatuses = depositstatuses.stream().map(
                depositstatus -> { Depositstatus d = new Depositstatus();
                    d.setId(depositstatus.getId());
                    d.setName(depositstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return depositstatuses;

    }

}


