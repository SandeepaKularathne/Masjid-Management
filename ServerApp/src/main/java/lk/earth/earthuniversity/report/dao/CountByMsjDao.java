package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByMsj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountByMsjDao extends JpaRepository<CountByMsj,Integer> {

    @Query(value = "SELECT NEW CountByMsj(m.name, COUNT(h.adultcount)) FROM House h, Masjid m, Rout r WHERE h.rout.id = r.id  and r.masjid.id=m.id GROUP BY m.id")
    List<CountByMsj> countByMsj();

}

