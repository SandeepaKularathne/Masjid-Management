package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SermonstatusDao;
import lk.earth.earthuniversity.entity.Sermonstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/sermonstatuses")
public class SermonstatusController {

    @Autowired
    private SermonstatusDao sermonstatusdao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Sermonstatus> get() {

        List<Sermonstatus> sermonstatuses = this.sermonstatusdao.findAll();

        sermonstatuses = sermonstatuses.stream().map(
                sermonstatus -> { Sermonstatus d = new Sermonstatus();
                    d.setId(sermonstatus.getId());
                    d.setName(sermonstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return sermonstatuses;

    }

}


