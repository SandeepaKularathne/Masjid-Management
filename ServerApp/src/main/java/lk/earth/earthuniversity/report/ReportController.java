package lk.earth.earthuniversity.report;

import lk.earth.earthuniversity.report.dao.CountByDesignaitonDao;
import lk.earth.earthuniversity.report.dao.CountByMsjCityDao;
import lk.earth.earthuniversity.report.dao.CountByMsjDao;
import lk.earth.earthuniversity.report.dao.CountByMsjTypeDao;
import lk.earth.earthuniversity.report.entity.CountByDesignation;
import lk.earth.earthuniversity.report.entity.CountByMsj;
import lk.earth.earthuniversity.report.entity.CountByMsjCity;
import lk.earth.earthuniversity.report.entity.CountByMsjType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/reports")
public class ReportController {
    @Autowired
    private CountByDesignaitonDao countbydesignaitondao;

    @Autowired
    private CountByMsjTypeDao countbymsjtypedao;

    @Autowired
    private CountByMsjDao countbymsjdao;

    @Autowired
    private CountByMsjCityDao countbymsjcitydao;

    @GetMapping(path ="/countbydesignation",produces = "application/json")
    public List<CountByDesignation> getdes() {

        List<CountByDesignation> designations = this.countbydesignaitondao.countByDesignation();
        long totalCount = 0;

        for (CountByDesignation countByDesignation : designations) {
            totalCount += countByDesignation.getCount();
        }

        for (CountByDesignation countByDesignation : designations) {
            long count = countByDesignation.getCount();
            double percentage = (double) count / totalCount * 100;
            percentage = Math.round(percentage * 100.0) / 100.0;
            countByDesignation.setPercentage(percentage);
        }

        return designations;
    }

    @GetMapping(path ="/countbymsjtype",produces = "application/json")
    public List<CountByMsjType> getmsj() {

        List<CountByMsjType> msj = this.countbymsjtypedao.countByMsjType();
        long totalCount = 0;

        for (CountByMsjType countByMsjType : msj) {
            totalCount += countByMsjType.getCount();
        }

        for (CountByMsjType countByMsjType : msj) {
            long count = countByMsjType.getCount();
            double percentage = (double) count / totalCount * 100;
            percentage = Math.round(percentage * 100.0) / 100.0;
            countByMsjType.setPercentage(percentage);
        }

        return msj;
    }

    @GetMapping(path ="/countbymsj",produces = "application/json")
    public List<CountByMsj> getms() {

        List<CountByMsj> msj = this.countbymsjdao.countByMsj();
        long totalCount = 0;

        for (CountByMsj count : msj) {
            totalCount += count.getCount();
        }

        for (CountByMsj countBy : msj) {
            long count = countBy.getCount();
            double percentage = (double) count / totalCount * 100;
            percentage = Math.round(percentage * 100.0) / 100.0;
            countBy.setPercentage(percentage);
        }

        return msj;
    }

    @GetMapping(path ="/countbymsjcity",produces = "application/json")
    public List<CountByMsjCity> getmsjcity() {

        List<CountByMsjCity> msj = this.countbymsjcitydao.countByMsjCity();
        long totalCount = 0;

        for (CountByMsjCity countBy : msj) {
            totalCount += countBy.getCount();
        }

        for (CountByMsjCity countBy : msj) {
            long count = countBy.getCount();
            double percentage = (double) count / totalCount * 100;
            percentage = Math.round(percentage * 100.0) / 100.0;
            countBy.setPercentage(percentage);
        }

        return msj;
    }
}


