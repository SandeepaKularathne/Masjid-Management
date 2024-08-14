package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Salahtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.Optional;

public interface SalahtimeDao extends JpaRepository<Salahtime,Integer> {

    Salahtime findByDate(Date date);
    Optional<Salahtime> findById(Integer Id);

    //    Salahtime findByNic(String nic);
//    Optional<Salahtime> findById(Integer id);

    //Help for Delete Mapping in controller
    @Query("select e from Salahtime e where e.id = :id")
    Salahtime findByMyId(@Param("id") Integer id);

//    @Query("SELECT NEW Salahtime (e.id, e.date) FROM Salahtime e")
//    List<Salahtime> findbyDate();

}

