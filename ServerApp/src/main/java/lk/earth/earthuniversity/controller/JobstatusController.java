package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.JobstatusDao;
import lk.earth.earthuniversity.entity.Jobstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/jobstatuses")
public class JobstatusController {

    @Autowired
    private JobstatusDao jobstatusdao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Jobstatus> get() {

        List<Jobstatus> jobstatuses = this.jobstatusdao.findAll();

        jobstatuses = jobstatuses.stream().map(
                jobstatus -> { Jobstatus d = new Jobstatus();
                    d.setId(jobstatus.getId());
                    d.setName(jobstatus.getName());
                    return d; }
        ).collect(Collectors.toList());

        return jobstatuses;

    }

}


