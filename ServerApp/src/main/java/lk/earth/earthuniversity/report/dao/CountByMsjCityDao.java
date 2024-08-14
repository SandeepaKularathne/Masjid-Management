package lk.earth.earthuniversity.report.dao;

import lk.earth.earthuniversity.report.entity.CountByMsjCity;
import lk.earth.earthuniversity.report.entity.CountByMsjType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CountByMsjCityDao extends JpaRepository<CountByMsjCity,Integer> {

    @Query(value = "SELECT NEW CountByMsjCity(mt.name, COUNT(m.id)) FROM Masjid m, City mt WHERE m.city.id = mt.id GROUP BY mt.id")
    List<CountByMsjCity> countByMsjCity();

}

