import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CharacterStatsService } from '../character-stats.service';
import { LoginService }         from '../login.service';

@Component({
  selector: 'app-addstat',
  templateUrl: 'addstat.component.html',
  styleUrls: ['addstat.component.css']
})
export class AddstatComponent implements OnInit {
  private charName: string;
  private user: string;
  private name: FormControl;
  private value: FormControl;
  private max: FormControl;
  private type: FormControl;
  private addStatForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private statService: CharacterStatsService,
              private formBuilder: FormBuilder, 
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.charName = params['name'];
      this.user =     params['user'];
    });

    this.addStatForm = this.formBuilder.group({
      name: this.name,
      value: this.value,
      max: this.max,
      type: this.type
    });
  }

  submit() {
    let max = -1;

    if(this.max.value !== undefined) {
      max = this.max.value;
    }

    this.statService.addStat(this.loginService.currentUser.id,
                              this.name.value,
                              this.value.value,
                              max,                              
                              this.type.value);

    this.return();
  }

  return() {
    this.router.navigate([this.user, this.charName]);
  }

}
