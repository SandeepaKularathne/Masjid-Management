package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ReceivestatusDao;
import lk.earth.earthuniversity.entity.Receivestatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/receivestatuses")
public class ReceivestatusController {

    @Autowired
    private ReceivestatusDao receivestatusdao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Receivestatus> get() {

        List<Receivestatus> receivestatuses = this.receivestatusdao.findAll();

        receivestatuses = receivestatuses.stream().map(
                receivestatus -> { Receivestatus d = new Receivestatus();
                    d.setId(receivestatus.getId());
                    d.setName(receivestatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return receivestatuses;

    }

}


