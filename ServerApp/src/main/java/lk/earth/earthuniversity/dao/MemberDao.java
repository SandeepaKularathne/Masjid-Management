package lk.earth.earthuniversity.dao;

import lk.earth.earthuniversity.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberDao extends JpaRepository<Member,Integer> {

    Member findByCivilstatus(String civilstatusid);
    Member findByNic(String nic);
    Optional<Member> findById(Integer id);

    @Query("select m from Member m where m.id = :id")
    Member findByMyId(@Param("id") Integer id);

//    @Query("SELECT NEW Member (m.id, m.callingname) FROM Member m")
//    List<Member> findAllById();

}

