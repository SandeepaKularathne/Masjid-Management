package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.MembertypeDao;
import lk.earth.earthuniversity.entity.Membertype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/membertypes")
public class MembertypeController {

    @Autowired
    private MembertypeDao membertypeDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Membertype> get() {

        List<Membertype> membertypes = this.membertypeDao.findAll();

        membertypes = membertypes.stream().map(
                membertype -> { Membertype d = new Membertype();
                    d.setId(membertype.getId());
                    d.setName(membertype.getName());
                    return d; }
        ).collect(Collectors.toList());

        return membertypes;

    }

}


