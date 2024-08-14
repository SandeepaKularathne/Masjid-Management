package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.MsjtypeDao;
import lk.earth.earthuniversity.entity.Msjtype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/msjtypes")
public class MsjtypeController {

    @Autowired
    private MsjtypeDao msjtypeDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Msjtype> get() {

        List<Msjtype> msjtypes = this.msjtypeDao.findAll();

        msjtypes = msjtypes.stream().map(
                msjtype -> { Msjtype d = new Msjtype();
                    d.setId(msjtype.getId());
                    d.setName(msjtype.getName());
                    return d; }
        ).collect(Collectors.toList());

        return msjtypes;

    }

}


