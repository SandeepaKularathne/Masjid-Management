package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.EventtypeDao;
import lk.earth.earthuniversity.entity.Eventtype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/eventtypes")
public class EventtypeController {

    @Autowired
    private EventtypeDao eventtypedao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Eventtype> get() {

        List<Eventtype> eventtypes = this.eventtypedao.findAll();

        eventtypes = eventtypes.stream().map(
                eventtype -> { Eventtype d = new Eventtype();
                    d.setId(eventtype.getId());
                    d.setName(eventtype.getName());
                    return d; }
        ).collect(Collectors.toList());

        return eventtypes;

    }

}


