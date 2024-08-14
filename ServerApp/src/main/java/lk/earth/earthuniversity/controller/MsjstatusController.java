package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.MsjstatusDao;
import lk.earth.earthuniversity.entity.Msjstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/msjstatuses")
public class MsjstatusController {

    @Autowired
    private MsjstatusDao msjstatusDao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Msjstatus> get() {

        List<Msjstatus> msjstatuses = this.msjstatusDao.findAll();

        msjstatuses = msjstatuses.stream().map(
                msjstatus -> { Msjstatus d = new Msjstatus();
                    d.setId(msjstatus.getId());
                    d.setName(msjstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return msjstatuses;

    }

}


