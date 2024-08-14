package lk.earth.earthuniversity.controller;
import lk.earth.earthuniversity.dao.MasjidDao;
import lk.earth.earthuniversity.entity.Masjid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.stream.Collectors;

import java.util.List;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/masjids")
public class MasjidController {

    @Autowired
    private MasjidDao masjiddao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('masjid-select')")
    public List<Masjid> get(@RequestParam HashMap<String, String> params) {

        List<Masjid> masjids = this.masjiddao.findAll();

        if(params.isEmpty()) return masjids;

        String regno = params.get("regno");
        String cityid= params.get("cityid");

        Stream<Masjid> estream = masjids.stream();

        if(cityid!=null) estream = estream.filter(e -> e.getCity().getId()==Integer.parseInt(cityid));
        if(regno!=null) estream = estream.filter(e -> e.getRegno().equals(regno));


        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Masjid-Insert')")
    public HashMap<String,String> add(@RequestBody Masjid masjid){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(masjiddao.findByRegno(masjid.getRegno())!=null)
            errors = errors+"<br> Existing Reg Number";

        if(errors=="")
            masjiddao.save(masjid);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(masjid.getId()));
        responce.put("url","/masjids/"+masjid.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Masjid-Update')")
    public HashMap<String,String> update(@RequestBody Masjid masjid){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Masjid emp1 = masjiddao.findByRegno(masjid.getRegno());
        if(emp1!=null && masjid.getId()!=emp1.getId())
            errors = errors+"<br> Existing Reg Number";


        if(errors=="") masjiddao.save(masjid);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(masjid.getId()));
        responce.put("url","/masjids/"+masjid.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Masjid emp1 = masjiddao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Masjid Does Not Existed";

        if(errors=="") masjiddao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/masjids/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




