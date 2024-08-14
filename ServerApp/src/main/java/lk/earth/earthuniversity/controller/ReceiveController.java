package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.ReceiveDao;
import lk.earth.earthuniversity.entity.Receive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/receives")
public class ReceiveController {

    @Autowired
    private ReceiveDao receivedao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('receive-select')")
    public List<Receive> get(@RequestParam HashMap<String, String> params) {

        List<Receive> receives = this.receivedao.findAll();

        if(params.isEmpty()) return receives;

        String date    = params.get("date");
        String member =params.get("memberid");
        String receivecategoryid= params.get("receivecategory");


        Stream<Receive> estream = receives.stream();

        if(date!=null) estream = estream.filter(e -> e.getDate().equals(date));
//        if(memberid!=null) estream = estream.filter(e -> e.getMember().getId()==Integer.parseInt(memberid));
//        if(referencenumber!=null) estream = estream.filter(e -> e.getReferencenumber().equals(referencenumber));


        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('Receive-Insert')")
    public HashMap<String,String> add(@RequestBody Receive receive){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

//        if(receivedao.findByDate(getdate()));
            errors = errors+"<br> Existing Reference Number";

        if(errors=="")
            receivedao.save(receive);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(receive.getId()));
        responce.put("url","/receives/"+receive.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('Receive-Update')")
    public HashMap<String,String> update(@RequestBody Receive receive){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

//        Receive emp1 = receivedao.findByReferencenumber(receive.getReferencenumber());
//        if(emp1!=null && receive.getId()!=emp1.getId())
             errors = errors+"<br> Existing Reg Number";


        if(errors=="") receivedao.save(receive);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(receive.getId()));
        responce.put("url","/receives/"+receive.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        //Extracted from Dao
        Receive emp1 = receivedao.findByMyId(id);
        if(emp1==null)
            errors = errors+"<br> Receive Does Not Existed";

        if(errors=="") receivedao.delete(emp1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/receives/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




