package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ReceivecategoryDao;
import lk.earth.earthuniversity.entity.Receivecategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/receivecategorys")
public class ReceivecategoryController {

    @Autowired
    private ReceivecategoryDao receivecategoryDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Receivecategory> get() {

        List<Receivecategory> receivecategorys = this.receivecategoryDao.findAll();

        receivecategorys = receivecategorys.stream().map(
                receivecategory -> { Receivecategory d = new Receivecategory();
                    d.setId(receivecategory.getId());
                    d.setName(receivecategory.getName());
                    return d; }
        ).collect(Collectors.toList());

        return receivecategorys;

    }

}


