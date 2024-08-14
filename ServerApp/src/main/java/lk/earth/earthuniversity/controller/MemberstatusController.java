package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.MemberstatusDao;
import lk.earth.earthuniversity.entity.Memberstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/memberstatuses")
public class MemberstatusController {

    @Autowired
    private MemberstatusDao memberstatusdao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Memberstatus> get() {

        List<Memberstatus> memberstatuses = this.memberstatusdao.findAll();

        memberstatuses = memberstatuses.stream().map(
                memberstatus -> { Memberstatus d = new Memberstatus();
                    d.setId(memberstatus.getId());
                    d.setName(memberstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return memberstatuses;

    }

}


