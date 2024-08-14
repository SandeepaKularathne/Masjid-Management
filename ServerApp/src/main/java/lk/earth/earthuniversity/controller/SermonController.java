package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.SermonDao;
import lk.earth.earthuniversity.entity.Sermon;
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
@RequestMapping(value = "/sermons")
public class SermonController {

    @Autowired
    private SermonDao sermondao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('sermon-select')")
    public List<Sermon> get(@RequestParam HashMap<String, String> params) {

        List<Sermon> sermons = this.sermondao.findAll();
        Stream<Sermon> estream = sermons.stream();

        if(params.isEmpty()) return sermons;
        if (params.get("date") != null){
            Date date = Date.valueOf(params.get("date"));
            if(date!=null) estream = estream.filter(e -> e.getDate().equals(date));
        }

        String moulaviid= params.get("moulaviid");
        System.out.println("moulavi" + moulaviid);

        if(moulaviid!=null) estream = estream.filter(e -> e.getMoulavi().getId()==Integer.parseInt(moulaviid));

        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Sermon-Insert')")
    public HashMap<String,String> add(@RequestBody Sermon sermon){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

//        if(sermondao.findById(sermon.getId())!=null)
//            errors = errors+"<br> Existing Sermon , please use add new";

        if(errors=="")
            sermondao.save(sermon);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(sermon.getId()));
        responce.put("url","/sermons/"+sermon.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Sermon-Update')")
    public HashMap<String,String> update(@RequestBody Sermon sermon){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Sermon emp1 = sermondao.findByMyId(sermon.getId());
//        if(emp1!=null && sermon.getId()!=emp1.getId())
//            errors = errors+"<br> Existing NIC Number";


        if(errors=="") sermondao.save(sermon);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(sermon.getId()));
        responce.put("url","/sermons/"+sermon.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        Sermon emp1 = sermondao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Sermon Does Not Existed";

        if(errors=="") sermondao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/sermons/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




