package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.HouseDao;
import lk.earth.earthuniversity.entity.House;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping(value = "/houses")
public class HouseController {

    @Autowired
    private HouseDao housedao;

    @GetMapping(produces = "application/json")
//    @PreAuthorize("hasAuthority('house-select')")
    public List<House> get(@RequestParam HashMap<String, String> params) {

        List<House> houses = this.housedao.findAll();

        if(params.isEmpty()) return houses;

        String routid = params.get("routid");
        String huid= params.get("huid");
        String housetypeid= params.get("housetypeid");

        Stream<House> estream = houses.stream();

        if(routid!=null) estream = estream.filter(h -> h.getRout().getId()==Integer.parseInt(routid));
        if(huid!=null) estream = estream.filter(h -> h.getHuid().equals(huid));
        if(housetypeid!=null) estream = estream.filter(h -> h.getHousetype().getId()==Integer.parseInt(housetypeid));


        return estream.collect(Collectors.toList());

    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // @PreAuthorize("hasAuthority('House-Insert')")
    public HashMap<String,String> add(@RequestBody House house){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        if(housedao.findByHuid(house.getHuid())!=null)
            errors = errors+"<br> Existing Huid Number";

        if(errors=="")
            housedao.save(house);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(house.getId()));
        responce.put("url","/houses/"+house.getId());
        responce.put("errors",errors);

        return responce;
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
//    @PreAuthorize("hasAuthority('House-Update')")
    public HashMap<String,String> update(@RequestBody House house){

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        House hs1 = housedao.findByHuid(house.getHuid());
        if(hs1!=null && house.getId()!=hs1.getId())
            errors = errors+"<br> Existing Reg Number";


        if(errors=="") housedao.save(house);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(house.getId()));
        responce.put("url","/houses/"+house.getId());
        responce.put("errors",errors);

        return responce;
    }


    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String,String> delete(@PathVariable Integer id)  {

        HashMap<String,String> responce = new HashMap<>();
        String errors="";

        House hs1 = housedao.findByMyId(id);
        if(hs1==null)
            errors = errors+"<br> House Does Not Existed";

        if(errors=="") housedao.delete(hs1);
        else errors = "Server Validation Errors : <br> "+errors;

        responce.put("id",String.valueOf(id));
        responce.put("url","/houses/"+id);
        responce.put("errors",errors);

        return responce;
    }

}




