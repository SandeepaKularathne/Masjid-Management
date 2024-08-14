package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Sermon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SermonDao extends JpaRepository<Sermon,Integer> {


//    Sermon findSermonByMoulavi(String moulavi);

    @Query("select s from Sermon s where s.id = :id")
    Sermon findByMyId(@Param("id") Integer id);

//    @Query("select NEW Sermon(h.id, h.huid)from Sermon h")
//    List<Sermon> findAllById();


}

