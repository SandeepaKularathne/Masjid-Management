package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HouseDao extends JpaRepository<House,Integer> {

    House findByHuid(String huid);
    House findByRout(String rout);
    Optional<House> findById(Integer id);

    @Query("select h from House h where h.id = :id")
    House findByMyId(@Param("id") Integer id);

//    @Query("select NEW House(h.id, h.huid)from House h")
//    List<House> findAllById();


}

