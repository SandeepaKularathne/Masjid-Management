package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByDesignation;
import lk.earth.earthuniversity.report.entity.CountByMsjType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountByMsjTypeDao extends JpaRepository<CountByMsjType,Integer> {

    @Query(value = "SELECT NEW CountByMsjType(mt.name, COUNT(m.id)) FROM Masjid m, Msjtype mt WHERE m.msjtype.id = mt.id GROUP BY mt.id")
    List<CountByMsjType> countByMsjType();

}

