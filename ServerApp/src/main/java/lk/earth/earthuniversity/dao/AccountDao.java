package lk.earth.earthuniversity.dao;

import  lk.earth.earthuniversity.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountDao extends JpaRepository<Account,Integer> {


    //Help for Delete Mapping in controller


    @Query("select e from Account e where e.id = :id")
    Account findByMyId(@Param("id") Integer id);

//   @Query("select NEW Account(e.id, e.name)from Account e")
//   List<Account> findAllById();

}

