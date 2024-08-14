package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SalahtimeDao;
import lk.earth.earthuniversity.entity.Salahtime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/salahtimes")
public class SalahtimeController {

    @Autowired
    private SalahtimeDao salahtimedao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('salahtime-select')")
    public List<Salahtime> get(@RequestParam HashMap<String, String> params) {

        List<Salahtime> salahtimes = this.salahtimedao.findAll();

        if(params.isEmpty()) return salahtimes;

        Stream<Salahtime> estream = salahtimes.stream();

        if (params.get("date") != null) {
            Date date = Date.valueOf(params.get("date"));
            if (date != null) estream = estream.filter(e -> e.getDate().equals(date));
        }

        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Salahtime-Insert')")
    public HashMap<String,String> add(@RequestBody Salahtime salahtime){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(errors=="")
            salahtimedao.save(salahtime);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(salahtime.getId()));
        responce.put("url","/salahtimes/"+salahtime.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        //Extracted from Dao
        Salahtime emp1 = salahtimedao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Salahtime Does Not Existed";

        if(errors=="") salahtimedao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/salahtimes/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




