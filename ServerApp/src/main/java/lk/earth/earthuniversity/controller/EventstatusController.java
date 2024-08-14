package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.EventstatusDao;
import lk.earth.earthuniversity.entity.Eventstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/eventstatuses")
public class EventstatusController {

    @Autowired
    private EventstatusDao eventstatusdao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Eventstatus> get() {

        List<Eventstatus> eventstatuses = this.eventstatusdao.findAll();

        eventstatuses = eventstatuses.stream().map(
                eventstatus -> { Eventstatus d = new Eventstatus();
                    d.setId(eventstatus.getId());
                    d.setName(eventstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return eventstatuses;

    }

}


