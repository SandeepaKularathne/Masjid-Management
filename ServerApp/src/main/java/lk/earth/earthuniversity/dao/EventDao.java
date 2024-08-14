package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventDao extends JpaRepository<Event,Integer> {


    //Help for Delete Mapping in controller


    @Query("select e from Event e where e.id = :id")
    Event findByMyId(@Param("id") Integer id);

//   @Query("select NEW Event(e.id, e.name)from Event e")
//   List<Event> findAllById();

}

