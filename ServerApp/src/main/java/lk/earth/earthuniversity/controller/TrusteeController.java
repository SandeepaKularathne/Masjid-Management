package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.TrusteeDao;
import lk.earth.earthuniversity.entity.Trustee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/trustees")
public class TrusteeController {

    @Autowired
    private TrusteeDao trusteeDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Trustee> get() {

        List<Trustee> trustees = this.trusteeDao.findAll();

        trustees = trustees.stream().map(
                trustee -> { Trustee d = new Trustee();
                    d.setId(trustee.getId());
                    d.setName(trustee.getName());
                    d.setMasjid(trustee.getMasjid());
                    return d; }
        ).collect(Collectors.toList());

        return trustees;

    }

}


