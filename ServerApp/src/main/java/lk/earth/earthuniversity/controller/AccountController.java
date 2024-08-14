package lk.earth.earthuniversity.controller;

import lk.earth.earthuniversity.dao.AccountDao;
import lk.earth.earthuniversity.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/accounts")
public class AccountController {

    @Autowired
    private AccountDao accountdao;

    @GetMapping(path ="/list", produces = "application/json")
    public List<Account> get() {

        List<Account> accounts = this.accountdao.findAll();

        accounts = accounts.stream().map(
                account -> { Account d = new Account();
                    d.setId(account.getId());
                    d.setBank(account.getBank());
                    return d; }
        ).collect(Collectors.toList());

        return accounts;

    }

}


