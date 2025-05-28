import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-strategy',
  templateUrl: './pricing-strategy.component.html',
  styleUrls: ['./pricing-strategy.component.scss']
})
export class PricingStrategyComponent implements OnInit {

  Condation:any[]=[];
  OrAnd:any[]=[];
  constructor() { 
    this.Condation.push({name:"=="});
    this.Condation.push({name:"!="});
    this.Condation.push({name:"<="});
    this.Condation.push({name:">="});
    this.Condation.push({name:">"});
    this.Condation.push({name:"<"});
    this.OrAnd.push({name:"OR"});
    this.OrAnd.push({name:"AND"});
  }

  ngOnInit() {
  }

}
