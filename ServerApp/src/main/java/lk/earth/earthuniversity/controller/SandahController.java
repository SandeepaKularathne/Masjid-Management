package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SandahDao;
import lk.earth.earthuniversity.entity.Sandah;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/sandahs")
public class SandahController {

    @Autowired
    private SandahDao sandahdao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('sandah-select')")
    public List<Sandah> get(@RequestParam HashMap<String, String> params) {

        List<Sandah> sandahs = this.sandahdao.findAll();

        if(params.isEmpty()) return sandahs;

        String date    = params.get("date");
        String memberid =params.get("memberid");
        String referencenumber= params.get("referencenumber");


        Stream<Sandah> estream = sandahs.stream();

        if(date!=null) estream = estream.filter(e -> e.getDate().equals(date));
//        if(memberid!=null) estream = estream.filter(e -> e.getMember().getId()==Integer.parseInt(memberid));
        if(referencenumber!=null) estream = estream.filter(e -> e.getReferencenumber().equals(referencenumber));


        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Sandah-Insert')")
    public HashMap<String,String> add(@RequestBody Sandah sandah){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(sandahdao.findByReferencenumber(sandah.getReferencenumber())!=null)
            errors = errors+"<br> Existing Reference Number";

        if(errors=="")
            sandahdao.save(sandah);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(sandah.getId()));
        responce.put("url","/sandahs/"+sandah.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Sandah-Update')")
    public HashMap<String,String> update(@RequestBody Sandah sandah){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Sandah emp1 = sandahdao.findByReferencenumber(sandah.getReferencenumber());
        if(emp1!=null && sandah.getId()!=emp1.getId())
            errors = errors+"<br> Existing Reg Number";


        if(errors=="") sandahdao.save(sandah);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(sandah.getId()));
        responce.put("url","/sandahs/"+sandah.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        //Extracted from Dao
        Sandah emp1 = sandahdao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Sandah Does Not Existed";

        if(errors=="") sandahdao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/sandahs/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




